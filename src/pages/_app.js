import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import Layout from './layout'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <link rel="icon" href="./favicon.svg" sizes="any" />
                <title>慈濟資訊網</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}