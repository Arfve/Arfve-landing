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
        {/* Main Content Container */}
        <div className="flex flex-col gap-[32px]">
          {/* Top Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-[32px]">
            {/* Logo */}
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

            {/* Navigation Links */}
            <nav className="flex flex-wrap justify-center items-center gap-[41px]">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="font-inter text-base text-black hover:opacity-70 transition-opacity"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Social Icons */}
            <div className="flex items-center gap-[20px] shrink-0">
              {(Object.entries(SOCIAL_ICONS) as [keyof typeof SOCIAL_ICONS, { Icon: IconType; color: string }][])
                .map(([platform, { Icon, color }]) => (
                  <Link
                    key={platform}
                    href={socialLinks?.[platform] || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[30px] h-[30px] hover:opacity-70 transition-opacity"
                  >
                    <Icon className="w-full h-full" style={{ color }} />
                  </Link>
                ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-[12px] text-center">
            <button data-tracking-id="privacy-policy-button" className="font-inter text-base text-black hover:opacity-70 transition-opacity">
              Privacy policy
            </button>
            <button data-tracking-id="cookie-settings-button" className="font-inter text-base text-black hover:opacity-70 transition-opacity">
              {cookieSettingsText || 'Cookie settings'}
            </button>
            <span className="font-inter text-base text-black">{copyright || '© 2025 Arfve'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}