// These styles apply to every route in the application
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import Head from 'next/head'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'
import Chat from '@/components/navigation/chat/Chat'

export const metadata = {
  title: '慈濟資訊網',
  description: '慈濟資訊網',
  // icons: {
  //   icon: '/icon/icon.svg', // /public path
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>

      <body>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <Navbar />
            {children}
            <Footer />
            <Chat />
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}
