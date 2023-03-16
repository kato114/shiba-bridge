import { createReducer } from '@reduxjs/toolkit'
import { bsc, mainnet, bscTest, goerli } from '@obridge/wagmi/chains'
import { Field, ChainField, selectCurrency, selectChain, setRecipient, typeInput, replaceBridgeState } from './actions'
import { DerivedPairDataNormalized, PairDataNormalized } from './types'

export interface BridgeState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [ChainField.FROM]: {
    readonly chainId: number | undefined
  }
  readonly [ChainField.TO]: {
    readonly chainId: number | undefined
  }
  // the typed recipient address, or null if swap should go to sender
  readonly recipient: string | null
  readonly pairDataById: Record<number, Record<string, PairDataNormalized>> | null
  readonly derivedPairDataById: Record<number, Record<string, DerivedPairDataNormalized>> | null
}

const initialState: BridgeState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currencyId: '',
  },
  [ChainField.FROM]: {
    chainId: bscTest.id,
  },
  [ChainField.TO]: {
    chainId: goerli.id,
  },
  pairDataById: {},
  derivedPairDataById: {},
  recipient: null,
}

export default createReducer<BridgeState>(initialState, (builder) =>
  builder
    .addCase(
      replaceBridgeState,
      (
        state,
        { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId, fromChainId, toChainId } },
      ) => {
        return {
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
          },
          [ChainField.FROM]: {
            chainId: fromChainId,
          },
          [ChainField.TO]: {
            chainId: toChainId,
          },
          independentField: field,
          typedValue,
          recipient,
          pairDataById: state.pairDataById,
          derivedPairDataById: state.derivedPairDataById,
        }
      },
    )
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { currencyId },
      }
    })
    .addCase(selectChain, (state, { payload: { chainId, field } }) => {
      const otherField = field === ChainField.FROM ? ChainField.TO : ChainField.FROM
      if (chainId === state[otherField].chainId) {
        // the case where we have to swap the order
        return {
          ...state,
          //   independentField: state.independentField === ChainField.FROM ? ChainField.TO : ChainField.FROM,
          [field]: { chainId },
          [otherField]: { chainId: state[field].chainId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { chainId },
      }
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    }),
)
