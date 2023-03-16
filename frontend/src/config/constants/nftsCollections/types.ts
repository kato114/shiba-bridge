import { Address } from '../types'

export enum OBridgeCollectionKey {
  OBRIDGE = 'obridge',
  SQUAD = 'obridgeSquad',
}

export type OBridgeCollection = {
  name: string
  description?: string
  slug: string
  address: Address
}

export type OBridgeCollections = {
  [key in OBridgeCollectionKey]: OBridgeCollection
}
