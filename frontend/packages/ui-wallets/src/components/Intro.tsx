import { Trans, useTranslation } from '@obridge/localization'
import { AtomBox } from '@obridge/ui/components/AtomBox'
import { Button, Heading, Image, LinkExternal, Text } from '@obridge/uikit'
import { useState } from 'react'
import { getDocLink } from '../docLangCodeMapping'

const IntroSteps = [
  {
    title: <Trans>Your first step in the DeFi world</Trans>,
    icon: 'https://static.wixstatic.com/media/cbedf8_a28a501eb2114a11ad7e18fa5667c5d7~mv2.png/v1/fill/w_50,h_50,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/cbedf8_a28a501eb2114a11ad7e18fa5667c5d7~mv2.png',
    description: (
      <Trans>
        A Web3 Wallet allows you to send and receive crypto assets like bitcoin, BNB, ETH, NFTs and much more.
      </Trans>
    ),
  },
  {
    title: <Trans>Login using a wallet connection</Trans>,
    icon: 'https://cdn.obridge.com/wallets/world_lock.png',
    description: (
      <Trans>
        Instead of setting up new accounts and passwords for every website, simply set up your wallet in one go, and
        connect it to your favorite DApps.
      </Trans>
    ),
  },
]

const StepDot = ({ active, place, onClick }: { active: boolean; place: 'left' | 'right'; onClick: () => void }) => (
  <AtomBox padding="4px" onClick={onClick} cursor="pointer">
    <AtomBox
      bgc={active ? 'secondary' : 'inputSecondary'}
      width="56px"
      height="8px"
      borderLeftRadius={place === 'left' ? 'card' : '0'}
      borderRightRadius={place === 'right' ? 'card' : '0'}
    />
  </AtomBox>
)

export const StepIntro = () => {
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const [step, setStep] = useState(0)

  const introStep = IntroSteps[step]

  return (
    <AtomBox
      display="flex"
      width="full"
      flexDirection="column"
      style={{ gap: '24px' }}
      mx="auto"
      my="48px"
      textAlign="center"
      alignItems="center"
    >
      {introStep && (
        <>
          <Heading as="h2" color="secondary">
            {introStep.title}
          </Heading>
          <Image m="auto" src={introStep.icon} width={198} height={178} />
          <Text maxWidth="368px" m="auto" small color="textSubtle">
            {introStep.description}
          </Text>
        </>
      )}
      <AtomBox display="flex">
        <StepDot place="left" active={step === 0} onClick={() => setStep(0)} />
        <StepDot place="right" active={step === 1} onClick={() => setStep(1)} />
      </AtomBox>
      <Button minHeight={40} variant="subtle" external as={LinkExternal} color="backgroundAlt" href={getDocLink(code)}>
        {t('Learn How to Connect')}
      </Button>
    </AtomBox>
  )
}
