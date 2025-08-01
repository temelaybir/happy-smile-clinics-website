'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail } from 'lucide-react'
import StandardButton from '@/components/ui/standard-button'
import ContactFormPopup from '@/components/ui/contact-form-popup'

export default function KineticTextTwo() {
  const [phrases, setPhrases] = useState(["GET A FREE", "QUOTE", "TODAY"])
  const [subtitle, setSubtitle] = useState("Get your personalized treatment plan and pricing in 24 hours")
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)

  // Fetch homepage content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/homepage?t=' + Date.now(), {
          cache: 'no-store'
        })
        if (response.ok) {
          const data = await response.json()
          if (data.success && data.content?.effectTexts?.kineticTwo) {
            setPhrases(data.content.effectTexts.kineticTwo.phrases)
            setSubtitle(data.content.effectTexts.kineticTwo.subtitle)
          }
        }
      } catch (error) {
        console.error('Error fetching homepage content:', error)
      }
    }
    fetchContent()
  }, [])

  return (
    <section className="relative py-12 bg-black overflow-hidden">
      {/* Subtle floating lights */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute w-32 h-32 bg-purple-400/[0.02] rounded-full blur-[60px]"
          animate={{
            x: ['0%', '100%', '0%'],
            y: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-40 h-40 bg-pink-400/[0.02] rounded-full blur-[70px]"
          animate={{
            x: ['100%', '0%', '100%'],
            y: ['100%', '0%', '100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute w-24 h-24 bg-white/[0.01] rounded-full blur-[50px]"
          animate={{
            x: ['50%', '0%', '100%', '50%'],
            y: ['0%', '50%', '50%', '0%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="space-y-4">
          {phrases.filter(phrase => phrase.length > 0).map((phrase, index) => (
            <motion.h2
              key={phrase}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                background: index === 1 
                  ? 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)' 
                  : 'linear-gradient(90deg, #fff 0%, #e5e5e5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: index === 1 
                  ? '0 0 30px rgba(168, 85, 247, 0.15)' 
                  : '0 0 20px rgba(255, 255, 255, 0.1)',
                filter: index === 1 
                  ? 'drop-shadow(0 0 15px rgba(236, 72, 153, 0.1))' 
                  : 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.05))'
              }}
            >
              {phrase}
            </motion.h2>
          ))}
        </div>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <StandardButton
            href="https://wa.me/905551234567"
            target="_blank"
            rel="noopener noreferrer"
            icon={<MessageCircle className="w-5 h-5" />}
            className="bg-purple-500/20 border-purple-500/30 hover:bg-purple-500/30 text-purple-100"
          >
            WhatsApp Consultation
          </StandardButton>
          
          <StandardButton
            onClick={() => setIsContactFormOpen(true)}
            icon={<Mail className="w-5 h-5" />}
          >
            Contact Form
          </StandardButton>
        </motion.div>
        
        <motion.p 
          className="mt-8 text-lg text-gray-400 font-light max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {subtitle}
        </motion.p>
      </div>
      
      {isContactFormOpen && (
        <ContactFormPopup onClose={() => setIsContactFormOpen(false)} />
      )}
    </section>
  )
}