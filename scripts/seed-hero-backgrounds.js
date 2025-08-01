const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function seedHeroBackgrounds() {
  try {
    // Mevcut hero background'ları temizle
    await prisma.heroBackground.deleteMany()
    
    // Yeni hero background'ları ekle - SADECE SLIDE ANIMASYON
    const backgrounds = [
      {
        imageUrl: '/images/hero/dental-patients-hero.webp',
        title: 'Dental Patients Hero',
        order: 1,
        isActive: true,
        animationType: 'slide', // SADECE SLIDE
        transparency: 0.4
      },
      {
        imageUrl: '/images/carousel/carousel-1.webp',
        title: 'Dental Clinic Interior',
        order: 2,
        isActive: true,
        animationType: 'slide', // SADECE SLIDE
        transparency: 0.5
      },
      {
        imageUrl: '/images/carousel/carousel-2.webp',
        title: 'Modern Dental Equipment',
        order: 3,
        isActive: true,
        animationType: 'slide', // FADE → SLIDE DEĞİŞTİRİLDİ
        transparency: 0.6
      }
      // carousel-4.jpg kaldırıldı - istenmeyen fade animasyon
    ]
    
    for (const background of backgrounds) {
      await prisma.heroBackground.create({
        data: background
      })
    }
    
    console.log('✅ Hero backgrounds seeded successfully!')
    console.log('\n📋 Added backgrounds (SLIDE ONLY):')
    backgrounds.forEach(bg => {
      console.log(`- ${bg.title} (${bg.imageUrl}) - Order: ${bg.order} - Animation: ${bg.animationType} - Transparency: ${Math.round(bg.transparency * 100)}% - Active: ${bg.isActive}`)
    })
    
  } catch (error) {
    console.error('❌ Error seeding hero backgrounds:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seedHeroBackgrounds() 