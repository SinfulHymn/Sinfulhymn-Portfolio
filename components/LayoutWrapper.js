import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import GradientOverlay from './GradientOverlay'
import Image from 'next/image'

const LayoutWrapper = ({ children }) => {
  return (
    <SectionContainer>
      {/* <GradientOverlay /> */}{' '}
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-8  sm:py-8">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between ">
                <div className="flex justify-center  text-2xl font-semibold dark:text-secondaryAccent dark:hover:text-primaryAccent sm:hidden"></div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="flex items-center justify-center text-2xl font-semibold text-secondaryAccent hover:text-primaryAccent focus:text-secondaryAccent dark:text-secondaryAccentDark dark:hover:text-neonblush dark:focus:text-secondaryAccentDark sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-secondaryAccent hover:text-primaryAccent dark:text-secondaryAccentDark dark:text-gray-100 dark:hover:text-neonblush sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
