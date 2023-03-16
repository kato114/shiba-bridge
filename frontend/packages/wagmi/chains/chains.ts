import { rinkeby, mainnet, goerli } from 'wagmi/chains'
import { Chain } from 'wagmi'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: 'https://rpc.ankr.com/avalanche_fuji',
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.ftm.tools',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: 'https://rpc.testnet.fantom.network',
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    public: 'https://bsc-dataseed1.binance.org',
    default: 'https://bsc-dataseed1.binance.org',
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 15921452,
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    public: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
    default: 'https://data-seed-prebsc-1-s2.binance.org:8545/',
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
  testnet: false,
}

export const dyno: Chain = {
  id: 7363,
  name: 'DND Network Mainnet',
  network: 'dyno-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'DND',
  },
  rpcUrls: {
    public: 'https://rpc.dynochain.io/',
    default: 'https://rpc.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://dynoscan.io/' },
  },
  multicall: {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11',
    blockCreated: 17422483,
  },
}

export const dynoTest: Chain = {
  id: 7364,
  name: 'DND Network Testnet',
  network: 'dyno-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Dyno Chain Native Token',
    symbol: 'tDND',
  },
  rpcUrls: {
    public: 'https://rpctest.dynochain.io/',
    default: 'https://rpctest.dynochain.io/',
  },
  blockExplorers: {
    default: { name: 'DynoScan', url: 'https://testnet.dynoscan.io/' },
  },
  multicall: {
    address: '0xFB2aAb966943d4e88CA0d1533c949a4849deBD12',
    blockCreated: 670512,
  },
  testnet: false,
}

export const shiba: Chain = {
  id: 917,
  name: 'Shiba Chain',
  network: 'shiba-mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Shiba Chain Native Token',
    symbol: 'BONE',
  },
  rpcUrls: {
    public: 'https://puppynet.shibrpc.com',
    default: 'https://puppynet.shibrpc.com',
  },
  blockExplorers: {
    default: { name: 'PuppyScan', url: 'https://puppyscan.shib.io' },
  },
  multicall: {
    address: '0x1c1875446765D2E50E3398afd9819F094249F531',
    blockCreated: 390064,
  },
}

export const shibaTest: Chain = {
  id: 917,
  name: 'Puppy Net',
  network: 'shiba-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Puppy Net Native Token',
    symbol: 'BONE',
  },
  rpcUrls: {
    public: 'https://puppynet.shibrpc.com',
    default: 'https://puppynet.shibrpc.com',
  },
  blockExplorers: {
    default: { name: 'PuppyScan', url: 'https://puppyscan.shib.io' },
  },
  multicall: {
    address: '0x1c1875446765D2E50E3398afd9819F094249F531',
    blockCreated: 390064,
  },
}

export { rinkeby, mainnet, goerli }
