"use client";

import Image from 'next/image'
import Link from 'next/link'
// import { useState } from 'react'
import { ShopifyMenuItem } from '@/types/shopify'

interface HeaderProps {
  menuItems: ShopifyMenuItem[];
  onToggleMute?: () => void;
  isMuted?: boolean;
}

export default function Header({ menuItems, onToggleMute, isMuted }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent">
      <div className="w-[1440px] h-[87px] mx-auto flex justify-center items-center px-[124px] py-16 gap-[323px] isolate">
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
        <nav className="flex items-center gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className="font-inter text-base text-white hover:opacity-70 transition-opacity">
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Video Controls */}
        {onToggleMute && (
          <button
            onClick={onToggleMute}
            className="p-2 hover:opacity-70 transition-opacity"
          >
            <Image
              src={isMuted ? "/volume-off.svg" : "/volume-on.svg"}
              alt={isMuted ? "Unmute" : "Mute"}
              width={24}
              height={24}
              className="w-6 h-6 text-white"
            />
          </button>
        )}
      </div>
    </header>
  );
}
