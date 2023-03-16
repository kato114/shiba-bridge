import { Box, Flex, Text } from '@obridge/uikit'
import { BsTwitter, BsTelegram, BsDiscord } from 'react-icons/bs'
import { TfiGithub } from 'react-icons/tfi'
import { SiGitbook } from 'react-icons/si'
import styled, { DefaultTheme } from 'styled-components'
import Image from 'next/image'
import footerImage from '../../../../public/images/home/footer-logo.png'

const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundAlt3};
`

const StyledFlex = styled(Flex)`
  margin: 0px auto;
  gap: 30px;
  max-width: 1200px;
`

const Footer = () => {
  return (
    <StyledBox>
      <StyledFlex
        flexDirection={['column', null, null, 'row']}
        justifyContent={['center', null, null, 'end']}
        alignItems={['center', null, null, 'end']}
        px="15px"
        py="15px"
      >
        <Flex mr="25px" style={{ gap: '20px' }}>
          <a href="https://twitter.com/ShibWalletERC" target="_blank">
            <BsTwitter style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="https://github.com/ShibWallet" target="_blank">
            <TfiGithub style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="https://shibwallet.gitbook.io/shibwallet/" target="_blank">
            <SiGitbook style={{ color: 'white', fontSize: '20px' }} />
          </a>
          <a href="https://t.me/ShibWalletERC" target="_blank">
            <BsTelegram style={{ color: 'white', fontSize: '20px' }} />
          </a>
        </Flex>
      </StyledFlex>
    </StyledBox>
  )
}

export default Footer
