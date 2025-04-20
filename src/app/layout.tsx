import './globals.css'
import { Montserrat } from 'next/font/google'
import { Metadata } from 'next'
import Provider from '@/app/( main )/board/providers/provider'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Monochi',
    default: 'Monochi',
  },
  description: 'Welcome to Monochi - Share your thoughts and connect with others',
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: 'Monochi',
    description: 'Welcome to Monochi - Share your thoughts and connect with others',
    images: [
      {
        url: '/logo.jpg',
        width: 800,
        height: 600,
        alt: 'Monochi Logo',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/logo.jpg'],
  },
  icons: {
    icon: '/logo.jpg',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased bg-white h-full w-full`}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
