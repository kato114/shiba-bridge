import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { Flex, Button, Menu as UikitMenu } from '@obridge/uikit'
import { useTranslation, languageList } from '@obridge/localization'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import useTheme from 'hooks/useTheme'
import { useCakeBusdPrice } from 'hooks/useBUSDPrice'
import UserMenu from './UserMenu'
import { useMenuItems } from './hooks/useMenuItems'
import { getActiveMenuItem } from './utils'
import { footerLinks } from './config/footerConfig'

const Menu = (props) => {
  const { isDark, setTheme } = useTheme()
  const cakePriceUsd = useCakeBusdPrice({ forceMainnet: true })
  const { currentLanguage, setLanguage, t } = useTranslation()
  const { pathname } = useRouter()

  const toggleTheme = useMemo(() => {
    return () => setTheme(isDark ? 'light' : 'dark')
  }, [setTheme, isDark])

  const getFooterLinks = useMemo(() => {
    return footerLinks(t)
  }, [t])

  return (
    <>
      <UikitMenu
        linkComponent={(linkProps) => {
          return <NextLinkFromReactRouter to={linkProps.href} {...linkProps} prefetch={false} />
        }}
        rightSide={
          pathname !== '/' ? (
            <>
              <NetworkSwitcher />
              <UserMenu />
            </>
          ) : (
            <Flex my="30px">
              <NextLinkFromReactRouter to="/bridge">
                <Button variant="primary">ENTER DAPP</Button>
              </NextLinkFromReactRouter>
            </Flex>
          )
        }
        isDark={isDark}
        toggleTheme={toggleTheme}
        currentLang={currentLanguage.code}
        langs={languageList}
        setLang={setLanguage}
        cakePriceUsd={cakePriceUsd}
        links={[]}
        subLinks={[]}
        footerLinks={getFooterLinks}
        activeItem={[[]]}
        activeSubItem={[]}
        buyCakeLabel={t('Buy BRG')}
        {...props}
      />
    </>
  )
}

export default Menu
