import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hashPassword('admin123')
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password: adminPassword,
      name: 'Admin User',
      role: 'admin'
    }
  })

  console.log('Created admin user:', admin.email)

  // Add sample reviews
  const reviews = [
    {
      name: 'Sarah',
      country: 'United Kingdom',
      rating: 5,
      text: 'Exceptional service and results! The team at Happy Smile Clinics transformed my smile completely.',
      image: '/images/reviews/sarah.webp',
      verified: true,
      featured: true
    },
    {
      name: 'Matthew',
      country: 'Malta',
      rating: 5,
      text: 'Professional, caring, and world-class facilities. Highly recommend!',
      image: '/images/reviews/matthew.webp',
      verified: true,
      featured: true
    },
    {
      name: 'Justyna',
      country: 'Germany',
      rating: 5,
      text: 'The best dental experience I have ever had. Worth traveling for!',
      image: '/images/reviews/justyna.webp',
      verified: true,
      featured: true
    }
  ]

  for (const review of reviews) {
    await prisma.review.create({ data: review })
  }

  console.log('Created sample reviews')

  // Add sample Instagram videos
  const videos = [
    {
      title: 'Smile Transformation Journey',
      videoUrl: '/videos/sample1.mp4',
      thumbnail: '/images/thumb1.jpg',
      category: 'Transformation',
      treatment: 'Veneers',
      duration: '0:45',
      featured: true
    },
    {
      title: 'Behind the Scenes',
      videoUrl: '/videos/sample2.mp4',
      thumbnail: '/images/thumb2.jpg',
      category: 'Clinic Tour',
      treatment: 'General',
      duration: '1:20',
      featured: true
    }
  ]

  for (const video of videos) {
    await prisma.instagramVideo.create({ data: video })
  }

  console.log('Created sample videos')

  // Add sample Patient Results
  const patientResults = [
    {
      name: 'Sarah M.',
      age: 28,
      location: 'London, UK',
      treatment: 'Porcelain Veneers',
      duration: '3 Days',
      teethCount: '8 Veneers',
      beforeImage: '/images/carousel/carousel-1.webp',
      afterImage: '/images/carousel/carousel-2.webp',
      testimonial: 'Life-changing results beyond my expectations',
      rating: 5,
      featured: true,
      order: 1
    },
    {
      name: 'Michael K.',
      age: 34,
      location: 'Malta',
      treatment: 'All-on-4 Implants',
      duration: '1 Day',
      teethCount: 'Full Arch',
      beforeImage: '/images/carousel/carousel-3.webp',
      afterImage: '/images/carousel/carousel-4.jpg',
      testimonial: 'Perfect function and aesthetics restored',
      rating: 5,
      featured: true,
      order: 2
    },
    {
      name: 'Emma R.',
      age: 31,
      location: 'Germany',
      treatment: 'Digital Smile Design',
      duration: '5 Days',
      teethCount: '12 Veneers',
      beforeImage: '/images/carousel/carousel-5.webp',
      afterImage: '/images/carousel/carousel-6.webp',
      testimonial: 'The smile I always dreamed of having',
      rating: 5,
      featured: true,
      order: 3
    },
    {
      name: 'James L.',
      age: 42,
      location: 'Canada',
      treatment: 'Zirconia Crowns',
      duration: '4 Days',
      teethCount: '6 Crowns',
      beforeImage: '/images/carousel/carousel-7.webp',
      afterImage: '/images/carousel/carousel-1.webp',
      testimonial: 'Exceptional craftsmanship and care',
      rating: 5,
      featured: true,
      order: 4
    }
  ]

  for (const result of patientResults) {
    await prisma.patientResult.create({ data: result })
  }

  console.log('Created sample patient results')

  // Add Hero Video
  await prisma.heroVideo.create({
    data: {
      url: '/videos/hero-video.mp4',
      title: 'Happy Smile Clinic Hero Video',
      description: 'Main hero video for the clinic homepage',
      active: true,
      order: 1
    }
  })

  console.log('Created hero video')

  // Add clinic info
  const clinicInfo = [
    { key: 'phone', value: '+90 850 305 95 95', type: 'text', category: 'contact' },
    { key: 'email', value: 'hello@hsctr.com', type: 'text', category: 'contact' },
    { key: 'address', value: 'Altunizade Mah, Istanbul', type: 'text', category: 'contact' },
    { key: 'countries_served', value: '50', type: 'number', category: 'stats' },
    { key: 'happy_patients', value: '15000', type: 'number', category: 'stats' },
    { key: 'facility_size', value: '12000', type: 'number', category: 'stats' }
  ]

  for (const info of clinicInfo) {
    await prisma.clinicInfo.upsert({
      where: { key: info.key },
      update: { value: info.value },
      create: info
    })
  }

  console.log('Created clinic info')

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })