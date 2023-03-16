import { ChainId } from '@obridge/sdk'
import { Flex } from '@obridge/uikit'
import Page from '../Page'

import BridgeForm from './components/BridgeForm'
import { StyledBridgeContainer } from './styles'

export const ACCESS_TOKEN_SUPPORT_CHAIN_IDS = [ChainId.BSC]

export default function Bridge() {
  return (
    <Page>
      <Flex width="100%" justifyContent="center" position="relative">
        <StyledBridgeContainer>
          <BridgeForm />
        </StyledBridgeContainer>
      </Flex>
    </Page>
  )
}
