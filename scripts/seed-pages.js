const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const pages = [
  {
    slug: 'dental-implants',
    title: 'Dental Implants',
    description: 'Premium dental implant treatments in Turkey',
    isPublished: true,
    seoTitle: 'Dental Implants in Turkey | Happy Smile Clinics',
    seoDesc: 'Get premium dental implants at affordable prices in Turkey.',
    seoKeywords: 'dental implants, turkey, dental clinic',
    updatedBy: 'system',
    sections: [
      {
        type: 'hero',
        title: 'Transform Your Smile with Dental Implants',
        content: '<p>Experience world-class dental care with our expert team in Turkey. Our state-of-the-art facilities and experienced surgeons ensure the best possible results for your dental implant treatment.</p>',
        order: 1
      },
      {
        type: 'text',
        title: 'Why Choose Our Clinic?',
        content: '<p>We offer state-of-the-art facilities, experienced surgeons, and comprehensive care packages. Our clinic has been serving international patients for over 15 years with a 98% success rate.</p><p>Our team of specialists uses the latest technology and techniques to ensure comfortable, efficient, and long-lasting results.</p>',
        order: 2
      },
      {
        type: 'image-text',
        title: 'Advanced Technology',
        content: '<p>We use cutting-edge 3D imaging and computer-guided implant placement for precision and optimal results. Our digital workflow ensures perfect fit and natural aesthetics.</p>',
        image: '/images/dental-technology.jpg',
        order: 3
      },
      {
        type: 'features',
        title: 'Our Advantages',
        content: '<ul><li>98% Success Rate</li><li>Lifetime Warranty</li><li>Same Day Procedures</li><li>Expert Team</li></ul>',
        order: 4
      }
    ]
  },
  {
    slug: 'about',
    title: 'About Us',
    description: 'Learn more about Happy Smile Clinics',
    isPublished: true,
    seoTitle: 'About Us | Happy Smile Clinics',
    seoDesc: 'Learn about our experienced team and modern facilities.',
    seoKeywords: 'about, dental clinic, turkey',
    updatedBy: 'system',
    sections: [
      {
        type: 'hero',
        title: 'About Happy Smile Clinics',
        content: '<p>Leading dental care provider in Turkey since 2010. We have treated over 10,000 international patients with exceptional results.</p>',
        order: 1
      },
      {
        type: 'text',
        title: 'Our Mission',
        content: '<p>To provide world-class dental care at affordable prices, making beautiful smiles accessible to everyone. We combine expertise, technology, and compassion to deliver exceptional patient experiences.</p>',
        order: 2
      },
      {
        type: 'image-text',
        title: 'Our Facility',
        content: '<p>Our modern clinic features 12 treatment rooms, advanced imaging systems, and an in-house dental laboratory for same-day restorations.</p>',
        image: '/images/clinic-interior.jpg',
        order: 3
      }
    ]
  },
  {
    slug: 'services',
    title: 'Our Services',
    description: 'Comprehensive dental treatments and services',
    isPublished: true,
    seoTitle: 'Dental Services | Happy Smile Clinics',
    seoDesc: 'Explore our comprehensive range of dental treatments.',
    seoKeywords: 'dental services, treatments, cosmetic dentistry',
    updatedBy: 'system',
    sections: [
      {
        type: 'hero',
        title: 'Comprehensive Dental Services',
        content: '<p>From preventive care to complex restorations, we offer a full range of dental treatments under one roof.</p>',
        order: 1
      },
      {
        type: 'features',
        title: 'Our Services',
        content: '<ul><li><strong>Dental Implants</strong> - Permanent tooth replacement</li><li><strong>Veneers</strong> - Transform your smile</li><li><strong>Crowns & Bridges</strong> - Restore damaged teeth</li><li><strong>Teeth Whitening</strong> - Brighten your smile</li><li><strong>Orthodontics</strong> - Straighten your teeth</li></ul>',
        order: 2
      }
    ]
  }
]

async function seedPages() {
  console.log('🌱 Seeding pages...')
  
  try {
    // Clear existing pages
    await prisma.pageSection.deleteMany()
    await prisma.page.deleteMany()
    console.log('✅ Cleared existing pages')
    
    // Create pages with sections
    for (const pageData of pages) {
      const { sections, ...pageInfo } = pageData
      
      const page = await prisma.page.create({
        data: {
          ...pageInfo,
          sections: {
            create: sections
          }
        },
        include: {
          sections: true
        }
      })
      
      console.log(`✅ Created page: ${page.title} with ${page.sections.length} sections`)
    }
    
    console.log('🎉 Seeding completed successfully!')
  } catch (error) {
    console.error('❌ Error seeding pages:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedPages()