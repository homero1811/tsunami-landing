import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
  description:
    'Tsunami Automation builds custom AI + automation systems for growth-focused businesses. We handle the tech. You focus on closing. Set up in 2 weeks. Results in 90 days.',
  openGraph: {
    title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
    description:
      'Custom automation systems that generate pipeline and reduce manual work. Starter plans from $299/mo.',
    url: 'https://tsunamiautomation.com',
    siteName: 'Tsunami Automation',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tsunami Automation — Automate your pipeline. Close more deals.',
    description:
      'Custom automation systems that generate pipeline and reduce manual work.',
  },
  metadataBase: new URL('https://tsunamiautomation.com'),
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
