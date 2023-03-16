import { Button, Flex, Box, Text, Heading } from '@obridge/uikit'
import { useWeb3React } from '@obridge/wagmi'
import { useTranslation } from '@obridge/localization'
import { BsCheckCircle } from 'react-icons/bs'
import Image from 'next/image'
import { NextLinkFromReactRouter } from 'components/NextLink'
import styled, { DefaultTheme } from 'styled-components'
import projects from '../../../../public/images/home/project.gif'

interface ThemedIconLabel {
  theme: DefaultTheme
}

const StyledBsCheckCircle = styled(BsCheckCircle)`
  margin-right: 15px;
  fill: ${({ theme }) => theme.colors.secondary};
`

const ImageWrapper = styled.div<ThemedIconLabel>`
  width: 100%;
  will-change: transform;
  > span {
    overflow: visible !important; // make sure the next-image pre-build blur image not be cropped
  }
`
const Projects = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()

  return (
    <Box mx="25px">
      <Flex
        position="relative"
        flexDirection={['column', null, 'row', 'row']}
        alignItems={['flex-start', null, null, 'center']}
        justifyContent="center"
        id="homepage-projects"
      >
        <Flex flex="1" flexDirection="column" my="60px">
          <Heading scale="xl" color="secondary" weight="700" mb="16px">
            {t('Integrations 2460+')}
          </Heading>
          <Heading scale="xl" color="secondary" weight="700" mb="24px">
            {t('Projects & 56 Chains')}
          </Heading>
          <Box>
            <Flex my="30px">
              <Flex flex="1" alignItems="center">
                <StyledBsCheckCircle />
                <Text>Multichain tokens</Text>
              </Flex>
              <Flex flex="1" alignItems="center">
                <StyledBsCheckCircle />
                <Text>Easy integration</Text>
              </Flex>
              <Flex flex="1" alignItems="center">
                <StyledBsCheckCircle />
                <Text>Free listing</Text>
              </Flex>
              <Flex flex="1" alignItems="center">
                <StyledBsCheckCircle />
                <Text>Quick deployment</Text>
              </Flex>
            </Flex>
          </Box>
          <Flex my="30px">
            <NextLinkFromReactRouter to="/bridge">
              <Button variant="primary" py="30px" px="40px">
                {t('ENTER DAPP')}
              </Button>
            </NextLinkFromReactRouter>
          </Flex>
        </Flex>
        {/* <Flex flex="1" height="100%" width="100%" mb={['24px', null, null, '0']} position="relative">
          <ImageWrapper>
            <Image src={projects} priority alt={t('flying chains')} />
          </ImageWrapper>
        </Flex> */}
      </Flex>
    </Box>
  )
}

export default Projects
