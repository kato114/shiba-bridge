import { Modal } from '@obridge/uikit'
import { useTranslation } from '@obridge/localization'

const ConfirmBridgeModalContainer = ({ children, handleDismiss }) => {
  const { t } = useTranslation()

  return (
    <Modal title={t('Confirm Swap')} headerBackground="gradientCardHeader" onDismiss={handleDismiss}>
      {children}
    </Modal>
  )
}

export default ConfirmBridgeModalContainer
