import { useMatchBreakpoints } from '@obridge/uikit'
import PageSection from 'components/PageSection'
import Hero from './components/Hero'
import Intro from './components/Intro'
import Chains from './components/Chains'
import Projects from './components/Projects'
import Footer from './components/Footer'
import coinsImage from '../../../public/images/home/coins.gif'

const Home: React.FC<React.PropsWithChildren> = () => {
  const { isMobile } = useMatchBreakpoints()
  const src = !isMobile ? 'url(' + coinsImage.src + ')' : 'none'
  return (
    <>
      <PageSection
        containerProps={{ id: 'home-hero' }}
        innerProps={{ style: { margin: '0', padding: '0', width: '100%' } }}
        index={1}
        // style={{
        //   backgroundImage: src,
        //   backgroundSize: '50% auto',
        //   backgroundPosition: 'right top',
        //   backgroundRepeat: 'no-repeat',
        // }}
      >
        <Hero />
      </PageSection>
      <PageSection
        containerProps={{ id: 'home-intro' }}
        innerProps={{ style: { margin: '0', padding: '0', width: '100%' } }}
        index={2}
      >
        <Intro />
      </PageSection>
      <PageSection
        containerProps={{ id: 'home-chains' }}
        innerProps={{ style: { margin: '0', padding: '0', width: '100%' } }}
        index={3}
      >
        <Chains />
      </PageSection>
      <PageSection
        containerProps={{ id: 'home-projects' }}
        innerProps={{ style: { margin: '0', padding: '0', width: '100%' } }}
        index={4}
      >
        <Projects />
      </PageSection>
      <Footer />
    </>
  )
}

export default Home
