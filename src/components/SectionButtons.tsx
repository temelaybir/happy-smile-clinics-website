'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail } from 'lucide-react'
import ContactFormPopup from '@/components/ui/contact-form-popup'

interface ButtonSettings {
  text: string
  url: string
  openInNewTab: boolean
  enabled: boolean
}

interface SiteSettings {
  buttons: {
    whatsapp: ButtonSettings
    contact: ButtonSettings
    hero: ButtonSettings
  }
}

interface SectionButtonsProps {
  settings: SiteSettings | null
}

export default function SectionButtons({ settings }: SectionButtonsProps) {
  const [isContactOpen, setIsContactOpen] = useState(false)
  
  if (!settings) return null

  const { whatsapp, contact } = settings.buttons

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
    >
      {whatsapp.enabled && (
        <a
          href={whatsapp.url}
          target={whatsapp.openInNewTab ? '_blank' : '_self'}
          rel={whatsapp.openInNewTab ? 'noopener noreferrer' : undefined}
        >
          <Button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-wider font-light transition-all duration-500 group w-full sm:w-auto max-w-xs">
            <MessageCircle className="w-4 h-4 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
            {whatsapp.text.toUpperCase()}
          </Button>
        </a>
      )}

      {contact.enabled && (
        <Button 
          onClick={() => setIsContactOpen(true)}
          className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 sm:px-12 py-4 text-xs sm:text-sm uppercase tracking-wider font-light transition-all duration-500 group w-full sm:w-auto max-w-xs"
        >
          <Mail className="w-4 h-4 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
          {contact.text.toUpperCase()}
        </Button>
      )}
    </motion.div>

    {/* Contact Modal */}
    {isContactOpen && (
      <ContactFormPopup onClose={() => setIsContactOpen(false)} />
    )}
    </>
  )
}