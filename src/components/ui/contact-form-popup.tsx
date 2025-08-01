'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { X, ChevronDown } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().min(6, {
    message: "Please enter a valid phone number.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

// Custom Select component for modal that renders inline
const ModalSelect = ({ value, onValueChange, className }: any) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectedCountry = countries.find(c => c.code === value)
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('.modal-select-container')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])
  
  return (
    <div className="relative modal-select-container">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        <div className="flex items-center justify-between w-full">
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img 
                src={selectedCountry.flag} 
                alt={selectedCountry.name}
                className="w-5 h-4 rounded-sm object-cover"
              />
              <span>{selectedCountry.name}</span>
            </div>
          ) : (
            <span className="text-gray-400">Select Country</span>
          )}
          <ChevronDown className="h-4 w-4 opacity-50" />
        </div>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full min-w-[240px] bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-lg z-50 max-h-[200px] overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => {
                onValueChange(country.code)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left hover:bg-white/10 transition-colors flex items-center gap-3 text-white"
            >
              <img 
                src={country.flag} 
                alt={country.name}
                className="w-5 h-4 rounded-sm object-cover"
              />
              <span>{country.name}</span>
              {country.dialCode && (
                <span className="text-gray-400 ml-auto">({country.dialCode})</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Country data in exact order we want
const countries = [
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '/images/flags/gb.png' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '/images/flags/mt.png' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '/images/flags/us.png' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '/images/flags/tr.png' },
  { code: 'OTHER', name: 'Other', dialCode: '', flag: '/images/flags/other.png' },
]

interface ContactFormPopupProps {
  onClose: () => void
}

export default function ContactFormPopup({ onClose }: ContactFormPopupProps) {
  const [selectedCountry, setSelectedCountry] = useState('GB')
  const [customDialCode, setCustomDialCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  // Lock body scroll when modal is open
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY
    
    // Prevent scrolling
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      // Restore body scroll
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      
      // Restore scroll position
      window.scrollTo(0, scrollY)
    }
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      const dialCode = selectedCountry === 'OTHER' 
        ? customDialCode 
        : countries.find(c => c.code === selectedCountry)?.dialCode || ''
      
      const country = selectedCountry === 'OTHER' && customDialCode
        ? `Other (${customDialCode})`
        : countries.find(c => c.code === selectedCountry)?.name || 'Other'
      
      const formData = {
        name: values.name,
        email: values.email,
        phone: dialCode + values.phone,
        message: values.message,
        country
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitMessage('Thank you! Your message has been sent successfully.')
        form.reset()
        setSelectedCountry('GB')
        setCustomDialCode('')
        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        throw new Error(result.error || 'Failed to send message')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitMessage('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl w-full max-w-lg p-8 relative my-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-300"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="mb-8">
            <h3 className="text-2xl font-light mb-2 text-white">Send us a Message</h3>
            <p className="text-gray-300 font-light">We'll get back to you within 24 hours.</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Your full name"
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 text-base font-light h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-light" />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex gap-3">
                  <ModalSelect 
                    value={selectedCountry} 
                    onValueChange={setSelectedCountry}
                    className="w-auto min-w-[200px] bg-white/10 backdrop-blur-sm border border-white/20 text-white h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300 px-3 flex items-center justify-between cursor-pointer hover:bg-white/15"
                  />

                  {selectedCountry === 'OTHER' && (
                    <Input
                      placeholder="Dial code (e.g., +49)"
                      value={customDialCode}
                      onChange={(e) => setCustomDialCode(e.target.value)}
                      className="w-32 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 text-base font-light h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300"
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Phone number"
                          className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 text-base font-light h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-400 font-light" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Email address"
                        type="email"
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 text-base font-light h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-light" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea 
                        placeholder="Please enter your message."
                        rows={4}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-gray-400 text-base font-light resize-none focus:ring-0 focus:border-white/30 rounded-lg transition-all duration-300"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 font-light" />
                  </FormItem>
                )}
              />

              {submitMessage && (
                <div className={`p-4 rounded-lg text-center font-light ${
                  submitMessage.includes('Thank you') 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}>
                  {submitMessage}
                </div>
              )}

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-white/5 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10 transition-all duration-500 ease-out h-12 text-base font-light tracking-wider uppercase rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'SENDING...' : 'SEND'}
              </Button>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}