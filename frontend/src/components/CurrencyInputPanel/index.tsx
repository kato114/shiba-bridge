import { Currency } from '@obridge/sdk'
import { Chain } from '@wagmi/core'
import { Button, ChevronDownIcon, Text, useModal, Flex, Box } from '@obridge/uikit'
import styled, { css } from 'styled-components'
import { useTranslation } from '@obridge/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { ChainLogo } from 'components/Logo/ChainLogo'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import NetworkSearchModal from '../SearchModal/NetworkSearchModal'
import { CurrencyLogo } from '../Logo'

import { Input as NumericalInput } from './NumericalInput'

const InputContainer = styled(Box)`
  padding: 35px 35px;
  background: #1b1c1e;
  border-radius: 16px;
  width: 100%;
  max-width: calc(100vw - 30px);
`

const PanelContainer = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-flow: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')} wrap;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`

const InputPanel = styled.div`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
`

const ChoosePanelContainer = styled.div<{ isDesktop: boolean }>`
  display: flex;
  flex-flow: ${({ isDesktop }) => (isDesktop ? 'row' : 'column')} wrap;
  flex: 1;
  gap: 20px;
`

const ChoosePanel = styled.div`
  flex: 1;
`

const SelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })<{ zapStyle?: ZapStyle }>`
  width: 100%;
  height: 100%;
  min-height: 50px;
  padding: 5px 10px;
  background: #141416;
  box-shadow: 0px 0px 1px 1px black;

  ${({ zapStyle, theme }) =>
    zapStyle &&
    css`
      padding: 8px;
      background: ${theme.colors.background};
      border: 1px solid ${theme.colors.cardBorder};
      border-radius: ${zapStyle === 'zap' ? '0px' : '8px'} 8px 0px 0px;
      height: auto;
    `};
`

const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

const Container = styled.div<{ zapStyle?: ZapStyle; error?: boolean }>`
  border-radius: 16px;
  ${({ zapStyle }) =>
    !!zapStyle &&
    css`
      border-radius: 0px 16px 16px 16px;
    `};
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
`

type ZapStyle = 'noZap' | 'zap'

interface CurrencyInputPanelProps {
  label?: string
  value: string
  currency?: Currency | null
  otherCurrency?: Currency | null
  chain?: Chain | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  id: string
  showCommonBases?: boolean
  commonBasesType?: string
  zapStyle?: ZapStyle
  beforeButton?: React.ReactNode
  disabled?: boolean
  isDesktop?: boolean
  error?: boolean
  showBUSD?: boolean
  onUserInput: (value: string) => void
  onInputBlur?: () => void
  onMax?: () => void
  onCurrencySelect?: (currency: Currency) => void
  onChainSelect?: (chain: Chain) => void
}
export default function CurrencyInputPanel({
  label,
  value,
  currency,
  otherCurrency,
  chain,
  disableCurrencySelect = false,
  hideBalance = false,
  zapStyle,
  beforeButton,
  showCommonBases,
  commonBasesType,
  disabled,
  error,
  isDesktop,
  onUserInput,
  onInputBlur,
  onMax,
  onCurrencySelect,
  onChainSelect,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
      commonBasesType={commonBasesType}
    />,
  )

  const [onPresentNetworkModal] = useModal(
    <NetworkSearchModal label={label} onChainSelect={onChainSelect} selectedChain={chain} otherSelectedChain={chain} />,
  )

  return (
    <InputContainer>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>{label}</Text>
        {account && (
          <Text onClick={!disabled && onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
            {label === 'From'
              ? !hideBalance && !!currency
                ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toFixed(2) ?? t('Loading') })
                : ' -'
              : ''}
          </Text>
        )}
      </Flex>
      <PanelContainer isDesktop={isDesktop}>
        <InputPanel>
          <Container as="label" zapStyle={zapStyle} error={error}>
            <LabelRow>
              <NumericalInput
                error={error}
                disabled={disabled}
                className="token-amount-input"
                value={value}
                onBlur={onInputBlur}
                onUserInput={(val) => {
                  onUserInput(val)
                }}
              />
            </LabelRow>
          </Container>
          {disabled && <Overlay />}
        </InputPanel>
        <ChoosePanelContainer isDesktop={isDesktop}>
          <ChoosePanel>
            {beforeButton}
            <SelectButton
              zapStyle={zapStyle}
              className="open-currency-select-button"
              selected={!!currency}
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentCurrencyModal()
                }
              }}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <CurrencyLogo currency={currency} size="24px" style={{ marginRight: '8px' }} />
                <Text id="pair" bold>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                        currency.symbol.length - 5,
                        currency.symbol.length,
                      )}`
                    : currency?.symbol) || t('Select a currency')}
                </Text>
                {!disableCurrencySelect && <ChevronDownIcon />}
              </Flex>
            </SelectButton>
          </ChoosePanel>
          <ChoosePanel>
            {beforeButton}
            <SelectButton
              zapStyle={zapStyle}
              className="open-chain-select-button"
              selected={!!chain}
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentNetworkModal()
                }
              }}
            >
              <Flex alignItems="center" justifyContent="space-between">
                <ChainLogo chainId={chain?.id} width={24} height={24} />
                <Text id="pair" bold>
                  {((chain && chain.name) ?? chain?.name) || t('Select a network')}
                </Text>
                {!disableCurrencySelect && <ChevronDownIcon />}
              </Flex>
            </SelectButton>
          </ChoosePanel>
        </ChoosePanelContainer>
      </PanelContainer>
    </InputContainer>
  )
}
