'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StandardButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: ReactNode
  disabled?: boolean
}

export default function StandardButton({ 
  children, 
  onClick, 
  href, 
  target, 
  rel, 
  type = 'button',
  className = '',
  icon,
  disabled = false
}: StandardButtonProps) {
  const baseClasses = "inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm text-white font-medium rounded-lg border border-white/20 hover:bg-white/10 transition-all duration-500"
  const combinedClasses = `${baseClasses} ${className}`

  const content = (
    <>
      {icon && icon}
      <span>{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {content}
    </motion.button>
  )
}