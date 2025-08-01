'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '../common/logo'
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

interface FullScreenMenuProps {
  onClose: () => void
}

export default function FullScreenMenu({ onClose }: FullScreenMenuProps) {
  const menuItems = [
    { name: "ABOUT US", href: "/about" },
    { name: "ALL ON FOUR", href: "/all-on-four" },
    { name: "DENTAL IMPLANTS", href: "#" },
    { name: "VENEERS", href: "/veneers" },
    { name: "RESULTS GALLERY", href: "/results-gallery" },
    { name: "CONTACT US", href: "/contact" }
  ]

  const handleClose = () => {
    onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-gradient-to-br from-black/95 via-purple-900/20 to-pink-900/10 backdrop-blur-xl z-50 overflow-hidden"
      onClick={handleClose}
    >
      {/* Close Button */}
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleClose()
        }}
        className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center group z-30"
        aria-label="Close menu"
      >
        <div className="relative w-8 h-8">
          <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white group-hover:bg-purple-400 transition-colors transform -translate-y-1/2 rotate-45" />
          <span className="absolute top-1/2 left-0 w-full h-[1px] bg-white group-hover:bg-purple-400 transition-colors transform -translate-y-1/2 -rotate-45" />
        </div>
      </button>

      {/* Menu Content */}
      <div 
        className="h-screen w-full flex flex-col items-center justify-between py-8 px-6 relative z-20 overflow-hidden" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Logo at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo variant="white" />
        </motion.div>

        {/* Navigation centered */}
        <nav className="text-center space-y-4 md:space-y-6 flex-1 flex flex-col justify-center">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="block"
            >
              <Link
                href={item.href}
                onClick={handleClose}
                className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extralight hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-400 transition-all duration-300 tracking-[0.2em] uppercase relative inline-block cursor-pointer hover:scale-110 transform-gpu"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Social Media Icons at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex space-x-6 mt-8"
        >
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-purple-400 transition-colors duration-300"
          >
            <FaFacebook size={28} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-purple-400 transition-colors duration-300"
          >
            <FaInstagram size={28} />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-purple-400 transition-colors duration-300"
          >
            <FaYoutube size={28} />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-purple-400 transition-colors duration-300"
          >
            <FaWhatsapp size={28} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
} 