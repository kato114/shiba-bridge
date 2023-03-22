import { StaticJsonRpcProvider } from '@ethersproject/providers'

export const bscProvider = new StaticJsonRpcProvider(
  {
    url: 'https://nodes.shibwallet.app',
    skipFetchSetup: true,
  },
  56,
)

export const bscTestnetProvider = new StaticJsonRpcProvider(
  {
    url: 'https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5',
    skipFetchSetup: true,
  },
  97,
)

export const goerliProvider = new StaticJsonRpcProvider(
  {
    url: 'eth-goerli.g.alchzemy.com/v2/wof7auYpE1XflYQac4zJxK3ix4Yk855C',
    skipFetchSetup: true,
  },
  5,
)
