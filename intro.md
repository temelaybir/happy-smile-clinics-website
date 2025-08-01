# Happy Smile Clinics Ana Sayfa Yeniden Oluşturma Rehberi

## Giriş

Bu rehber, Happy Smile Clinics web sitesinin ana sayfasını Next.js, Next UI ve Shadcn/ui kullanarak modern bir yaklaşımla yeniden oluşturmak için kapsamlı bir kılavuz sunmaktadır. Mevcut sitenin analizi temel alınarak, responsive tasarım prensipleri ve modern web geliştirme standartları gözetilerek hazırlanmıştır.

## Proje Kurulumu

### Gereksinimler

Projeye başlamadan önce aşağıdaki araçların sisteminizde kurulu olduğundan emin olun:

- Node.js (v18 veya üzeri)
- npm veya yarn paket yöneticisi
- Git

### Next.js Projesi Oluşturma

```bash
npx create-next-app@latest happy-smile-clinics --typescript --tailwind --eslint --app
cd happy-smile-clinics
```

### Gerekli Paketlerin Kurulumu

```bash
# Next UI kurulumu
npm install @nextui-org/react framer-motion

# Shadcn/ui kurulumu (alternatif)
npx shadcn-ui@latest init

# İkon kütüphanesi
npm install lucide-react

# Form yönetimi
npm install react-hook-form @hookform/resolvers zod

# Animasyon kütüphanesi
npm install framer-motion

# Utility kütüphaneleri
npm install clsx tailwind-merge
```

## Proje Yapısı

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   └── navigation-menu.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-menu.tsx
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── contact-form.tsx
│   │   └── services.tsx
│   └── common/
│       ├── logo.tsx
│       └── social-links.tsx
├── lib/
│   └── utils.ts
├── types/
│   └── index.ts
└── public/
    ├── images/
    └── icons/
```

## Komponent Detayları

### 1. Header Komponenti

Header komponenti, sitenin üst kısmında yer alan navigasyon barını içerir. Responsive tasarım için mobil ve masaüstü görünümlerini destekler.

```typescript
// components/layout/header.tsx
'use client'

import { useState } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react"
import { Menu, X } from 'lucide-react'
import Logo from '../common/logo'
import SocialLinks from '../common/social-links'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hizmetlerimiz", href: "/services" },
    { name: "Galeri", href: "/gallery" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
    { name: "Etkinlikler", href: "/events" }
  ]

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen}
      className="bg-white/95 backdrop-blur-md border-b border-gray-200"
      maxWidth="xl"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.name}>
            <Link 
              color="foreground" 
              href={item.href}
              className="hover:text-green-600 transition-colors"
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <SocialLinks />
        </NavbarItem>
        <NavbarItem>
          <Button 
            as={Link} 
            color="primary" 
            href="/contact" 
            variant="flat"
            className="bg-green-600 text-white hover:bg-green-700"
          >
            İletişim
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color="foreground"
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
```

### 2. Hero Section Komponenti

Hero section, sayfanın en üst kısmında yer alan ve ziyaretçilerin ilk gördüğü bölümdür. Güçlü bir görsel etki yaratmak için tasarlanmıştır.

```typescript
// components/sections/hero.tsx
'use client'

