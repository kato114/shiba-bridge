import { ChainId, WETH9 } from '@obridge/sdk'
import { USDC, USDT, WBTC_ETH } from '@obridge/tokens'

export const ethereumTokens = {
  weth: WETH9[ChainId.ETHEREUM],
  usdt: USDT[ChainId.ETHEREUM],
  usdc: USDC[ChainId.ETHEREUM],
  wbtc: WBTC_ETH,
}
