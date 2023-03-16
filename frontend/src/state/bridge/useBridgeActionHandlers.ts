import { useCallback } from 'react'
import { Currency } from '@obridge/sdk'
import { Chain } from '@wagmi/core'
import { Field, ChainField, selectCurrency, selectChain, typeInput, setRecipient } from './actions'
import { useAppDispatch } from '../index'

export function useBridgeActionHandlers(): {
  onCurrencySelection: (field: Field, currency: Currency) => void
  onChainSelection: (field: ChainField, chain: Chain) => void
  onUserInput: (field: Field, typedValue: string) => void
  onChangeRecipient: (recipient: string | null) => void
} {
  const dispatch = useAppDispatch()

  const onCurrencySelection = useCallback(
    (field: Field, currency: Currency) => {
      dispatch(
        selectCurrency({
          field,
          currencyId: currency?.isToken ? currency.address : currency?.isNative ? currency.symbol : '',
        }),
      )
    },
    [dispatch],
  )

  const onChainSelection = useCallback(
    (field: ChainField, chain: Chain) => {
      dispatch(
        selectChain({
          field,
          chainId: chain.id,
        }),
      )
    },
    [dispatch],
  )

  const onUserInput = useCallback(
    (field: Field, typedValue: string) => {
      dispatch(typeInput({ field, typedValue }))
    },
    [dispatch],
  )

  const onChangeRecipient = useCallback(
    (recipient: string | null) => {
      dispatch(setRecipient({ recipient }))
    },
    [dispatch],
  )

  return {
    onCurrencySelection,
    onChainSelection,
    onUserInput,
    onChangeRecipient,
  }
}
