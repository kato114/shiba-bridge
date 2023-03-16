import { useTranslation } from '@obridge/localization'
import { useModal } from '@obridge/uikit'
import { Currency, CurrencyAmount } from '@obridge/sdk'
import { Chain } from '@wagmi/core'
import { CommitButton } from 'components/CommitButton'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { AutoRow, RowBetween } from 'components/Layout/Row'
import { ApprovalState } from 'hooks/useApproveCallback'
import CircleLoader from 'components/Loader/CircleLoader'
import { Field } from 'state/bridge/actions'
import SettingsModal, { withCustomOnDismiss } from 'components/Menu/GlobalSettings/SettingsModal'
import { SettingsMode } from 'components/Menu/GlobalSettings/types'
import { useCallback, useEffect, useState } from 'react'
import Column from 'components/Layout/Column'
import { useBridgeCallback } from 'hooks/useBridgeCallback'
import { useBridgeCallArguments } from 'hooks/useBridgeCallArguments'
import OB_TOKEN_LIST from '../../../config/constants/tokenLists/obridge-ob.tokenlist.json'
import ConfirmBridgeModal from './ConfirmBridgeModal'
import ProgressSteps from './ProgressSteps'

const SettingsModalWithCustomDismiss = withCustomOnDismiss(SettingsModal)

interface BridgeCommitButtonPropsType {
  account: string
  approval: ApprovalState
  approveCallback: () => Promise<void>
  approvalSubmitted: boolean
  currencies: {
    INPUT?: Currency
    OUTPUT?: Currency
  }
  bridgeInputError: string
  currencyBalances: {
    INPUT?: CurrencyAmount<Currency>
    OUTPUT?: CurrencyAmount<Currency>
  }
  tochain: Chain
  recipient: string
  onUserInput: (field: Field, typedValue: string) => void
}

