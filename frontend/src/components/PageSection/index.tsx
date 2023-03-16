import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from '@obridge/uikit'
import Container from 'components/Layout/Container'

interface PageSectionProps extends BackgroundColorProps {
  svgFill?: string
  containerProps?: BoxProps
  innerProps?: BoxProps
}

interface BackgroundColorProps extends FlexProps {
  index: number
}

const BackgroundColor = styled(Flex).attrs({ className: 'page-bg' as string })<BackgroundColorProps>`
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme, index }) => (index % 2 == 0 ? theme.colors.backgroundAlt : 'none')};
  z-index: ${({ index }) => index - 1};
`

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  padding-top: 16px;
  padding-bottom: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 32px;
    padding-bottom: 32px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 48px;
    padding-bottom: 48px;
  }
`

const PageSection: React.FC<React.PropsWithChildren<PageSectionProps>> = ({
  children,
  index = 1,
  containerProps,
  innerProps,
  ...props
}) => {
  return (
    <Box {...containerProps}>
      <BackgroundColor index={index} {...props}>
        <ChildrenWrapper {...innerProps}>{children}</ChildrenWrapper>
      </BackgroundColor>
    </Box>
  )
}

export default PageSection
