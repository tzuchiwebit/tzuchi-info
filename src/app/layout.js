// These styles apply to every route in the application
import './globals.css'
import StyledComponentsRegistry from '@/lib/registry'
import Head from 'next/head'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'

export const metadata = {
  title: '慈濟資訊網',
  description: '慈濟資訊網',
  // icons: {
  //   icon: '/icon/icon.svg', // /public path
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="./favicon.ico" type="image/svg" sizes="any" />
      </Head>

      <body>
        <StyledComponentsRegistry>
          <Navbar />
          {children}
          <Footer />
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}