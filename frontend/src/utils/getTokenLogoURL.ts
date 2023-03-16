import { ChainId, Token } from '@obridge/sdk'

const mapping = {
  [ChainId.BSC]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
}

const getTokenLogoURL = (token?: Token) => {
  if (token && token.chainId) {
    return `/images/tokens/${token.chainId}/${token.address}.png`
  }
  return null
}

export default getTokenLogoURL
