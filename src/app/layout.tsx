import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
  description:
    'Tsunami Automation designs, builds, and maintains custom automation systems for modern service businesses. Starter plans from $120/mo. 10+ hours freed per month, guaranteed.',
  openGraph: {
    title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
    description:
      'Custom automation systems for modern service businesses. Reduce manual work, close more deals. Starter plans from $120/mo.',
    url: 'https://growthos.tsunamiautomation.com',
    siteName: 'Tsunami Automation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
    description:
      'Custom automation systems for modern service businesses. 10+ hours freed per month, guaranteed.',
  },
  metadataBase: new URL('https://growthos.tsunamiautomation.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
