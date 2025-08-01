'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ContactFormPopup from '@/components/ui/contact-form-popup'
import { stickyModels } from './sticky-sidebar-models'

interface StickyItem {
  id: string
  label: string
  icon: string
  action: string
  value: string
  enabled: boolean
}

interface StickySettings {
  items: StickyItem[]
  model: string
}

const defaultSettings: StickySettings = {
  model: 'gradient',
  items: [
    {
      id: 'events',
      label: 'Events',
      icon: 'calendar',
      action: 'link',
      value: '/events',
      enabled: true
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: 'message',
      action: 'modal',
      value: 'contact',
      enabled: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: 'phone',
      action: 'external',
      value: 'https://wa.me/905551234567',
      enabled: true
    },
    {
      id: 'instagram',
      label: 'Instagram',
      icon: 'instagram',
      action: 'external',
      value: 'https://instagram.com/happysmileclinicstr',
      enabled: true
    }
  ]
}

export default function StickySidebar() {
  const [settings, setSettings] = useState<StickySettings>(defaultSettings)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isAdminPage, setIsAdminPage] = useState(false)

  useEffect(() => {
    // Check if we're on an admin page
    const checkAdminPage = () => {
      if (typeof window !== 'undefined') {
        setIsAdminPage(window.location.pathname.startsWith('/admin'))
      }
    }
    
    checkAdminPage()
    
    // Listen for route changes
    const handleRouteChange = () => checkAdminPage()
    window.addEventListener('popstate', handleRouteChange)
    
    // Load custom settings from API
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/public/sticky-sidebar')
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setSettings({
              items: data.items || defaultSettings.items,
              model: data.model || defaultSettings.model
            })
          }
        }
      } catch (error) {
        console.error('Failed to load sticky sidebar settings:', error)
      }
    }

    loadSettings()

    // Show after a short delay
    setTimeout(() => setIsVisible(true), 1000)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const handleItemClick = (item: StickyItem) => {
    switch (item.action) {
      case 'modal':
        if (item.value === 'contact') {
          setIsContactOpen(true)
        }
        break
      case 'external':
        window.open(item.value, '_blank')
        break
      // 'link' action is handled by Link component
    }
  }

  const enabledItems = settings.items.filter(item => item.enabled)

  if (enabledItems.length === 0 || isAdminPage) return null

  const isLink = (item: StickyItem) => item.action === 'link'
  
  const ModelComponent = stickyModels[settings.model]?.component || stickyModels.gradient.component

  return (
    <>
      {/* Desktop - Right Side */}
      <motion.div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ModelComponent 
          items={enabledItems} 
          onItemClick={handleItemClick}
          isLink={isLink}
        />
      </motion.div>

      {/* Mobile - Bottom */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <ModelComponent 
          items={enabledItems} 
          onItemClick={handleItemClick}
          isLink={isLink}
        />
      </motion.div>

      {/* Contact Modal */}
      {isContactOpen && (
        <ContactFormPopup onClose={() => setIsContactOpen(false)} />
      )}
    </>
  )
}