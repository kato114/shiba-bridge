import { ChainId, Native, NativeCurrency } from '@obridge/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from './useActiveWeb3React'

export default function useNativeCurrency(): NativeCurrency {
  const { chainId } = useActiveWeb3React()

  return useMemo(() => {
    return Native.onChain(ChainId.SHIBA_BETA)
    try {
      return Native.onChain(chainId == ChainId.SHIBA_BETA ? ChainId.SHIBA_BETA : ChainId.GOERLI)
    } catch (e) {
      return Native.onChain(ChainId.SHIBA_BETA)
    }
  }, [chainId])
}