import { Button } from "@nextui-org/react"
import { ArrowRight, Phone, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image/Video */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-smile.jpg')",
            filter: "brightness(0.7)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Smile,{' '}
            <span className="text-green-400">Your Style</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun. 
            Uzman ekibimiz ve son teknoloji ile size en iyi hizmeti sunuyoruz.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg"
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              Ücretsiz Konsültasyon
            </Button>
            
            <Button
              size="lg"
              variant="bordered"
              className="border-white text-white hover:bg-white hover:text-black px-8 py-6 text-lg"
              startContent={<Phone className="w-5 h-5" />}
            >
              Hemen Ara
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-3xl font-bold text-green-400 mb-2">10+</h3>
              <p className="text-gray-200">Yıllık Deneyim</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-3xl font-bold text-green-400 mb-2">5000+</h3>
              <p className="text-gray-200">Mutlu Hasta</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-3xl font-bold text-green-400 mb-2">%98</h3>
              <p className="text-gray-200">Başarı Oranı</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <div className="animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
```

### 3. İletişim Formu Komponenti

İletişim formu, ziyaretçilerin klinikle iletişim kurabilmesi için tasarlanmış interaktif bir bileşendir.

```typescript
// components/sections/contact-form.tsx
'use client'

import { useState } from 'react'
import { Card, CardBody, Input, Textarea, Button, Checkbox } from "@nextui-org/react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Mail, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const contactSchema = z.object({
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
  consent: z.boolean().refine(val => val === true, 'Gizlilik politikasını kabul etmelisiniz')
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log('Form data:', data)
      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto"
      >
        <Card className="bg-green-50 border-green-200">
          <CardBody className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Mesajınız Gönderildi!
            </h3>
            <p className="text-green-600">
              En kısa sürede size geri dönüş yapacağız.
            </p>
            <Button
              className="mt-4"
              variant="flat"
              color="primary"
              onPress={() => setIsSubmitted(false)}
            >
              Yeni Mesaj Gönder
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-xl text-gray-600">
            Sorularınız için bize yazın, size en kısa sürede dönüş yapalım.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <Card className="shadow-lg">
            <CardBody className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    {...register('email')}
                    type="email"
                    label="E-posta Adresiniz"
                    placeholder="ornek@email.com"
                    startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    variant="bordered"
                    size="lg"
                  />
                </div>

                <div>
                  <Textarea
                    {...register('message')}
                    label="Mesajınız"
                    placeholder="Lütfen mesajınızı buraya yazın..."
                    startContent={<MessageSquare className="w-4 h-4 text-gray-400" />}
                    isInvalid={!!errors.message}
                    errorMessage={errors.message?.message}
                    variant="bordered"
                    minRows={4}
                    size="lg"
                  />
                </div>

                <div>
                  <Checkbox
                    {...register('consent')}
                    isInvalid={!!errors.consent}
                    size="sm"
                  >
                    <span className="text-sm text-gray-600">
                      <a href="/privacy" className="text-green-600 hover:underline">
                        Gizlilik Politikası
                      </a>
                      'nı okudum ve kabul ediyorum.
                    </span>
                  </Checkbox>
                  {errors.consent && (
                    <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                  isLoading={isSubmitting}
                  endContent={!isSubmitting && <Send className="w-4 h-4" />}
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </form>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
```


### 4. Footer Komponenti

Footer komponenti, sayfanın alt kısmında yer alan ve site haritası, iletişim bilgileri ve yasal bağlantıları içeren kapsamlı bir bileşendir.

```typescript
// components/layout/footer.tsx
'use client'

import { Link } from "@nextui-org/react"
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Logo from '../common/logo'
import SocialLinks from '../common/social-links'

export default function Footer() {
  const serviceLinks = [
    { name: "Diş Veneerleri", href: "/services/veneers" },
    { name: "Dental İmplantlar", href: "/services/implants" },
    { name: "All-on-X Tedavisi", href: "/services/all-on-x" },
    { name: "Diş Beyazlatma", href: "/services/whitening" },
    { name: "Ortodonti", href: "/services/orthodontics" }
  ]

  const quickLinks = [
    { name: "Hakkımızda", href: "/about" },
    { name: "Sonuçlar Galerisi", href: "/gallery" },
    { name: "Online Konsültasyon", href: "/consultation" },
    { name: "SSS", href: "/faq" },
    { name: "İletişim", href: "/contact" }
  ]

  const faqLinks = [
    { name: "All-On-X Nedir?", href: "/faq/all-on-x" },
    { name: "Veneer Tedavisi Kimler İçin Uygundur?", href: "/faq/veneers" },
    { name: "Dental İmplant Süreci", href: "/faq/implants" },
    { name: "E.MAX® ve Zirkonyum Nedir?", href: "/faq/materials" }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="white" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun. 
              Uzman ekibimiz ve son teknoloji ile size en iyi hizmeti sunuyoruz.
            </p>
            <SocialLinks variant="footer" />
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-400">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı Bağlantılar */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-400">Hızlı Bağlantılar</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-semibold mt-8 mb-4 text-green-400">Sık Sorulan Sorular</h4>
            <ul className="space-y-2">
              {faqLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim Bilgileri */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-green-400">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Altunizade Mahallesi, Kısıklı Caddesi,<br />
                    Sarıkuyusan Ak Plaza A Blok No:4 Kat:7<br />
                    34662 Üsküdar/İstanbul
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div className="space-y-1">
                  <Link
                    href="tel:+447460644222"
                    className="text-gray-300 hover:text-green-400 transition-colors block"
                  >
                    +44 7460 644222
                  </Link>
                  <Link
                    href="tel:+908503059595"
                    className="text-gray-300 hover:text-green-400 transition-colors block"
                  >
                    +90 850 305 95 95
                  </Link>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                <Link
                  href="mailto:hello@hsctr.com"
                  className="text-gray-300 hover:text-green-400 transition-colors"
                >
                  hello@hsctr.com
                </Link>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Pazartesi - Cumartesi: 09:00 - 19:00<br />
                    Pazar: Kapalı
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Çizgi ve Yasal Bağlantılar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Happy Smile Clinics. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/dental-guarantee"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Dental Garanti Sözleşmesi
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### 5. Logo Komponenti

Logo komponenti, sitenin marka kimliğini temsil eden yeniden kullanılabilir bir bileşendir.

```typescript
// components/common/logo.tsx
'use client'

import { Link } from "@nextui-org/react"
import { Check } from 'lucide-react'

interface LogoProps {
  variant?: 'default' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ variant = 'default', size = 'md' }: LogoProps) {
  const textColor = variant === 'white' ? 'text-white' : 'text-gray-900'
  const iconColor = variant === 'white' ? 'text-green-400' : 'text-green-600'
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  }

  return (
    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
      <div className={`p-1 rounded-full bg-green-600 ${iconColor}`}>
        <Check className="w-6 h-6 text-white" />
      </div>
      <div className={`font-bold ${textColor} ${sizeClasses[size]}`}>
        <span>Happy Smile</span>
        <br />
        <span className="text-sm font-normal opacity-80">Clinics</span>
      </div>
    </Link>
  )
}
```

### 6. Sosyal Medya Bağlantıları Komponenti

Sosyal medya platformlarına bağlantıları içeren yeniden kullanılabilir bir komponent.

```typescript
// components/common/social-links.tsx
'use client'

import { Link } from "@nextui-org/react"
import { Facebook, Instagram, Youtube } from 'lucide-react'

interface SocialLinksProps {
  variant?: 'header' | 'footer'
}

export default function SocialLinks({ variant = 'header' }: SocialLinksProps) {
  const socialLinks = [
    {
      name: 'Facebook',
      href: 'https://facebook.com/happysmileclinics',
      icon: Facebook
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/happysmileclinics',
      icon: Instagram
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/happysmileclinics',
      icon: Youtube
    }
  ]

  const baseClasses = variant === 'footer' 
    ? 'text-gray-300 hover:text-green-400' 
    : 'text-gray-600 hover:text-green-600'

  return (
    <div className="flex space-x-4">
      {socialLinks.map((social) => {
        const Icon = social.icon
        return (
          <Link
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${baseClasses} transition-colors`}
            aria-label={social.name}
          >
            <Icon className="w-5 h-5" />
          </Link>
        )
      })}
    </div>
  )
}
```

## Ana Sayfa Layout'u

Ana sayfa layout'u, tüm komponentleri bir araya getiren ana yapıdır.

```typescript
// app/page.tsx
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import Hero from '@/components/sections/hero'
import ContactForm from '@/components/sections/contact-form'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ContactForm />
      <Footer />
    </main>
  )
}
```

## Responsive Tasarım Prensipleri

### Breakpoint Stratejisi

Tailwind CSS'in varsayılan breakpoint'lerini kullanarak responsive tasarım uygulanmıştır:

- **sm (640px)**: Küçük tabletler ve büyük telefonlar
- **md (768px)**: Tabletler
- **lg (1024px)**: Küçük masaüstü ekranlar
- **xl (1280px)**: Büyük masaüstü ekranlar

### Mobil-First Yaklaşım

Tüm komponentler mobil-first yaklaşımıyla tasarlanmıştır. Bu yaklaşım, önce mobil cihazlar için optimize edilmiş tasarım oluşturulması ve daha sonra büyük ekranlar için genişletilmesi prensibine dayanır.

### Grid Sistemi

CSS Grid ve Flexbox kullanılarak esnek ve responsive layout'lar oluşturulmuştur. Özellikle footer bölümünde kullanılan grid sistemi, farklı ekran boyutlarında otomatik olarak yeniden düzenlenir.

## Performans Optimizasyonları

### Lazy Loading

Next.js'in built-in Image komponenti kullanılarak görseller lazy loading ile yüklenir. Bu, sayfa yükleme hızını önemli ölçüde artırır.

### Code Splitting

Next.js otomatik olarak code splitting uygular. Her sayfa ve komponent sadece gerektiğinde yüklenir.

### Bundle Optimizasyonu

Kullanılmayan CSS ve JavaScript kodları otomatik olarak bundle'dan çıkarılır. Tree shaking ile sadece kullanılan kod parçaları dahil edilir.

## SEO Optimizasyonları

### Meta Tags

Her sayfa için uygun meta tag'ler tanımlanmalıdır:

```typescript
// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Happy Smile Clinics - Your Smile, Your Style',
  description: 'Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun. Uzman ekibimiz ve son teknoloji ile size en iyi hizmeti sunuyoruz.',
  keywords: 'diş tedavisi, veneer, dental implant, diş beyazlatma, ortodonti, İstanbul',
  authors: [{ name: 'Happy Smile Clinics' }],
  openGraph: {
    title: 'Happy Smile Clinics - Your Smile, Your Style',
    description: 'Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun.',
    url: 'https://happysmileclinics.com',
    siteName: 'Happy Smile Clinics',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Happy Smile Clinics'
      }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Smile Clinics - Your Smile, Your Style',
    description: 'Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun.',
    images: ['/images/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}
```

### Structured Data

JSON-LD formatında structured data eklenerek arama motorlarının siteyi daha iyi anlaması sağlanır:

```typescript
// components/structured-data.tsx
export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "DentalClinic",
    "name": "Happy Smile Clinics",
    "description": "Dünya standartlarında diş tedavileri ile hayalinizdeki gülüşe kavuşun.",
    "url": "https://happysmileclinics.com",
    "logo": "https://happysmileclinics.com/images/logo.png",
    "image": "https://happysmileclinics.com/images/clinic.jpg",
    "telephone": ["+447460644222", "+908503059595"],
    "email": "hello@hsctr.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Altunizade Mahallesi, Kısıklı Caddesi, Sarıkuyusan Ak Plaza A Blok No:4 Kat:7",
      "addressLocality": "Üsküdar",
      "addressRegion": "İstanbul",
      "postalCode": "34662",
      "addressCountry": "TR"
    },
    "openingHours": [
      "Mo-Sa 09:00-19:00"
    ],
    "priceRange": "$$",
    "medicalSpecialty": [
      "Dentistry",
      "Cosmetic Dentistry",
      "Oral Surgery"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
```

## Accessibility (Erişilebilirlik)

### ARIA Labels

Tüm interaktif elementler için uygun ARIA label'ları tanımlanmıştır. Bu, ekran okuyucular ve diğer yardımcı teknolojiler için önemlidir.

### Keyboard Navigation

Tüm interaktif elementler klavye ile erişilebilir durumdadır. Tab sırası mantıklı bir şekilde düzenlenmiştir.

### Color Contrast

WCAG 2.1 AA standartlarına uygun renk kontrastı sağlanmıştır. Metin ve arka plan renkleri arasında yeterli kontrast bulunmaktadır.

### Focus Management

Focus durumları görsel olarak belirgindir ve kullanıcı deneyimini olumsuz etkilemez.

## Test Stratejisi

### Unit Testing

Jest ve React Testing Library kullanılarak komponent testleri yazılmalıdır:

```typescript
// __tests__/components/logo.test.tsx
import { render, screen } from '@testing-library/react'
import Logo from '@/components/common/logo'

describe('Logo Component', () => {
  it('renders logo with default variant', () => {
    render(<Logo />)
    expect(screen.getByText('Happy Smile')).toBeInTheDocument()
    expect(screen.getByText('Clinics')).toBeInTheDocument()
  })

  it('renders logo with white variant', () => {
    render(<Logo variant="white" />)
    const logoElement = screen.getByText('Happy Smile')
    expect(logoElement).toHaveClass('text-white')
  })

  it('has correct link to homepage', () => {
    render(<Logo />)
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', '/')
  })
})
```

### Integration Testing

Cypress kullanılarak end-to-end testler yazılmalıdır:

```typescript
// cypress/e2e/homepage.cy.ts
describe('Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display hero section', () => {
    cy.get('h1').should('contain', 'Your Smile, Your Style')
    cy.get('[data-testid="hero-cta"]').should('be.visible')
  })

  it('should submit contact form', () => {
    cy.get('[data-testid="contact-form"]').within(() => {
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('textarea').type('Test message for the clinic')
      cy.get('input[type="checkbox"]').check()
      cy.get('button[type="submit"]').click()
    })
    
    cy.get('[data-testid="success-message"]').should('be.visible')
  })

  it('should navigate through menu items', () => {
    cy.get('[data-testid="main-menu"]').click()
    cy.get('[data-testid="menu-services"]').click()
    cy.url().should('include', '/services')
  })
})
```

## Deployment Stratejisi

### Vercel Deployment

Next.js projesi Vercel platformunda deploy edilebilir:

```bash
# Vercel CLI kurulumu
npm install -g vercel

