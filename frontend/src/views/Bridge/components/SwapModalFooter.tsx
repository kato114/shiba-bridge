import styled from 'styled-components'
import { Button, Text } from '@obridge/uikit'
import { AutoColumn } from 'components/Layout/Column'
import { AutoRow } from 'components/Layout/Row'

const SwapModalFooterContainer = styled(AutoColumn)`
  margin: 35px;
`

export default function SwapModalFooter({ onConfirm }: { onConfirm: () => void }) {
  return (
    <>
      <SwapModalFooterContainer>
        <Text
          fontSize="20px"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            textAlign: 'right',
            paddingLeft: '10px',
          }}
        >
          Are you sure to send token to another network?
        </Text>
      </SwapModalFooterContainer>
      <AutoRow>
        <Button variant="primary" onClick={onConfirm} disabled={false} mt="12px" id="confirm-swap-or-send" width="100%">
          Confirm Swap
        </Button>
      </AutoRow>
    </>
  )
}
