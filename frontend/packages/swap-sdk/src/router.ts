import { CurrencyAmount, Currency } from './entities'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  type: number
  recipient: string
  oTokenAddress: string
  toChainID: number
  amount: CurrencyAmount<Currency>
}

export interface SwapParameters {
  /**
   * The method to call on the ShibWallet Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
}

const ZERO_HEX = '0x0'
export abstract class Router {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(options: TradeOptions): SwapParameters {
    const type: number = options.type
    const oTokenAddress: string = options.oTokenAddress
    const to: string = options.recipient
    const amount: string = options.amount != undefined && options.amount != null ? toHex(options.amount) : '0'
    const toChainID: string = options.toChainID == null ? '' : options.toChainID.toString()

    let methodName: string
    let args: (string | string[])[]
    let value: string
    if (type == 0) {
      methodName = 'swapInNativeToken'
      args = [oTokenAddress, to, toChainID]
      value = amount
    } else if (type == 1) {
      methodName = 'swapInERC20Token'
      args = [oTokenAddress, to, amount, toChainID]
      value = ZERO_HEX
    } else {
      methodName = 'swapInOBToken'
      args = [oTokenAddress, to, amount, toChainID]
      value = ZERO_HEX
    }

    return {
      methodName,
      args,
      value,
    }
  }
}
