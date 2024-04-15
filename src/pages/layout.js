// These styles apply to every route in the application
import StyledComponentsRegistry from '@/lib/registry'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Navbar from '@/components/navigation/navbar/Navbar'
import Footer from '@/components/navigation/footer/Footer'
import Chat from '@/components/navigation/chat/Chat'

export default function RootLayout({ children }) {
    return (
        <ThemeProvider>
            <StyledComponentsRegistry>
                <Navbar />
                {children}
                <Footer />
                <Chat />
            </StyledComponentsRegistry>
        </ThemeProvider>
    )
}
