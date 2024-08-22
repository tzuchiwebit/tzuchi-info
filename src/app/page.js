import Container from "@/shared/layout/Container"
import Home from "@/components/home"
import Head from 'next/head'

export const metadata = {
  title: '慈濟資訊網',
  description: '訪問慈濟資訊網，與全球慈濟脈動保持同步，無論是最新志工早會資訊、證嚴上人開示，還是慈濟近期焦點，都能在慈濟資訊網找到。 ',
  openGraph: {
    images: ["https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K"],
  },
}

const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

export default function Page() {

  return <>
      {/* <Head>
        <title>慈濟資訊網</title>
        <meta name="description" content="訪問慈濟資訊網，與全球慈濟脈動保持同步，無論是最新志工早會資訊、證嚴上人開示，還是慈濟近期焦點，都能在慈濟資訊網找到。"></meta>
        <meta property="og:title" content="慈濟資訊網" />
        <meta property="og:image" content="https://imagedelivery.net/oK0RK5YvW3bVFXgaGP6foQ/032741ee-fac7-44b6-3cea-649da4b8ff00/2K" />
        <meta property="og:description" content="訪問慈濟資訊網，與全球慈濟脈動保持同步，無論是最新志工早會資訊、證嚴上人開示，還是慈濟近期焦點，都能在慈濟資訊網找到。" />
      </Head> */}
      <Container noPaddingTablet noPadding>
        <Home />
      </Container>
    </>
}
