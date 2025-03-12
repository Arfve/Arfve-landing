"use client";

import Image from 'next/image'
import Link from 'next/link'
// import { useState } from 'react'
import { ShopifyMenuItem } from '@/types/shopify'

interface HeaderProps {
  menuItems: ShopifyMenuItem[];
}

export default function Header({ menuItems }: HeaderProps) {
  return (
    <header className="w-full bg-white ">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-[124px] py-8 lg:py-16 ">
        <div className="max-w-[1192px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-[41px] w-full ">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Arfve Logo"
              width={113}
              height={41}
              className="w-[113px] h-[41px]"
              priority
              loading="eager"
              sizes="113px"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 w-full">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className="font-inter text-base text-black hover:opacity-70">
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Account */}
          <div className="shrink-0">
            <span className="font-inter text-base text-black">My account</span>
          </div>
        </div>
      </div>
    </header>
  );
}
