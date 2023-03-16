import { useMemo } from 'react'
import { Trade, TradeType, CurrencyAmount, Currency } from '@obridge/sdk'
import { Button, Text, ErrorIcon, ArrowDownIcon } from '@obridge/uikit'
import { Field } from 'state/bridge/actions'
import { useTranslation } from '@obridge/localization'
import { computeTradePriceBreakdown, warningSeverity } from 'utils/exchange'
import { AutoColumn } from 'components/Layout/Column'
import { CurrencyLogo } from 'components/Logo'
import { RowBetween, RowFixed } from 'components/Layout/Row'
import truncateHash from '@obridge/utils/truncateHash'
import { TruncatedText, SwapShowAcceptChanges } from './styleds'

export default function SwapModalHeader({ recipient }: { recipient: string | null }) {
  const { t } = useTranslation()

  const inputTextColor = 'text'

  const tradeInfoText = t('Input is estimated. You will sell at most or the transaction will revert.')

  const truncatedRecipient = recipient ? truncateHash(recipient) : ''

  const recipientInfoText = t('Output will be sent to %recipient%', {
    recipient: truncatedRecipient,
  })

  const [recipientSentToText, postSentToText] = recipientInfoText.split(truncatedRecipient)

  return (
    <AutoColumn gap="md">
      {recipient !== null ? (
        <AutoColumn justify="center" gap="sm" style={{ padding: '12px 0 0 0px' }}>
          <Text color="textSubtle">
            {recipientSentToText}
            <b title={recipient}>{truncatedRecipient}</b>
            {postSentToText}
          </Text>
        </AutoColumn>
      ) : null}
    </AutoColumn>
  )
}
