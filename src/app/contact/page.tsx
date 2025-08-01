'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Calendar, 
  Award,
  CheckCircle,
  Globe,
  Users
} from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Phone Numbers",
    details: ["+90 850 305 95 95", "+44 7460 644222"],
    description: "Available 24/7 for consultations"
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Address",
    details: ["hello@hsctr.com"],
    description: "We respond within 2 hours"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Clinic Address",
    details: ["Altunizade Mahallesi, Kısıklı Caddesi", "Şarkuysan AK Plaza A Blok No:4 Kat:3", "34662 Üsküdar/Istanbul, Turkey"],
    description: "Modern clinic in the heart of Istanbul"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Working Hours",
    details: ["Monday - Friday: 09:00 - 18:00", "Saturday: 09:00 - 16:00", "Sunday: By appointment"],
    description: "Extended hours for international patients"
  }
]

const services = [
  "Dental Implants",
  "All-on-4 Treatment",
  "Porcelain Veneers",
  "Smile Design",
  "Zirconia Crowns",
  "Teeth Whitening",
  "Orthodontics",
  "General Consultation"
]

const whyChooseUs = [
  {
    icon: <Award className="w-8 h-8 text-blue-500" />,
    title: "15+ Years Experience",
    description: "Trusted by thousands of international patients"
  },
  {
    icon: <Users className="w-8 h-8 text-green-500" />,
    title: "Expert Team",
    description: "Specialized dentists and master ceramists"
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-500" />,
    title: "International Standards",
    description: "Latest technology and premium materials"
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-orange-500" />,
    title: "Guaranteed Results",
    description: "Lifetime warranty on our treatments"
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    service: '',
    message: '',
    preferredDate: '',
    consultationType: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert('Thank you! We will contact you within 24 hours.')
    }, 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-sm font-medium text-blue-200 tracking-[0.3em] uppercase">
                Get In Touch
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="uppercase tracking-wider mb-6 text-white"
              style={{ 
                fontFamily: '"Poiret One", sans-serif', 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                fontWeight: '700',
                lineHeight: '1.1'
              }}
            >
              CONTACT US
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-blue-100 leading-relaxed mb-8 text-xl max-w-3xl mx-auto"
              style={{ 
                fontFamily: '"Red Hat Text", sans-serif', 
                fontWeight: '300'
              }}
            >
              Ready to transform your smile? Our expert team is here to guide you through your dental journey. Contact us today for a free consultation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="uppercase tracking-wider mb-6"
                style={{ 
                  fontFamily: '"Poiret One", sans-serif', 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}
              >
                Get In Touch
              </h2>
              <p 
                className="text-gray-600 text-lg max-w-3xl mx-auto"
                style={{ 
                  fontFamily: '"Red Hat Text", sans-serif', 
                  fontWeight: '300',
                  lineHeight: '1.8'
                }}
              >
                Multiple ways to reach us. Choose the most convenient option for you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <div className="text-blue-600">
                          {info.icon}
                        </div>
                      </div>
                      
                      <h3 
                        className="text-xl font-semibold mb-4 text-gray-900"
                        style={{ fontFamily: '"Poiret One", sans-serif' }}
                      >
                        {info.title}
                      </h3>
                      
                      <div className="space-y-2 mb-4">
                        {info.details.map((detail, detailIndex) => (
                          <p 
                            key={detailIndex}
                            className="text-gray-700 font-medium"
                            style={{ 
                              fontFamily: '"Red Hat Text", sans-serif', 
                              fontWeight: '400'
                            }}
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                      
                      <p 
                        className="text-gray-500 text-sm"
                        style={{ 
                          fontFamily: '"Red Hat Text", sans-serif', 
                          fontWeight: '300'
                        }}
                      >
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="uppercase tracking-wider mb-8"
                style={{ 
                  fontFamily: '"Poiret One", sans-serif', 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}
              >
                Schedule Your Consultation
              </h2>
              <p 
                className="text-gray-600 text-lg max-w-2xl mx-auto"
                style={{ 
                  fontFamily: '"Red Hat Text", sans-serif', 
                  fontWeight: '300',
                  lineHeight: '1.8'
                }}
              >
                Fill out the form below and our team will contact you within 24 hours to schedule your free consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border-0 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700 font-medium">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-2"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-gray-700 font-medium">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="phone" className="text-gray-700 font-medium">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className="mt-2"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="country" className="text-gray-700 font-medium">Country</Label>
                        <Input
                          id="country"
                          type="text"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          placeholder="Enter your country"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="service" className="text-gray-700 font-medium">Service of Interest *</Label>
                        <Select onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="consultationType" className="text-gray-700 font-medium">Consultation Type</Label>
                        <Select onValueChange={(value) => handleInputChange('consultationType', value)}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select consultation type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In-Person Consultation</SelectItem>
                            <SelectItem value="virtual">Virtual Consultation</SelectItem>
                            <SelectItem value="phone">Phone Consultation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="preferredDate" className="text-gray-700 font-medium">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-gray-700 font-medium">Additional Information</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us about your dental concerns, questions, or any specific requirements..."
                        className="mt-2 min-h-[120px]"
                      />
                    </div>

                    <div className="text-center pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 text-lg font-medium"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>
                      <p className="text-sm text-gray-500 mt-4">
                        We respect your privacy and will never share your information with third parties.
                      </p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 
                className="uppercase tracking-wider mb-6"
                style={{ 
                  fontFamily: '"Poiret One", sans-serif', 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}
              >
                Why Choose Happy Smile Clinics?
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyChooseUs.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    {reason.icon}
                  </div>
                  
                  <h3 
                    className="text-xl font-semibold mb-3 text-gray-900"
                    style={{ fontFamily: '"Poiret One", sans-serif' }}
                  >
                    {reason.title}
                  </h3>
                  
                  <p 
                    className="text-gray-600 leading-relaxed"
                    style={{ 
                      fontFamily: '"Red Hat Text", sans-serif', 
                      fontWeight: '300'
                    }}
                  >
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2
                className="uppercase tracking-wider mb-8"
                style={{ 
                  fontFamily: '"Poiret One", sans-serif', 
                  fontSize: '2.5rem', 
                  fontWeight: '700',
                  color: '#1f2937'
                }}
              >
                Visit Our Clinic
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">Interactive Map</p>
                  <p className="text-gray-500 text-sm">
                    Altunizade Mahallesi, Kısıklı Caddesi<br />
                    Şarkuysan AK Plaza A Blok No:4 Kat:3<br />
                    34662 Üsküdar/Istanbul, Turkey
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Emergency Contact */}
        <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="uppercase tracking-wider mb-6"
              style={{ 
                fontFamily: '"Poiret One", sans-serif', 
                fontSize: '2.5rem', 
                fontWeight: '700' 
              }}
            >
              Emergency Contact
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 text-red-100"
              style={{ 
                fontFamily: '"Red Hat Text", sans-serif', 
                fontWeight: '300'
              }}
            >
              Experiencing a dental emergency? Our team is available 24/7 for urgent dental care.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Line
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg font-medium"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Emergency
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 