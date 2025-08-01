'use client'

import { motion } from 'framer-motion'
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const happySmileLinks = [
  { name: 'Veneers', href: '/veneers' },
  { name: 'Dental Implants', href: '/dental-implants' },
  { name: 'Results Gallery', href: '/results-gallery' },
  { name: 'Online Consultation', href: '/online-consultation' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Contact Us', href: '/contact-us' },
]

const faqLinks = [
  { name: 'What distinguishes All-on-X?', href: '/faq/all-on-x' },
  { name: 'Who is an ideal candidate for All-on-X?', href: '/faq/candidate' },
  { name: 'Why choose Happy Smile Clinic for my All-on-X treatment?', href: '/faq/why-choose' },
  { name: 'What are the E-max® and Zirconia?', href: '/faq/materials' },
  { name: 'Can veneers fall off?', href: '/faq/veneers' },
  { name: 'What are dental implants?', href: '/faq/implants' },
  { name: 'Why do we need implants?', href: '/faq/need-implants' },
  { name: 'Do dental implants look natural?', href: '/faq/natural-look' },
]

const contactInfo = [
  {
    icon: MapPin,
    text: 'Altunizade Mahallesi, Kısıklı Caddesi, Şarkuysan AK Plaza A Blok No:4 Kat:3, 34662 Üsküdar/Istanbul'
  },
  {
    icon: Phone,
    text: '+44 7460 644222'
  },
  {
    icon: Phone,
    text: '+90 850 305 95 95'
  },
  {
    icon: Mail,
    text: 'hello@hsctr.com'
  }
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Dental Guarantee Contract', href: '/dental-guarantee' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/happysmileclinicstr', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/happysmileclinictr', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/happysmileclinicstr', label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900/50 text-white py-16 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Happy Smile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Image
                src="/images/logo-white.webp"
                alt="Happy Smile Clinics"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors duration-500 ease-out"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </Link>
              ))}
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <h3 className="text-white uppercase tracking-wider" style={{ 
                fontFamily: '"Poiret One", sans-serif', 
                fontSize: '22px', 
                fontWeight: '300' 
              }}>
                HAPPY SMILE
              </h3>
              <div className="space-y-2">
                {happySmileLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="block text-gray-300 hover:text-white transition-colors duration-400 ease-out english-uppercase tracking-wide"
                      style={{ 
                        fontFamily: '"Manrope", sans-serif', 
                        fontSize: '15px', 
                        fontWeight: '200'
                      }}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Middle Column - FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-white uppercase tracking-wider" style={{ 
              fontFamily: '"Poiret One", sans-serif', 
              fontSize: '22px', 
              fontWeight: '300' 
            }}>
              FAQ
            </h3>
            <div className="space-y-2">
              {faqLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.08, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="block text-gray-300 hover:text-white transition-colors duration-300 english-uppercase tracking-wide"
                    style={{ 
                      fontFamily: '"Manrope", sans-serif', 
                      fontSize: '15px', 
                      fontWeight: '200'
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Contact */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-white uppercase tracking-wider" style={{ 
              fontFamily: '"Poiret One", sans-serif', 
              fontSize: '22px', 
              fontWeight: '200' 
            }}>
              CONTACT
            </h3>
            
            {/* Contact Information */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.12, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <item.icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                      <p className="text-gray-300 leading-relaxed english-uppercase" style={{ 
                      fontFamily: '"Manrope", sans-serif', 
                      fontSize: '15px', 
                      fontWeight: '200'
                    }}>
                    {item.text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Legal Links */}
            <div className="space-y-2 pt-4 border-t border-gray-800">
              {legalLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.08, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.href}
                    className="block text-gray-400 hover:text-white transition-colors duration-400 ease-out english-uppercase tracking-wide"
                    style={{ 
                      fontFamily: '"Manrope", sans-serif', 
                      fontSize: '15px', 
                      fontWeight: '200'
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800 text-center"
        >
                      <p className="text-gray-400 english-uppercase" style={{ 
              fontFamily: '"Manrope", sans-serif', 
              fontSize: '14px', 
              fontWeight: '200'
            }}>
            © 2025 Happy Smile Clinics. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
} 