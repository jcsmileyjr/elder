import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Keeping Up',
  description: 'An app that allows multiple people to contribute to the care of a loved one.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
