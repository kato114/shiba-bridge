import { useCallback, useState, useRef, useEffect } from 'react'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { Chain } from '@wagmi/core'
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  InjectedModalProps,
  Heading,
  useMatchBreakpoints,
  MODAL_SWIPE_TO_CLOSE_VELOCITY,
} from '@obridge/uikit'
import styled from 'styled-components'
import NetworkSearch from './NetworkSearch'

const StyledModalContainer = styled(ModalContainer)`
  width: 100%;
  min-width: 320px;
  max-width: 420px !important;
  ${({ theme }) => theme.mediaQueries.md} {
    min-height: auto;
  }
`

const StyledModalBody = styled(ModalBody)`
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export interface NetworkSearchModalProps extends InjectedModalProps {
  label: string
  selectedChain?: Chain | null
  onChainSelect: (chain: Chain) => void
  otherSelectedChain?: Chain | null
}

export default function NetworkSearchModal({
  label,
  onDismiss = () => null,
  onChainSelect,
  selectedChain,
  otherSelectedChain,
}: NetworkSearchModalProps) {
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  const handleChainSelect = useCallback(
    (chain: Chain) => {
      onDismiss?.()
      onChainSelect(chain)
      if (label === 'From') switchNetworkAsync(chain.id)
    },
    [onDismiss, onChainSelect],
  )

  const { isMobile } = useMatchBreakpoints()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(undefined)
  useEffect(() => {
    if (!wrapperRef.current) return
    setHeight(wrapperRef.current.offsetHeight - 330)
  }, [])

  return (
    <StyledModalContainer
      drag={isMobile ? 'y' : false}
      dragConstraints={{ top: 0, bottom: 600 }}
      dragElastic={{ top: 0 }}
      dragSnapToOrigin
      onDragStart={() => {
        if (wrapperRef.current) wrapperRef.current.style.animation = 'none'
      }}
      // @ts-ignore
      onDragEnd={(e, info) => {
        if (info.velocity.y > MODAL_SWIPE_TO_CLOSE_VELOCITY && onDismiss) onDismiss()
      }}
      ref={wrapperRef}
    >
      <ModalHeader>
        <ModalTitle>
          <Heading>Select a Network</Heading>
        </ModalTitle>
        <ModalCloseButton onDismiss={onDismiss} />
      </ModalHeader>
      <StyledModalBody>
        <NetworkSearch
          label={label}
          onChainSelect={handleChainSelect}
          selectedChain={selectedChain}
          otherSelectedChain={otherSelectedChain}
          height={height}
        />
      </StyledModalBody>
    </StyledModalContainer>
  )
}
