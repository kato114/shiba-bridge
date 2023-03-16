import { Button, Flex, Box, Text, Heading } from '@obridge/uikit'
import { useTranslation } from '@obridge/localization'
import Image from 'next/image'
import cubeImage from '../../../../public/images/home/cube.png'
import cyberImage from '../../../../public/images/home/cyber-security.png'
import swapImage from '../../../../public/images/home/swap.png'

const Intro = () => {
  const { t } = useTranslation()

  return (
    <Box mx="25px">
      <Flex py="50px" flexDirection={['column-reverse', null, 'row', 'row']}>
        <Flex flex="1" flexDirection="column" alignItems="center" p="30px">
          <Image src={cyberImage} priority />
          <Heading scale="md" color="secondary" weight="600" my="20px">
            Non Custodial
          </Heading>
          <Text textAlign="center" style={{ lineHeight: '1.7' }}>
            MPC, the powerful symbol of decentralization, processes Multichain cross-chain bridging and smart contract
            methods on other chains.
          </Text>
        </Flex>
        <Flex flex="1" flexDirection="column" alignItems="center" p="30px">
          <Image src={swapImage} priority />
          <Heading scale="md" color="secondary" weight="600" my="20px">
            No-slippage Swap
          </Heading>
          <Text textAlign="center" style={{ lineHeight: '1.7' }}>
            Shibwallet 1:1 swap enables users to perform 0 slippage transfers and eliminate the hidden cost associated
            with AMM.
          </Text>
        </Flex>
        <Flex flex="1" flexDirection="column" alignItems="center" p="30px">
          <Image src={cubeImage} priority />
          <Heading scale="md" color="secondary" weight="600" my="20px">
            Multichain Router
          </Heading>
          <Text textAlign="center" style={{ lineHeight: '1.7' }}>
            ShibWallet Router allows users to swap between any two chains freely. It reduces fees and makes it easier to
            move between chains.
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Intro
