// These styles apply to every route in the application
import Head from 'next/head'

export const metadata = {
  title: '慈濟資訊網 - 全球志業',
  description: '慈濟資訊網 - 全球志業',
}

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </Head>
      <main>{children}</main>
    </>
  )
}
