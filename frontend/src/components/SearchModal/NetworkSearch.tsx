/* eslint-disable no-restricted-syntax */
import { Chain } from '@wagmi/core'
import { Box, Input, Text, useMatchBreakpoints } from '@obridge/uikit'
import { RefObject, useCallback, useMemo, useRef, useState, useEffect } from 'react'
import { useTranslation } from '@obridge/localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { FixedSizeList } from 'react-window'
import { useAudioModeManager } from 'state/user/hooks'
import { isAddress } from 'utils'
import { chains } from '../../utils/wagmi'
import NetworkList from './NetworkList'
import { getSwapSound } from './swapSound'

interface NetworkSearchProps {
  label: string
  selectedChain?: Chain | null
  onChainSelect: (chain: Chain) => void
  otherSelectedChain?: Chain | null
  height?: number
}

function NetworkSearch({ label, selectedChain, onChainSelect, otherSelectedChain, height }: NetworkSearchProps) {
  const { t } = useTranslation()
  const { account, chainId } = useActiveWeb3React()

  // refs for fixed size lists
  const fixedList = useRef<FixedSizeList>()

  const [searchQuery, setSearchQuery] = useState<string>('')

  const { isMobile } = useMatchBreakpoints()
  const [audioPlay] = useAudioModeManager()

  const chainList = []
  for (let i = 0; i < chains.length; i++) {
    if (chains[i].id !== chainId || label === 'From') chainList.push(chains[i])
  }

  const handleChainSelect = useCallback(
    (chain: Chain) => {
      onChainSelect(chain)
      if (audioPlay) {
        getSwapSound().play()
      }
    },
    [audioPlay, onChainSelect],
  )

  const handleInput = useCallback((event) => {
    const input = event.target.value
    const checksummedInput = isAddress(input)
    setSearchQuery(checksummedInput || input)
    fixedList.current?.scrollTo(0)
  }, [])

  const getNetworkListRows = useCallback(() => {
    return (
      <Box>
        <NetworkList
          label={label}
          height={isMobile ? 250 : 390}
          chains={chainList}
          selectedChain={selectedChain}
          otherChain={otherSelectedChain}
          onChainSelect={handleChainSelect}
          fixedListRef={fixedList}
        />
      </Box>
    )
  }, [handleChainSelect, otherSelectedChain, selectedChain, t, isMobile, height])

  return <>{getNetworkListRows()}</>
}

export default NetworkSearch
