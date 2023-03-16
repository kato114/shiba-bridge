import styled from 'styled-components'
import { Text, Spinner } from '@obridge/uikit'
import { useTranslation } from '@obridge/localization'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'

const Wrapper = styled.div`
  width: 100%;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 24px 0;
`

function ConfirmationPendingContent() {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <ConfirmedIcon>
        <Spinner />
      </ConfirmedIcon>
      <AutoColumn gap="12px" justify="center">
        <Text fontSize="20px">{t('Waiting For Confirmation')}</Text>
        <AutoColumn gap="12px" justify="center">
          <Text bold small textAlign="center">
            Pending....
          </Text>
        </AutoColumn>
        <Text small color="textSubtle" textAlign="center">
          {t('Do not close browser until transaction is confirmed.')}
        </Text>
      </AutoColumn>
    </Wrapper>
  )
}

export default ConfirmationPendingContent
