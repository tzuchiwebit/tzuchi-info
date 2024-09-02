"use client"
// These styles apply to every route in the application
import StyledComponentsRegistry from '@/lib/registry'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'
// import Chat from '@/components/navigation/chat/Chat'
import { useState, useEffect } from "react"
import DataProvider from "@/components/navigation/navbar/DataProvider"
import NewsEmergency from '@/components/navigation/navbar/components/NewsEmergency'
import NewsMarquee from '@/components/navigation/navbar/components/NewsMarquee'
import Script from "next/script";
import { Suspense } from "react";
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'

// export const viewport = {
//   // width: 1600,
//   // width: 'device-wdith',
//   width: 'device-width, shrink-to-fit=no',
//   initialScale: 1,
//   maximumScale: 1,
//   minimumScale: 1,
//   userScalable: false,
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.svg" sizes="any" />
      {
        process.env.NEXT_PUBLIC_ENV_NAME !== 'production' &&
        <meta name="robots" content="noindex, nofollow" />
      }
      <head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta> */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KD3PM6KH');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD3PM6KH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <Suspense>
          <DataProvider>
            <StyledComponentsRegistry>
              <Navbar />
              <div className='tablet-down:h-[62px]' />
              <NewsEmergency></NewsEmergency>
              <NewsMarquee></NewsMarquee>
              {children}
              <Footer />
              {/* <Chat /> */}
            </StyledComponentsRegistry>
          </DataProvider>
        </Suspense>
      </body>
    </html>
  );
}