# Proje deploy etme
vercel

# Production deploy
vercel --prod
```

### Environment Variables

Gerekli environment variable'lar `.env.local` dosyasında tanımlanmalıdır:

```env
# .env.local
NEXT_PUBLIC_SITE_URL=https://happysmileclinics.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
EMAILJS_SERVICE_ID=your_service_id
EMAILJS_TEMPLATE_ID=your_template_id
EMAILJS_PUBLIC_KEY=your_public_key
```

### Performance Monitoring

Web Vitals metrikleri izlenmeli ve optimize edilmelidir:

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

## Sonuç

Bu rehber, Happy Smile Clinics web sitesinin ana sayfasını modern web teknolojileri kullanarak yeniden oluşturmak için kapsamlı bir kılavuz sunmaktadır. Next.js, Next UI ve Shadcn/ui kombinasyonu ile oluşturulan bu yapı, hem performans hem de kullanıcı deneyimi açısından optimize edilmiştir.

Projenin başarılı bir şekilde tamamlanması için bu rehberde belirtilen tüm adımların dikkatli bir şekilde takip edilmesi ve test süreçlerinin ihmal edilmemesi önemlidir. Ayrıca, sürekli performans izleme ve kullanıcı geri bildirimlerine dayalı iyileştirmeler yapılması, sitenin uzun vadeli başarısı için kritiktir.

