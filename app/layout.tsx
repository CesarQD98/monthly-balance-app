import type { Metadata } from 'next'
import { Inter, Lato } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
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
    <html lang='es'>
      <body className={`${lato.className} antialiased`}>{children}</body>
    </html>
  )
}
