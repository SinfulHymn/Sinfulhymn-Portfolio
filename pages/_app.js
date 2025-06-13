import '@/css/tailwind.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'

import '@fontsource/inter/variable-full.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import VisitorTracker from '@/components/VisitorTracker'
import LayoutWrapper from '@/components/LayoutWrapper'
import { ClientReload } from '@/components/ClientReload'
import Transition from '@/components/animations/Transition'
import PageLoad from '@/components/animations/PageLoad'
import MainLayout from '@/layouts/MainLayout'

const isDevelopment = process.env.NODE_ENV === 'development'
const isSocket = process.env.SOCKET

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      {isDevelopment && isSocket && <ClientReload />}
      {/* <Analytics /> */}
      <VisitorTracker />
      <LayoutWrapper>
        <Transition>
          <PageLoad>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </PageLoad>
        </Transition>
      </LayoutWrapper>
    </ThemeProvider>
  )
}
