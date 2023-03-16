import { useCallback, useMemo, memo } from 'react'
import { Currency, Trade, TradeType } from '@obridge/sdk'
import { ConfirmationModalContent } from 'components/TransactionConfirmationModal'
import SwapModalFooter from './SwapModalFooter'
import SwapModalHeader from './SwapModalHeader'

/**
 * Returns true if the trade requires a confirmation of details before we can submit it
 * @param tradeA trade A
 * @param tradeB trade B
 */
function tradeMeaningfullyDiffers(
  tradeA: Trade<Currency, Currency, TradeType>,
  tradeB: Trade<Currency, Currency, TradeType>,
): boolean {
  return (
    tradeA.tradeType !== tradeB.tradeType ||
    !tradeA.inputAmount.currency.equals(tradeB.inputAmount.currency) ||
    !tradeA.inputAmount.equalTo(tradeB.inputAmount) ||
    !tradeA.outputAmount.currency.equals(tradeB.outputAmount.currency) ||
    !tradeA.outputAmount.equalTo(tradeB.outputAmount)
  )
}

const TransactionConfirmSwapContent = ({ onConfirm, recipient, isStable }) => {
  const modalHeader = useCallback(() => {
    const SwapModalHead = SwapModalHeader

    return <SwapModalHead recipient={recipient} />
  }, [recipient, isStable])

  const modalBottom = useCallback(() => {
    const SwapModalF = SwapModalFooter

    return <SwapModalF onConfirm={onConfirm} />
  }, [onConfirm, isStable])

  return <ConfirmationModalContent topContent={modalHeader} bottomContent={modalBottom} />
}

export default memo(TransactionConfirmSwapContent)
