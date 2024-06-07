import type { Metadata } from 'next'
import { Lato } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import MobileMenubar from './components/mobile-menubar'
import DesktopMenubar from './components/desktop-menubar'
import { Activity } from 'lucide-react'

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
})

export const metadata: Metadata = {
  title: 'App de balance mensual',
  description: 'Aplicación de balance mensual de gastos en servicios',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es' className='dark'>
      <body className={`${lato.className} antialiased`}>
        <header className='flex w-full justify-between md:justify-start md:gap-8 items-center px-4 py-2 md:px-8 md:py-4 border-b-2 border-stone-500/30'>
          <Link href='/' className='flex gap-2 items-center md:items-stretch'>
            <Activity className='self-center' />
            <h1 className='font-bold text-2xl'>Balance App</h1>
          </Link>
          <MobileMenubar />
          <DesktopMenubar />
        </header>
        {children}
      </body>
    </html>
  )
}
