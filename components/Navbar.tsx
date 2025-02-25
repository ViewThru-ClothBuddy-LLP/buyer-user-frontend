"use client"

import Link from "next/link"
import { Search, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"




export default function Navbar() {

  return (
    <nav className="bg-black px-4 py-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-white text-xl font-bold">
          ClothBuddy
        </Link>

        {/* Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-4">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search for Products"
              className="w-full pl-10 pr-4 py-2 bg-[#333333] border-none text-white placeholder-gray-400 rounded-md focus:ring-0"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Right Navigation Items */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Icon */}
          <Button variant="ghost" size="icon" className="md:hidden text-white">
            <Search className="h-5 w-5" />
          </Button>

          {/* Wishlist */}
          <Button variant="ghost" size="icon" className="text-white">
            <Heart className="h-5 w-5" />
          </Button>

          {/* Cart */}
          <Button variant="ghost" size="icon" className="text-white">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {/* Sign In Button */}
          <Button  variant="ghost" className="text-white hover:bg-gray-800">
          <Link href="/create-account" className="text-white text-xl font-bold">
          
          Sign In
        </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}



