import { useCallback } from 'react'
import { TransactionResponse } from '@ethersproject/providers'
import { Contract, CallOverrides } from '@ethersproject/contracts'
import get from 'lodash/get'
import { addBreadcrumb } from '@sentry/nextjs'

export function useCallWithMarketGasPrice() {
  /**
   * Perform a contract call with a gas price returned from useGasPrice
   * @param contract Used to perform the call
   * @param methodName The name of the method called
   * @param methodArgs An array of arguments to pass to the method
   * @param overrides An overrides object to pass to the method. gasPrice passed in here will take priority over the price returned by useGasPrice
   * @returns https://docs.ethers.io/v5/api/providers/types/#providers-TransactionReceipt
   */
  const callWithMarketGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      methodArgs: any[] = [],
      overrides: CallOverrides = null,
    ): Promise<TransactionResponse> => {
      addBreadcrumb({
        type: 'Transaction',
        message: `Call with market gas price`,
        data: {
          contractAddress: contract.address,
          methodName,
          methodArgs,
          overrides,
        },
      })

      const contractMethod = get(contract, methodName)
      console.log('[prince] contract', contract)
      console.log('[prince] contract.address', contract.address)
      console.log('[prince] methodName', methodName)
      console.log('[prince] contractMethod', contractMethod)
      const tx = await contractMethod(...methodArgs, { ...overrides })

      if (tx) {
        addBreadcrumb({
          type: 'Transaction',
          message: `Transaction sent: ${tx.hash}`,
          data: {
            hash: tx.hash,
            from: tx.from,
            gasLimit: tx.gasLimit?.toString(),
            nonce: tx.nonce,
          },
        })
      }

      return tx
    },
    [],
  )

  return { callWithMarketGasPrice }
}
