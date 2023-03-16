import { CSSProperties, MutableRefObject, useCallback, useMemo } from 'react'
import { Chain } from '@wagmi/core'
import { Text } from '@obridge/uikit'
import styled from 'styled-components'
import { FixedSizeList } from 'react-window'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { ChainLogo } from 'components/Logo/ChainLogo'
import Column from '../Layout/Column'
import { RowBetween } from '../Layout/Row'

const MenuItem = styled(RowBetween)<{ disabled: boolean; selected: boolean }>`
  padding: 4px 20px;
  height: 56px;
  display: grid;
  grid-template-columns: auto minmax(auto, 1fr) minmax(0, 72px);
  grid-gap: 8px;
  cursor: ${({ disabled }) => !disabled && 'pointer'};
  pointer-events: ${({ disabled }) => disabled && 'none'};
  :hover {
    background-color: ${({ theme, disabled }) => !disabled && theme.colors.background};
  }
  opacity: ${({ disabled, selected }) => (disabled || selected ? 0.5 : 1)};
`

function ChainRow({
  chain,
  onSelect,
  isSelected,
  otherSelected,
  style,
}: {
  chain: Chain
  onSelect: () => void
  isSelected: boolean
  otherSelected: boolean
  style: CSSProperties
}) {
  return (
    <MenuItem
      style={style}
      className={`chain-item-${chain.id}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
      selected={otherSelected}
    >
      <ChainLogo chainId={chain.id} />
      <Column>
        <Text bold>{chain.name}</Text>
      </Column>
    </MenuItem>
  )
}

export default function ChainList({
  label,
  height,
  chains,
  selectedChain,
  otherChain,
  onChainSelect,
  fixedListRef,
}: {
  label: string
  height: number | string
  chains: Chain[]
  selectedChain?: Chain | null
  onChainSelect: (chain: Chain) => void
  otherChain?: Chain | null
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
}) {
  const { chainId } = useActiveWeb3React()

  const Row = useCallback(
    ({ data, index, style }) => {
      const chain: Chain = data[index]
      const isSelected = Boolean(selectedChain && chain && selectedChain.id === chain.id)
      const otherSelected = Boolean(otherChain && chain && otherChain.id === chain.id)
      const handleSelect = () => onChainSelect(chain)

      return (
        <ChainRow
          style={style}
          chain={chain}
          isSelected={isSelected}
          onSelect={handleSelect}
          otherSelected={otherSelected}
        />
      )
    },
    [selectedChain, otherChain, chainId, chains.length, onChainSelect],
  )

  const itemKey = useCallback((index: number, data: any) => data[index].id, [])

  return (
    <FixedSizeList
      width="100%"
      height={height}
      ref={fixedListRef as any}
      itemData={chains}
      itemCount={chains.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
