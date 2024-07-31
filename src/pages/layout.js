// These styles apply to every route in the application
import StyledComponentsRegistry from '@/lib/registry'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'
// import Chat from '@/components/navigation/chat/Chat'
import { useState, useEffect } from "react"

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
    return (
        <ThemeProvider>
          {mounted &&
            <StyledComponentsRegistry>
                <Navbar />
                {children}
                <Footer />
                {/* <Chat /> */}
            </StyledComponentsRegistry>
            }
        </ThemeProvider>
    )
}
