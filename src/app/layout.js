// These styles apply to every route in the application
import './globals.css'
 
export const metadata = {
  title: '慈濟資訊網',
  description: '慈濟資訊網',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}