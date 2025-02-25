// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar"
// import { AuthProvider } from "@/contexts/AuthContext"
import "@fortawesome/fontawesome-free/css/all.min.css"; // ✅ Correct way in Next.js



const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ClothBuddy",
  description: "Your Fashion Destination",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AuthProvider> */}
          <Navbar />
          {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  )
}