import { useMemo } from 'react'
import { ChainId } from '@obridge/sdk'
import { useActiveIfoWithBlocks } from 'hooks/useActiveIfoWithBlocks'
import { useChainCurrentBlock } from 'state/block/hooks'

export const useMenuItemsStatus = () => {
  const currentBlock = useChainCurrentBlock(ChainId.BSC_TESTNET)
}
