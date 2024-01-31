
import Providers from '@/lib/Providers'
import './globals.css'
import ToastProvider from '@/lib/ToastProvider'



export const metadata = {
  title: 'ইজি লার্নিং প্লাটফর্ম',
  description: 'Easy Job Preparetion | Easy Learning Platform',
}

export default function RootLayout({ children }) {
  return (
    <Providers>
      <html lang="en" data-theme='light'>
        <body>
          <ToastProvider>
            {children}
          </ToastProvider>
        </body>
      </html>
    </Providers>
  )
}
