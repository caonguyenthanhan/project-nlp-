import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NLP Toolkit",
  description: "A comprehensive toolkit for Natural Language Processing techniques",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b">
          <div className="container mx-auto py-4">
            <h1 className="text-2xl font-bold">NLP Toolkit</h1>
          </div>
        </header>
        {children}
        <footer className="border-t mt-12">
          <div className="container mx-auto py-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} NLP Course - All rights reserved
          </div>
        </footer>
      </body>
    </html>
  )
}