export default function BridgeCommitButton({
  account,
  approval,
  approveCallback,
  approvalSubmitted,
  currencies,
  bridgeInputError,
  currencyBalances,
  recipient,
  tochain,
  onUserInput,
}: BridgeCommitButtonPropsType) {
  const { t } = useTranslation()
  const oTokenAddress = currencies[Field.INPUT]
    ? currencies[Field.INPUT].isNative
      ? OB_TOKEN_LIST[currencies[Field.INPUT].chainId].Native
      : OB_TOKEN_LIST[currencies[Field.INPUT].chainId][currencies[Field.INPUT].symbol]
    : ''
  const type = currencies[Field.INPUT].isNative ? 0 : 1
  const bridgeCalls = useBridgeCallArguments(type, recipient, oTokenAddress, tochain?.id, currencyBalances[Field.INPUT])

  const { callback: bridgeCallback, error: BridgeCallbackError } = useBridgeCallback(recipient, bridgeCalls)
  const [{ bridgeErrorMessage, attemptingTxn, txHash, rChainId }, setBridgeState] = useState<{
    bridgeErrorMessage: string | undefined
    attemptingTxn: boolean
    txHash: string | undefined
    rChainId: number | undefined
  }>({
    attemptingTxn: false,
    bridgeErrorMessage: undefined,
    txHash: undefined,
    rChainId: undefined,
  })

  // Handlers
  const handleBridge = useCallback(() => {
    if (!bridgeCallback) {
      return
    }
    setBridgeState({ attemptingTxn: true, bridgeErrorMessage: undefined, txHash: undefined, rChainId: undefined })
    bridgeCallback()
      .then(async (url) => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (data.status === 'success') {
          setBridgeState({
            attemptingTxn: false,
            bridgeErrorMessage: undefined,
            txHash: data.hash,
            rChainId: data.chainId,
          })
        } else {
          setBridgeState({
            attemptingTxn: false,
            bridgeErrorMessage: data.msg,
            txHash: undefined,
            rChainId: undefined,
          })
        }
      })
      .catch((error) => {
        setBridgeState({
          attemptingTxn: false,
          bridgeErrorMessage: error.message,
          txHash: undefined,
          rChainId: undefined,
        })
      })
  }, [bridgeCallback, t, setBridgeState])

  const handleConfirmDismiss = useCallback(() => {
    setBridgeState({ attemptingTxn, bridgeErrorMessage, txHash, rChainId })
    // if there was a tx hash, we want to clear the input
    if (txHash) {
      onUserInput(Field.INPUT, '')
    }
  }, [attemptingTxn, onUserInput, bridgeErrorMessage, txHash, rChainId, setBridgeState])

  // End Handlers

  // Modals
  const [indirectlyOpenConfirmModalState, setIndirectlyOpenConfirmModalState] = useState(false)

  const [onPresentSettingsModal] = useModal(
    <SettingsModalWithCustomDismiss
      customOnDismiss={() => setIndirectlyOpenConfirmModalState(true)}
      mode={SettingsMode.SWAP_LIQUIDITY}
    />,
  )

  const [onPresentConfirmModal] = useModal(
    <ConfirmBridgeModal
      currencyBalances={currencyBalances}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      rChainId={rChainId}
      recipient={recipient}
      onConfirm={handleBridge}
      swapErrorMessage={bridgeErrorMessage}
      customOnDismiss={handleConfirmDismiss}
      openSettingModal={onPresentSettingsModal}
    />,
    true,
    true,
    'confirmBridgeModal',
  )
  // End Modals

  const onBridgeHandler = useCallback(() => {
    setBridgeState({
      attemptingTxn: false,
      bridgeErrorMessage: undefined,
      txHash: undefined,
      rChainId: undefined,
    })
    onPresentConfirmModal()
  }, [handleBridge, onPresentConfirmModal])

  // useEffect
  useEffect(() => {
    if (indirectlyOpenConfirmModalState) {
      setIndirectlyOpenConfirmModalState(false)
      setBridgeState((state) => ({
        ...state,
        bridgeErrorMessage: undefined,
      }))
      onPresentConfirmModal()
    }
  }, [indirectlyOpenConfirmModalState, onPresentConfirmModal, setBridgeState])

  if (!account) {
    return <ConnectWalletButton width="100%" />
  }

  // show approve flow when: no error on inputs, not approved or pending, or approved in current session
  // never show if price impact is above threshold in non expert mode
  const showApproveFlow =
    !bridgeInputError &&
    (approval === ApprovalState.NOT_APPROVED ||
      approval === ApprovalState.PENDING ||
      (approvalSubmitted && approval === ApprovalState.APPROVED))

  const isValid = !bridgeInputError

  if (showApproveFlow) {
    return (
      <>
        <RowBetween>
          <CommitButton
            variant={approval === ApprovalState.APPROVED ? 'success' : 'primary'}
            onClick={approveCallback}
            disabled={approval !== ApprovalState.NOT_APPROVED || approvalSubmitted}
            width="48%"
          >
            {approval === ApprovalState.PENDING ? (
              <AutoRow gap="6px" justify="center">
                {t('Enabling')} <CircleLoader stroke="white" />
              </AutoRow>
            ) : approvalSubmitted && approval === ApprovalState.APPROVED ? (
              t('Enabled')
            ) : (
              t('Enable %asset%', { asset: currencies[Field.INPUT]?.symbol ?? '' })
            )}
          </CommitButton>
          <CommitButton
            variant="primary"
            onClick={() => {
              onBridgeHandler()
            }}
            width="48%"
            id="bridge-button"
            disabled={!isValid || approval !== ApprovalState.APPROVED}
          >
            {t('Swap')}
          </CommitButton>
        </RowBetween>
        <Column style={{ marginTop: '1rem' }}>
          <ProgressSteps steps={[approval === ApprovalState.APPROVED]} />
        </Column>
      </>
    )
  }
  return (
    <>
      <CommitButton
        variant="primary"
        onClick={() => {
          onBridgeHandler()
        }}
        id="bridge-button"
        width="100%"
        disabled={!isValid || !!BridgeCallbackError}
      >
        {bridgeInputError || t('Swap')}
      </CommitButton>
    </>
  )
}
