import { Button, Flex, Box, Text, Heading } from '@obridge/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from '@obridge/localization'
import styled, { DefaultTheme } from 'styled-components'

const ColoredLine = styled.hr`
  width: 100%;
  height: 1px;
  border-color: ${({ theme }) => theme.colors.secondary};
`

const Hero = () => {
  const { t } = useTranslation()
  return (
    <Box mx="25px">
      <Flex
        position="relative"
        flexDirection={['column-reverse', 'column', 'row', 'row']}
        alignItems="center"
        justifyContent="center"
        id="homepage-hero"
        style={{ gap: '100px' }}
      >
        <Flex flex="1" flexDirection="column" my="60px">
          <Heading scale="xxl" color="secondary" weight="700">
            {t('Cross-Chain')}
          </Heading>
          <Heading scale="xxl" color="secondary" weight="700" mb="24px">
            {t('Router Protocol')}
          </Heading>
          <Heading scale="md" mb="24px">
            {t('The Ultimate Router for Web3.0')}
          </Heading>
          <Flex my="30px">
            <NextLinkFromReactRouter to="/bridge">
              <Button variant="primary" py="30px" px="40px">
                {t('ENTER DAPP')}
              </Button>
            </NextLinkFromReactRouter>
          </Flex>
          <ColoredLine />
          <Flex>
            <Flex flex="1" alignItems="center" flexDirection="column" my="30px">
              <Heading scale="xl" color="secondary80" weight="600" mb="20px">
                {t('1M')}
              </Heading>
              <Text>Total Volume</Text>
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column" my="30px">
              <Heading scale="xl" color="secondary80" weight="600" mb="20px">
                {t('7')}
              </Heading>
              <Text>Chains</Text>
            </Flex>
            <Flex flex="1" alignItems="center" flexDirection="column" my="30px">
              <Heading scale="xl" color="secondary80" weight="600" mb="20px">
                {t('5')}
              </Heading>
              <Text>Tokens</Text>
            </Flex>
          </Flex>
        </Flex>
        {/* <Flex flex="1"></Flex> */}
      </Flex>
    </Box>
  )
}

export default Hero
