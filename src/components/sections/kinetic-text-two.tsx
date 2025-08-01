'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail } from 'lucide-react'
import StandardButton from '@/components/ui/standard-button'
import ContactFormPopup from '@/components/ui/contact-form-popup'

gsap.registerPlugin(ScrollTrigger)

export default function KineticTextTwo() {
  const [phrases, setPhrases] = useState(["GET A FREE", "QUOTE", "TODAY"])
  const [subtitle, setSubtitle] = useState("Get your personalized treatment plan and pricing in 24 hours")
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  // Fetch homepage content
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/public/homepage?t=' + Date.now())
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

  useEffect(() => {
    const words = gsap.utils.toArray('.kinetic-word')
    
    words.forEach((word: any, index) => {
      gsap.fromTo(word,
        {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          rotateZ: index % 2 === 0 ? -5 : 5
        },
        {
          opacity: 1,
          x: 0,
          rotateZ: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      )

      // Floating animation
      gsap.to(word, {
        y: index % 2 === 0 ? -15 : 15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.3
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [phrases])

  return (
    <section ref={sectionRef} className="relative py-16 bg-black overflow-hidden">
      <motion.div 
        style={{ scale, opacity }}
        className="absolute inset-0"
      >
        {/* Minimal gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-900/20" />
          {/* Simple floating dots */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      <div ref={textRef} className="relative max-w-6xl mx-auto px-4 text-center">
        <div className="space-y-4">
          {phrases.filter(phrase => phrase.length > 0).map((phrase, index) => (
            <motion.div
              key={phrase}
              className="kinetic-word perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 
                className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter"
                style={{
                  background: index === 1 
                    ? 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)' 
                    : 'linear-gradient(90deg, #fff 0%, #e5e5e5 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {phrase}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Animated line */}
        <motion.div
          className="mt-12 mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: "200px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
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
        
        {/* Subtitle */}
        <motion.p 
          className="mt-8 text-lg text-gray-400 font-light max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      </div>
      
      {/* Contact Form Popup */}
      {isContactFormOpen && (
        <ContactFormPopup onClose={() => setIsContactFormOpen(false)} />
      )}
    </section>
  )
}