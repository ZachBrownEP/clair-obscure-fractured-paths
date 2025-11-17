import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Cinzel, Cinzel_Decorative } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import BackgroundMusic from '@/components/background-music'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700']
});
const _cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: '--font-decorative',
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: 'Clair Obscur: Fractured Paths',
  description: 'Continue the story beyond Expedition 33. A dark fantasy companion and interactive story experience.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#181818',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${_geist.className} ${_cinzel.variable} ${_cinzelDecorative.variable} font-sans antialiased`}>
        <BackgroundMusic />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
