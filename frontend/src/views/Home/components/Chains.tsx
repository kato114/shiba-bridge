import { Flex, Box, Text, Heading } from '@obridge/uikit'
import styled from 'styled-components'
import Image from 'next/image'
import chain1 from '../../../../public/images/home/1.png'
import chain2 from '../../../../public/images/home/2.png'
import chain3 from '../../../../public/images/home/3.png'
import chain4 from '../../../../public/images/home/4.png'
import chain5 from '../../../../public/images/home/5.png'
import chain6 from '../../../../public/images/home/6.png'

const StyledFlex = styled(Flex)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  gap: 20px;
  min-width: 100px;
  max-width: 50%;
  padding: 40px 0px;
`

const Chains = () => {
  return (
    <Box mx="25px">
      <Heading scale="xl" color="secondary" weight="700" mt="100px">
        Supported Chains
      </Heading>
      <Flex py="80px" flexDirection="row" flexWrap="wrap" style={{ gap: '40px' }}>
        <StyledFlex flex="1" flexDirection="column" alignItems="center">
          <Image src={chain1} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            Ethereum
          </Text>
        </StyledFlex>
        <StyledFlex flex="1" flexDirection="column" alignItems="center">
          <Image src={chain2} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            BNB Chain
          </Text>
        </StyledFlex>
        <StyledFlex flex="1" flexDirection="column" alignItems="center">
          <Image src={chain3} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            Shibarium
          </Text>
        </StyledFlex>
        <StyledFlex flex="1" flexDirection="column" alignItems="center">
          <Image src={chain4} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            Fantom
          </Text>
        </StyledFlex>
        <StyledFlex flex="1" flexDirection="column" alignItems="center">
          <Image src={chain5} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            Avalanche
          </Text>
        </StyledFlex>
        <StyledFlex flex="1" flexDirection="column" alignItems="center" style={{ maxWidth: '100%' }}>
          <Image src={chain6} priority />
          <Text textAlign="center" style={{ fontWeight: 700 }}>
            Polygon
          </Text>
        </StyledFlex>
      </Flex>
    </Box>
  )
}

export default Chains
