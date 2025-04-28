'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShopifyMenuItem } from '@/types/shopify';
import { FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface FooterProps {
  menuItems: ShopifyMenuItem[];
  copyright?: string;
  cookieSettingsText?: string;
  socialLinks: {
    youtube: string;
    instagram: string;
    linkedin: string;
  };
}

const SOCIAL_ICONS = {
  youtube: { Icon: FaYoutube, color: '#FF0000' },
  instagram: { Icon: FaInstagram, color: '#E4405F' },
  linkedin: { Icon: FaLinkedin, color: '#0077B5' },
} as const;

export default function Footer({ copyright, cookieSettingsText, socialLinks, menuItems }: FooterProps) {
  return (
    <footer className="w-full bg-[#FFFFFF]">
      <div className="max-w-[1440px] mx-auto px-8 md:px-32 py-8 md:py-[32px]">
        {/* Single Row Layout */}
        <div className="flex items-center justify-between gap-8">
          {/* Left Section: Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo.svg"
              alt="Arfve"
              width={113}
              height={41}
              className="w-[113px] h-[41px]"
              sizes="113px"
            />
          </Link>

          {/* Center Section: Links and Copyright */}
          <div className="flex items-center gap-[12px]">
            <button className="font-inter text-base text-black hover:opacity-70 transition-opacity">
              Privacy policy
            </button>
            <button className="font-inter text-base text-black hover:opacity-70 transition-opacity">
              {cookieSettingsText || 'Cookie settings'}
            </button>
            <span className="font-inter text-base text-black">{copyright || '© 2025 Arfve'}</span>
          </div>

          {/* Right Section: Social Icons */}
          <div className="flex items-center gap-[20px] shrink-0">
            {(Object.entries(SOCIAL_ICONS) as [keyof typeof SOCIAL_ICONS, { Icon: IconType; color: string }][])
              .map(([platform, { Icon, color }]) => (
                <Link
                  key={platform}
                  href={socialLinks?.[platform] || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[30px] h-[30px] hover:opacity-70 transition-opacity flex items-center"
                >
                  <Icon className="w-full h-full" style={{ color }} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}