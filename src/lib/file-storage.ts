import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const PAGES_FILE = path.join(DATA_DIR, 'pages.json')
const SETTINGS_FILE = path.join(DATA_DIR, 'site-settings.json')
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json')

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR)
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true })
  }
}

// Pages storage
export async function loadPages() {
  await ensureDataDir()
  
  try {
    const data = await fs.readFile(PAGES_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    // Return default pages if file doesn't exist
    const defaultPages = {
      '1': {
        id: '1',
        slug: 'dental-implants',
        title: 'Dental Implants',
        description: 'Premium dental implant treatments in Turkey',
        sections: [
          {
            id: 's1',
            type: 'hero',
            title: 'Transform Your Smile with Dental Implants',
            content: '<p class="text-lg text-gray-300 mb-4">Restore your confidence with premium dental implants that look, feel, and function like natural teeth.</p><p class="text-sm text-gray-400">Experience world-class dental care in our state-of-the-art facility, where cutting-edge technology meets exceptional expertise.</p>',
            image: '/images/hero/dental-patients-hero.webp',
            order: 1
          },
          {
            id: 's2',
            type: 'image-text',
            title: 'Natural Looking Results',
            content: '<p>Our dental implants are designed to seamlessly blend with your natural teeth, providing a beautiful and functional solution that lasts a lifetime.</p><p>Using advanced 3D imaging and precision placement techniques, we ensure perfect alignment and optimal aesthetics for every patient.</p>',
            image: '/images/services/implants.webp',
            order: 2
          },
          {
            id: 's3',
            type: 'image-text',
            title: 'All-on-4 Technology',
            content: '<p>Revolutionary full-arch rehabilitation using just four strategically placed implants. This innovative approach provides immediate function and aesthetics.</p><p>Get your new smile in just one day with our advanced All-on-4 treatment protocol.</p>',
            image: '/images/services/smile-design.webp',
            order: 3
          },
          {
            id: 's4',
            type: 'text',
            title: 'Why Choose Our Implants',
            content: '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 transform-gpu"><div class="text-center"><h4 class="text-2xl font-semibold mb-4">98% Success Rate</h4><p class="text-lg">Our proven techniques and experienced team ensure exceptional outcomes.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Lifetime Warranty</h4><p class="text-lg">We stand behind our work with comprehensive warranty coverage.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Same Day Results</h4><p class="text-lg">Walk out with a beautiful new smile in just one appointment.</p></div></div>',
            order: 4
          }
        ],
        seo: {
          title: 'Dental Implants in Turkey | Happy Smile Clinics',
          description: 'Get premium dental implants at affordable prices in Turkey. Natural-looking, permanent solution with 98% success rate.',
          keywords: 'dental implants, turkey, dental clinic, all-on-four, teeth replacement'
        },
        isPublished: true,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      },
      '2': {
        id: '2',
        slug: 'about-us',
        title: 'About Us',
        description: 'Learn about Happy Smile Clinics',
        sections: [
          {
            id: 'about-s1',
            type: 'hero',
            title: 'About Happy Smile Clinics',
            content: '<p class="text-lg text-gray-300 mb-4">Pioneering dental excellence in Turkey with over 15 years of experience and thousands of satisfied patients worldwide.</p><p class="text-sm text-gray-400">Your journey to a perfect smile begins with trust, expertise, and cutting-edge technology.</p>',
            image: '/images/hero/dental-patients-hero.webp',
            order: 1
          },
          {
            id: 'about-s2',
            type: 'image-text',
            title: 'Our Mission',
            content: '<p>We are dedicated to providing world-class dental care that combines advanced technology with personalized attention.</p><p>Our mission is to make premium dental treatments accessible to everyone, delivering exceptional results that transform lives.</p>',
            image: '/images/services/implants.webp',
            order: 2
          },
          {
            id: 'about-s3',
            type: 'image-text',
            title: 'State-of-the-Art Facility',
            content: '<p>Our modern clinic features the latest dental technology, including 3D imaging, CAD/CAM systems, and digital smile design.</p><p>Experience comfort and precision in every treatment with our advanced equipment and sterile environment.</p>',
            image: '/images/services/smile-design.webp',
            order: 3
          },
          {
            id: 'about-s4',
            type: 'text',
            title: 'Why Choose Us',
            content: '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 transform-gpu"><div class="text-center"><h4 class="text-2xl font-semibold mb-4">15+ Years Experience</h4><p class="text-lg">Trusted by thousands of international patients.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Expert Team</h4><p class="text-lg">Board-certified specialists in every field of dentistry.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">5-Star Service</h4><p class="text-lg">From consultation to aftercare, we ensure excellence.</p></div></div>',
            order: 4
          }
        ],
        seo: {
          title: 'About Us | Happy Smile Clinics Turkey',
          description: 'Learn about Happy Smile Clinics - Leading dental care provider in Turkey with 15+ years of excellence.',
          keywords: 'about us, dental clinic turkey, happy smile clinics, dental tourism'
        },
        isPublished: true,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      },
      '3': {
        id: '3',
        slug: 'all-on-four',
        title: 'All-on-4',
        description: 'Revolutionary full-arch dental restoration',
        sections: [
          {
            id: 'all4-s1',
            type: 'hero',
            title: 'All-on-4 Dental Implants',
            content: '<p class="text-lg text-gray-300 mb-4">Transform your smile in just one day with the revolutionary All-on-4 dental implant technique.</p><p class="text-sm text-gray-400">Full-arch restoration using only four strategically placed implants for immediate results.</p>',
            image: '/images/hero/dental-patients-hero.webp',
            order: 1
          },
          {
            id: 'all4-s2',
            type: 'image-text',
            title: 'Same Day New Teeth',
            content: '<p>Walk in with missing teeth, walk out with a beautiful new smile - all in a single appointment.</p><p>Our All-on-4 protocol provides immediate function and aesthetics, allowing you to eat and smile confidently from day one.</p>',
            image: '/images/services/implants.webp',
            order: 2
          },
          {
            id: 'all4-s3',
            type: 'image-text',
            title: 'Advanced Technology',
            content: '<p>Using 3D planning and guided surgery, we ensure precise implant placement for optimal results.</p><p>Our digital workflow guarantees perfect fit and natural appearance for your new teeth.</p>',
            image: '/images/services/smile-design.webp',
            order: 3
          },
          {
            id: 'all4-s4',
            type: 'text',
            title: 'All-on-4 Benefits',
            content: '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 transform-gpu"><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Immediate Results</h4><p class="text-lg">New teeth in just one day with immediate function.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">No Bone Grafts</h4><p class="text-lg">Avoid lengthy bone grafting procedures.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Cost Effective</h4><p class="text-lg">Full arch restoration with just 4 implants.</p></div></div>',
            order: 4
          }
        ],
        seo: {
          title: 'All-on-4 Dental Implants Turkey | Happy Smile Clinics',
          description: 'Get new teeth in one day with All-on-4 dental implants in Turkey. Immediate results, no bone grafts needed.',
          keywords: 'all-on-4, all on four, dental implants, full arch restoration, turkey'
        },
        isPublished: true,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      },
      '4': {
        id: '4',
        slug: 'veneers',
        title: 'Veneers',
        description: 'Premium porcelain veneers for a perfect smile',
        sections: [
          {
            id: 'veneer-s1',
            type: 'hero',
            title: 'Porcelain Veneers',
            content: '<p class="text-lg text-gray-300 mb-4">Achieve the Hollywood smile you\'ve always dreamed of with our ultra-thin porcelain veneers.</p><p class="text-sm text-gray-400">Transform your smile in just 2-3 visits with minimal tooth preparation.</p>',
            image: '/images/hero/dental-patients-hero.webp',
            order: 1
          },
          {
            id: 'veneer-s2',
            type: 'image-text',
            title: 'Natural Beauty',
            content: '<p>Our porcelain veneers are custom-crafted to match your facial features and personality.</p><p>Ultra-thin yet durable, they provide a natural translucency that mimics real tooth enamel perfectly.</p>',
            image: '/images/services/implants.webp',
            order: 2
          },
          {
            id: 'veneer-s3',
            type: 'image-text',
            title: 'Digital Smile Design',
            content: '<p>Preview your new smile before treatment begins with our advanced digital design technology.</p><p>We work together to create the perfect shape, size, and shade for your dream smile.</p>',
            image: '/images/services/smile-design.webp',
            order: 3
          },
          {
            id: 'veneer-s4',
            type: 'text',
            title: 'Veneer Advantages',
            content: '<div class="grid grid-cols-1 md:grid-cols-3 gap-8 transform-gpu"><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Minimal Prep</h4><p class="text-lg">Preserve your natural tooth structure.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">Stain Resistant</h4><p class="text-lg">Enjoy coffee and wine without worry.</p></div><div class="text-center"><h4 class="text-2xl font-semibold mb-4">20+ Year Lifespan</h4><p class="text-lg">Long-lasting beauty with proper care.</p></div></div>',
            order: 4
          }
        ],
        seo: {
          title: 'Porcelain Veneers Turkey | Happy Smile Clinics',
          description: 'Get perfect Hollywood smile with porcelain veneers in Turkey. Natural-looking results, minimal preparation.',
          keywords: 'veneers, porcelain veneers, cosmetic dentistry, smile makeover, turkey'
        },
        isPublished: true,
        lastUpdated: new Date().toISOString(),
        updatedBy: 'Admin'
      }
    }
    
    return defaultPages
  }
}

export async function savePages(pages: any) {
  await ensureDataDir()
  await fs.writeFile(PAGES_FILE, JSON.stringify(pages, null, 2))
}

// Settings storage
export async function loadSettings() {
  await ensureDataDir()
  
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    // Return default settings if file doesn't exist
    return {
      buttons: {
        whatsapp: {
          text: "Ask Us on WhatsApp",
          url: "https://wa.me/908503059595",
          openInNewTab: true,
          enabled: true
        },
        contact: {
          text: "Contact Us",
          url: "/contact",
          openInNewTab: false,
          enabled: true
        },
        hero: {
          text: "Start Your Journey",
          url: "/contact",
          openInNewTab: false,
          enabled: true
        }
      }
    }
  }
}

export async function saveSettings(settings: any) {
  await ensureDataDir()
  await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2))
}

// Reviews storage
export async function loadReviews() {
  await ensureDataDir()
  
  try {
    const data = await fs.readFile(REVIEWS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    // Return default reviews if file doesn't exist
    return []
  }
}

export async function saveReviews(reviews: any[]) {
  await ensureDataDir()
  await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2))
}