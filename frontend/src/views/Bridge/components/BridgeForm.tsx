import { useCallback, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Currency, CurrencyAmount } from '@obridge/sdk'
import { Chain } from '@wagmi/core'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { Button, Text, ArrowDownIcon, Box, IconButton, Flex, useMatchBreakpoints, useToast } from '@obridge/uikit'
import { ToastDescriptionWithTx } from 'components/Toast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useClaim from 'hooks/useClaim'
import useCatchTxError from 'hooks/useCatchTxError'
import { useTranslation } from '@obridge/localization'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { useBridgeActionHandlers } from 'state/bridge/useBridgeActionHandlers'

import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { CommonBasesType } from 'components/SearchModal/types'
import { AutoRow } from 'components/Layout/Row'
import { AutoColumn } from 'components/Layout/Column'

import { useCurrency } from 'hooks/Tokens'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

import { Field, ChainField } from 'state/bridge/actions'
import { useDerivedBridgeInfo, useBridgeState } from 'state/bridge/hooks'
import { useUserSlippageTolerance } from 'state/user/hooks'

import replaceBrowserHistory from '@obridge/utils/replaceBrowserHistory'
import { currencyId } from 'utils/currencyId'
import { chains as chainList } from '../../../utils/wagmi'

import useWarningImport from '../hooks/useWarningImport'
import AddressInputPanel from './AddressInputPanel'
import { Wrapper } from './styleds'
import BridgeCommitButton from './BridgeCommitButton'

const SwitchIconButton = styled(IconButton)`
  box-shadow: inset 0px -2px 0px rgba(0, 0, 0, 0.1);
  background-color: #27262c;
  .icon-up-down {
    display: none;
  }
`
function useChain(chainId: number | undefined): Chain | undefined {
  const chain = chainList.find((c) => c.id === chainId)
  return chain
}

function useOtherChain(chainId: number | undefined): Chain | undefined {
  const chain = chainList.find((c) => c.id !== chainId)
  return chain
}

