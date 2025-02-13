'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShopifyMenuItem } from '@/types/shopify'

interface HeaderProps {
  menuItems: ShopifyMenuItem[]
}

export default function Header({ menuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex flex-row justify-between items-center px-[124px] py-16 w-[1440px] h-[133px] bg-white">
      {/* Logo */}
      <Link href="/" className="w-[113px] h-[41px]">
        <div className="relative w-full h-full">
          <Image 
            src="/logo.svg" 
            alt="Arfve Logo" 
            fill 
            priority
            style={{objectFit: 'contain'}} 
          />
        </div>
      </Link>

      {/* Nav Links - centered */}
      <nav className="flex flex-row items-center gap-[41px] w-[416px]">
        {menuItems.map((item) => (
          <Link 
            key={item.id} 
            href={item.url} 
            className="text-base text-black font-inter font-normal hover:no-underline"
          >
            {item.title}
          </Link>
        ))}
      </nav>

      {/* Account */}
      <div className="flex items-center">
        <span className="text-base text-black font-inter font-normal">My account</span>
      </div>
    </header>
  )
} 