'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  phone: z.string().min(10, {
    message: 'Please enter a valid phone number.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
})

// Country data in exact order we want
const countries = [
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '/images/flags/gb.png' },
  { code: 'MT', name: 'Malta', dialCode: '+356', flag: '/images/flags/mt.png' },
  { code: 'US', name: 'United States', dialCode: '+1', flag: '/images/flags/us.png' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '/images/flags/tr.png' },
  { code: 'OTHER', name: 'Other', dialCode: '', flag: '/images/flags/other.png' },
]

const contactInfo = [
  {
    icon: Phone,
    text: '+90 850 305 95 95'
  },
  {
    icon: Mail,
    text: 'hello@hsctr.com'
  },
  {
    icon: MapPin,
    text: 'Altunizade Mah, Kısıklı Cad, Sarıkaysan Ak Plaza A Blok No:4 Kat:3. Üsküdar/Istanbul'
  }
]

export default function ContactSection() {
  const [selectedCountry, setSelectedCountry] = useState('GB')
  const [customDialCode, setCustomDialCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setSubmitMessage('')
    
    try {
      // Get dial code based on selected country
      const dialCode = selectedCountry === 'OTHER' 
        ? customDialCode 
        : countries.find(c => c.code === selectedCountry)?.dialCode || ''
      
      // Get country name
      const countryName = countries.find(c => c.code === selectedCountry)?.name || 'Other'
      
      const formData = {
        name: values.name,
        email: values.email,
        phone: `${dialCode}${values.phone}`,
        message: values.message,
        country: countryName
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
    <section className="py-20 bg-gradient-to-b from-black to-gray-900/50 text-white">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid lg:grid-cols-[1.2fr,1.3fr] gap-12 items-start">
          {/* Left Side - Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-white/90 tracking-wide">
                Get in Touch
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed font-light">
                Ready to transform your smile? Contact our expert team today for a personalized consultation.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 group-hover:bg-white/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-light text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-xl font-light mb-4 text-white/90">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-300 font-light">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  World-class dental technology
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  Expert international team
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                  Personalized treatment plans
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-light mb-2 text-white/90">Send us a Message</h3>
              <p className="text-gray-300 font-light">We'll get back to you within 24 hours.</p>
            </div>

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
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white h-12 rounded-lg focus:ring-0 focus:border-white/30 transition-all duration-300">
                        <SelectValue placeholder="Country">
                          {selectedCountry && (
                            <div className="flex items-center gap-2">
                              <img 
                                src={countries.find(c => c.code === selectedCountry)?.flag} 
                                alt={countries.find(c => c.code === selectedCountry)?.name}
                                className="w-5 h-4 rounded-sm object-cover"
                              />
                              <span>{countries.find(c => c.code === selectedCountry)?.name}</span>
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900/95 backdrop-blur-md border-white/20">
                        {countries.map((country) => (
                          <SelectItem key={country.code} value={country.code} className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-3">
                              <img 
                                src={country.flag} 
                                alt={country.name}
                                className="w-5 h-4 rounded-sm object-cover"
                              />
                              <span>{country.name}</span>
                              {country.dialCode && (
                                <span className="text-gray-500">({country.dialCode})</span>
                              )}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

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
        </div>
      </div>
    </section>
  )
} 