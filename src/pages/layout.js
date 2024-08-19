// These styles apply to every route in the application
import StyledComponentsRegistry from '@/lib/registry'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'
// import Chat from '@/components/navigation/chat/Chat'
import { useState, useEffect } from "react"
import DataProvider from "@/components/navigation/navbar/DataProvider"
import NewsEmergency from '@/components/navigation/navbar/components/NewsEmergency'

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

    return (
        <ThemeProvider>
          {mounted &&
            <DataProvider>
              <StyledComponentsRegistry>
                <Navbar />
                <div className='tablet-down:h-[68px]' />
                <NewsEmergency></NewsEmergency>
                {children}
                <Footer />
                {/* <Chat /> */}
              </StyledComponentsRegistry>
            </DataProvider>
            }
        </ThemeProvider>
    )
}