export default function BridgeForm() {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  
  const warningBridgeHandler = useWarningImport()

  const { isDesktop } = useMatchBreakpoints()
  const { account, chainId } = useActiveWeb3React()
  const { onClaim, pendingTx } = useClaim()
  const { pendingChainId, isLoading } = useSwitchNetwork()

  const foundChain = useMemo(
    () => chainList.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )

  // swap state & price data
  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
    [ChainField.FROM]: { chainId: fromChainId },
    [ChainField.TO]: { chainId: toChainId },
  } = useBridgeState()

  const native = useNativeCurrency()

  const selectedChainId = chainId == 5 ? 5 : 97
  const defaultTokens = {
    97: '0x02474822c256677Ba251120FED7cD767a9f879BA',
    5: '0x7720C09AB0b30384De1d9150bd5D8376B3b0fA07',
    719: '0x8a50055a26ad4B03644889ea7c97eb0fFF61BDeb',
  }

  const defaultCurrency = useCurrency(defaultTokens[selectedChainId])

  const inputCurrency = useCurrency(inputCurrencyId) ?? (chainId == 719 ? native : defaultCurrency)
  const outputCurrency = useCurrency(outputCurrencyId) ?? (chainId == 719 ? native : defaultCurrency)

  const currencies: { [field in Field]?: Currency } = useMemo(
    () => ({
      [Field.INPUT]: inputCurrency ?? undefined,
      [Field.OUTPUT]: outputCurrency ?? undefined,
    }),
    [inputCurrency, outputCurrency, fromChainId, chainId],
  )

  const fromChain = useChain(foundChain !== undefined && foundChain !== null ? foundChain.id : 97)
  const otherChain = useOtherChain(fromChain.id)
  let toChain = useChain(toChainId)
  if (toChain === undefined || toChain?.id === fromChain.id) toChain = otherChain
  const chains: { [field in ChainField]?: Chain } = useMemo(
    () => ({
      [ChainField.FROM]: fromChain ?? undefined,
      [ChainField.TO]: toChain ?? undefined,
    }),
    [fromChain, toChain],
  )

  const {
    currencyBalances,
    parsedAmount,
    inputError: bridgeInputError,
  } = useDerivedBridgeInfo(typedValue, inputCurrency, outputCurrency, recipient)

  const parsedAmounts = {
    [Field.INPUT]: parsedAmount,
    [Field.OUTPUT]: parsedAmount,
  }

  const { onCurrencySelection, onChainSelection, onUserInput, onChangeRecipient } = useBridgeActionHandlers()

  const dependentField: Field = independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT

  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleTypeOutput = useCallback(
    (value: string) => {
      onUserInput(Field.OUTPUT, value)
    },
    [onUserInput],
  )

  const formattedAmounts = {
    [independentField]: typedValue,
    [dependentField]: parsedAmounts[dependentField]?.toSignificant(6) ?? '',
  }

  // check whether the user has approved the router on the input token
  const [approval, approveCallback] = useApproveCallbackFromTrade(chainId, parsedAmounts[Field.INPUT])
  // check if user has gone through approval process, used to show two step buttons, reset on token change
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  // mark when a user has submitted an approval, reset onTokenSelection for input field
  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const maxAmountInput: CurrencyAmount<Currency> | undefined = maxAmountSpend(currencyBalances[Field.INPUT])

  const handleInputTokenSelect = useCallback(
    (currencyInput) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, currencyInput)

      warningBridgeHandler(currencyInput)

      replaceBrowserHistory('inputCurrency', currencyId(currencyInput))
    },
    [onCurrencySelection, warningBridgeHandler],
  )
  const handleOutputTokenSelect = useCallback(
    (currencyOutput) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.OUTPUT, currencyOutput)

      warningBridgeHandler(currencyOutput)

      replaceBrowserHistory('inputCurrency', currencyId(currencyOutput))
    },
    [onCurrencySelection, warningBridgeHandler],
  )

  const handleInputChainSelect = useCallback(
    (selectedFromChain) => {
      onChainSelection(ChainField.FROM, selectedFromChain)
    },
    [onChainSelection],
  )

  const handleOutputChainSelect = useCallback(
    (selectedToChain) => {
      onChainSelection(ChainField.TO, selectedToChain)
    },
    [onChainSelection],
  )

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])

  return (
    <>
      <>
        <Wrapper id="bridge-page" style={{ minHeight: '412px', width: '100%', padding: '60px 0px' }}>
          <AutoColumn gap="lg">
            <Flex justifyContent="flex-start">
              <Button variant="primary" disabled={pendingTx} onClick={onClaim}>
                {t('Claim SWT')}
              </Button>
            </Flex>
            <Flex justifyContent="flex-start" style={{marginTop: '-10px'}}>
                {t('Get SWT for Beta Test. Each user can only claim once !')}
            </Flex>
            <CurrencyInputPanel
              label="From"
              value={formattedAmounts[Field.INPUT]}
              currency={currencies[Field.INPUT]}
              chain={chains[ChainField.FROM]}
              onUserInput={handleTypeInput}
              onMax={handleMaxInput}
              onCurrencySelect={handleInputTokenSelect}
              onChainSelect={handleInputChainSelect}
              otherCurrency={currencies[Field.OUTPUT]}
              id="bridge-currency-input"
              isDesktop={isDesktop}
            />

            <AutoColumn justify="space-between">
              <AutoRow justify="center" style={{ margin: '1rem' }}>
                <ArrowDownIcon
                  className="icon-down"
                  color={currencies[Field.INPUT] && currencies[Field.OUTPUT] ? 'white' : 'text'}
                />
              </AutoRow>
            </AutoColumn>

            <CurrencyInputPanel
              label="To"
              value={formattedAmounts[Field.INPUT]}
              currency={currencies[Field.INPUT]}
              chain={chains[ChainField.TO]}
              onUserInput={handleTypeInput}
              onCurrencySelect={handleInputTokenSelect}
              onChainSelect={handleOutputChainSelect}
              otherCurrency={currencies[Field.INPUT]}
              id="bridge-currency-output"
              isDesktop={isDesktop}
              showCommonBases
              commonBasesType={CommonBasesType.SWAP_LIMITORDER}
            />
            <Flex justifyContent="flex-end">
              <Button variant="text" onClick={() => onChangeRecipient(recipient !== null ? null : '')}>
                {recipient !== null ? t('- Remove To') : t('+ Send To')}
              </Button>
            </Flex>
            {recipient !== null ? (
              <AddressInputPanel id="recipient" value={recipient} onChange={onChangeRecipient} />
            ) : null}
          </AutoColumn>
          <Box mt="2rem">
            <BridgeCommitButton
              account={account}
              approval={approval}
              approveCallback={approveCallback}
              approvalSubmitted={approvalSubmitted}
              currencies={currencies}
              bridgeInputError={bridgeInputError}
              currencyBalances={parsedAmounts}
              tochain={chains[ChainField.TO]}
              recipient={recipient}
              onUserInput={onUserInput}
            />
          </Box>
        </Wrapper>
      </>
    </>
  )
}
