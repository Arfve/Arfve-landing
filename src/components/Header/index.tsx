'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-6 md:px-32 py-16 bg-white relative">
      <div className="flex w-full md:w-auto justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="Arfve Logo"
            width={113}
            height={41}
            priority
            className="w-[113px] h-[41px]"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-10">
        <Link 
          href="/legacy-1" 
          className="text-base text-black font-inter font-normal hover:no-underline"
        >
          Legacy 1
        </Link>
        <Link 
          href="/innovation" 
          className="text-base text-black font-inter font-normal hover:no-underline"
        >
          Arfve Innovation
        </Link>
        <Link 
          href="/about" 
          className="text-base text-black font-inter font-normal hover:no-underline"
        >
          About us
        </Link>
        <Link 
          href="/faq" 
          className="text-base text-black font-inter font-normal hover:no-underline"
        >
          FAQ
        </Link>
      </nav>

      {/* Account and Cart */}
      <div className="hidden md:flex items-center gap-6">
        <Link 
          href="/account" 
          className="text-base text-black font-inter font-normal hover:no-underline"
        >
          My account
        </Link>
        <button className="w-8 h-8 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 16C4.9 16 4.01 16.9 4.01 18C4.01 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16ZM0 0V2H2L5.6 9.59L4.25 12.04C4.09 12.32 4 12.65 4 13C4 14.1 4.9 15 6 15H18V13H6.42C6.28 13 6.17 12.89 6.17 12.75L6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.59 16.3 9.97L19.88 3.48C19.96 3.34 20 3.17 20 3C20 2.45 19.55 2 19 2H4.21L3.27 0H0ZM16 16C14.9 16 14.01 16.9 14.01 18C14.01 19.1 14.9 20 16 20C17.1 20 18 19.1 18 18C18 16.9 17.1 16 16 16Z" fill="black"/>
          </svg>
        </button>
      </div>

      {/* Mobile menu button */}
      <button 
        className="md:hidden absolute right-6 top-6"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile menu */}
      <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden flex-col items-center gap-6 w-full mt-4`}>
        <Link href="/legacy-1" className="text-base text-black font-inter font-normal">Legacy 1</Link>
        <Link href="/innovation" className="text-base text-black font-inter font-normal">Arfve Innovation</Link>
        <Link href="/about" className="text-base text-black font-inter font-normal">About us</Link>
        <Link href="/faq" className="text-base text-black font-inter font-normal">FAQ</Link>
        <Link href="/account" className="text-base text-black font-inter font-normal">My account</Link>
      </nav>
    </header>
  )
} 