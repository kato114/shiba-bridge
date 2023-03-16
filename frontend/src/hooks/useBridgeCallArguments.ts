import { Contract } from '@ethersproject/contracts'
import { Router, SwapParameters, Currency, CurrencyAmount } from '@obridge/sdk'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { useRouterContract } from 'utils/exchange'
import { receiveMessageOnPort } from 'worker_threads'

export interface SwapCall {
  contract: Contract
  parameters: SwapParameters
}

/**
 * Returns the swap calls that can be used to make the trade
 * @param recipientAddressOrName
 */
export function useBridgeCallArguments(
  type: number,
  recipientAddress: string | null, // the address of the recipient of the trade, or null if swap should be returned to sender
  oTokenAddress: string,
  toChainID: number, // the address of the recipient of the trade, or null if swap should be returned to sender
  amount: CurrencyAmount<Currency>, // the address of the recipient of the trade, or null if swap should be returned to sender
): SwapCall[] {
  const { account, chainId } = useActiveWeb3React()
  const recipient = recipientAddress === null ? account : recipientAddress
  const contract = useRouterContract()

  return useMemo(() => {
    if (!recipient || !account || !chainId) return []

    if (!contract) {
      return []
    }

    const swapMethods = []

    swapMethods.push(
      Router.swapCallParameters({
        type,
        recipient,
        oTokenAddress,
        toChainID,
        amount,
      }),
    )

    return swapMethods.map((parameters) => ({ parameters, contract }))
  }, [account, chainId, contract, recipient, toChainID, amount, type, oTokenAddress, recipientAddress])
}
