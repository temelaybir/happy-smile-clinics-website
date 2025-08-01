'use client'

import Link from "next/link"
import { Facebook, Instagram, Youtube } from 'lucide-react'

interface SocialLinksProps {
  variant?: 'header' | 'footer'
}

export default function SocialLinks({ variant = 'header' }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/happysmileclinics',
      icon: Facebook
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/happysmileclinics',
      icon: Instagram
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/happysmileclinics',
      icon: Youtube
    }
  ]

  const baseClasses = variant === 'footer' 
    ? 'text-gray-400 hover:text-green-400' 
    : 'text-gray-400 hover:text-green-500'

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} transition-colors`}
            aria-label={social.name}
          >
            <Icon className="w-5 h-5" />
          </Link>
        )
      })}
    </div>
  )
} 