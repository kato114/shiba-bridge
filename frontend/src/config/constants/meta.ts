import memoize from 'lodash/memoize'
import { ContextApi } from '@obridge/localization'
import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'ShibWallet',
  description: 'Cross-Chain Router Protocol. The Ultimate Router for Web3.0',
  image: 'https://shibwallet.app/wp-content/uploads/2022/10/gif2.gif',
}

interface PathList {
  paths: { [path: string]: { title: string; basePath?: boolean; description?: string } }
  defaultTitleSuffix: string
}

const getPathList = (t: ContextApi['t']): PathList => {
  return {
    paths: {
      '/': { title: t('Home') },
      '/swap': { basePath: true, title: t('Exchange') },
      '/limit-orders': { basePath: true, title: t('Limit Orders') },
      '/add': { basePath: true, title: t('Add Liquidity') },
      '/remove': { basePath: true, title: t('Remove Liquidity') },
      '/liquidity': { title: t('Liquidity') },
      '/find': { title: t('Import Pool') },
      '/farms': { title: t('Farms') },
      '/info': { title: t('Overview'), description: 'View statistics for ShibWallet.' },
      '/info/pools': { title: t('Pools'), description: 'View statistics for ShibWallet.' },
      '/info/tokens': { title: t('Tokens'), description: 'View statistics for ShibWallet.' },
    },
    defaultTitleSuffix: t('ShibWallet'),
  }
}

export const getCustomMeta = memoize(
  (path: string, t: ContextApi['t'], _: string): PageMeta => {
    const pathList = getPathList(t)
    const pathMetadata =
      pathList.paths[path] ??
      pathList.paths[Object.entries(pathList.paths).find(([url, data]) => data.basePath && path.startsWith(url))?.[0]]

    if (pathMetadata) {
      return {
        title: `${pathMetadata.title} | ${t(pathList.defaultTitleSuffix)}`,
        ...(pathMetadata.description && { description: pathMetadata.description }),
      }
    }
    return null
  },
  (path, t, locale) => `${path}#${locale}`,
)
