import { useCallback, memo } from 'react'
import { Currency, CurrencyAmount } from '@obridge/sdk'
import { InjectedModalProps } from '@obridge/uikit'
import { TransactionErrorContent, TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { Field } from 'state/bridge/actions'
import useTranslation from '@obridge/localization/src/useTranslation'
import ConfirmationPendingContent from './ConfirmationPendingContent'
import TransactionConfirmSwapContent from './TransactionConfirmSwapContent'
import ConfirmBridgeModalContainer from './ConfirmBridgeModalContainer'

const SwapTransactionErrorContent = ({ onDismiss, message, openSettingModal }) => {
  const { t } = useTranslation()

  return <TransactionErrorContent message={message} onDismiss={onDismiss} />
}

interface ConfirmBridgeModalProps {
  currencyBalances: { [field in Field]?: CurrencyAmount<Currency> }
  attemptingTxn: boolean
  txHash?: string
  rChainId?: number
  recipient: string | null
  onConfirm: () => void
  swapErrorMessage?: string
  customOnDismiss?: () => void
  openSettingModal?: () => void
  isStable?: boolean
}

const ConfirmBridgeModal: React.FC<React.PropsWithChildren<InjectedModalProps & ConfirmBridgeModalProps>> = ({
  currencyBalances,
  onConfirm,
  onDismiss,
  customOnDismiss,
  recipient,
  swapErrorMessage,
  attemptingTxn,
  txHash,
  rChainId,
  openSettingModal,
  isStable,
}) => {
  const { chainId } = useActiveWeb3React()
  const handleDismiss = useCallback(() => {
    if (customOnDismiss) {
      customOnDismiss()
    }
    onDismiss?.()
  }, [customOnDismiss, onDismiss])

  const confirmationContent = useCallback(
    () =>
      swapErrorMessage ? (
        <SwapTransactionErrorContent
          openSettingModal={openSettingModal}
          onDismiss={onDismiss}
          message={swapErrorMessage}
        />
      ) : (
        <TransactionConfirmSwapContent isStable={isStable} onConfirm={onConfirm} recipient={recipient} />
      ),
    [isStable, onConfirm, recipient, swapErrorMessage, onDismiss, openSettingModal, currencyBalances],
  )

  if (!chainId) return null

  return (
    <ConfirmBridgeModalContainer handleDismiss={handleDismiss}>
      {attemptingTxn ? (
        <ConfirmationPendingContent />
      ) : txHash ? (
        <TransactionSubmittedContent chainId={rChainId} hash={txHash} onDismiss={handleDismiss} />
      ) : (
        confirmationContent()
      )}
    </ConfirmBridgeModalContainer>
  )
}

export default memo(ConfirmBridgeModal)
