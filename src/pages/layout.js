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

  const useScrollToLocation = () => {
    const scrolledRef = React.useRef(false);
    const { hash } = useLocation();
    const hashRef = React.useRef(hash);

    React.useEffect(() => {
      if (hash) {
        // We want to reset if the hash has changed
        if (hashRef.current !== hash) {
          hashRef.current = hash;
          scrolledRef.current = false;
        }

        // only attempt to scroll if we haven't yet (this could have just reset above if hash changed)
        if (!scrolledRef.current) {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            scrolledRef.current = true;
          }
        }
      }
    });
  };

    return (
        <ThemeProvider>
          {mounted &&
            <StyledComponentsRegistry>
                <Navbar />
                <div className='tablet-down:h-[68px]'>
                </div>
                {children}
                <Footer />
                {/* <Chat /> */}
            </StyledComponentsRegistry>
            }
        </ThemeProvider>
    )
}
