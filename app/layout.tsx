import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { TranslationProvider } from '@/lib/translation-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AIChatbot } from '@/components/ai-chatbot'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Charm (魅力) | Premium Cleaning Excellence',
  description: 'Experience the future of premium cleaning with Charm. Luxurious, eco-friendly, and technologically advanced cleaning solutions for the modern home.',
  generator: 'v0.app',
  keywords: ['premium detergent', 'eco-friendly cleaning', 'luxury cleaning products', 'Charm', '魅力'],
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Charm (魅力) | Premium Cleaning Excellence',
    description: 'Experience the future of premium cleaning with Charm.',
    images: ['/logo.png'],
  },
}

export const viewport = {
  themeColor: '#10069F',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <TranslationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <AIChatbot />
        </TranslationProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
