import { createAction } from '@reduxjs/toolkit'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT',
}

export enum ChainField {
  FROM = 'FROM',
  TO = 'TO',
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>('bridge/selectCurrency')
export const selectChain = createAction<{ field: ChainField; chainId: number }>('bridge/selectChain')
export const typeInput = createAction<{ field: Field; typedValue: string }>('bridge/typeInput')
export const replaceBridgeState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: string
  fromChainId?: number
  toChainId?: number
  recipient: string | null
}>('bridge/replaceBridgeState')
export const setRecipient = createAction<{ recipient: string | null }>('bridge/setRecipient')
