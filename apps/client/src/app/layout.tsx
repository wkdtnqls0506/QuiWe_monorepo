import Header from '../components/Header'
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="px-4">{children}</main>
      </body>
    </html>
  )
}
