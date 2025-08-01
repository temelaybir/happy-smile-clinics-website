'use client'

import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  variant?: 'default' | 'white'
}

export default function Logo({ variant = 'white' }: LogoProps) {
  return (
    <Link href="/" className="relative z-10">
      <div className="w-40 md:w-48">
        <Image
          src="/images/logo-white.webp"
          alt="Happy Smile Clinics"
          width={192}
          height={48}
          className="w-full h-auto"
          priority
          quality={100}
          style={{
            imageRendering: '-webkit-optimize-contrast'
          }}
        />
      </div>
    </Link>
  )
} 