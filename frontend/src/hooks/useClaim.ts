import { useTranslation } from '@obridge/localization'
import { useCake, useFaucetContract } from 'hooks/useContract'
import { useToast } from '@obridge/uikit'
import { useCallWithMarketGasPrice } from 'hooks/useCallWithMarketGasPrice'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'

const useClaim = () => {
  const { t } = useTranslation()
  const { toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { callWithMarketGasPrice } = useCallWithMarketGasPrice()
  const faucetContract = useFaucetContract()

  const handleClaim = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return callWithMarketGasPrice(faucetContract, 'claim', [])
    })
    if (receipt?.status) {
      toastSuccess(
        t('Success'),
        t('You have successfully claimed'),
      )
    }
  }

return { onClaim: handleClaim, pendingTx }
}

export default useClaim