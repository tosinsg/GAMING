import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/components/providers/session-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "FF Arena - Free Fire Gaming Community",
  description: "The ultimate destination for Free Fire gamers and fans",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload avatar images to prevent 404s */}
        <link rel="preload" as="image" href="/images/avatars/avatar-1.png" />
        <link rel="preload" as="image" href="/images/avatars/avatar-2.png" />
      </head>
      <body className="min-h-screen bg-black text-white">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
