// Use global to persist across hot reloads in development
declare global {
  var _pagesStorage: Map<string, any> | undefined
  var _siteSettings: any | undefined
  var _initialized: boolean | undefined
}

// Shared in-memory storage for pages
export const pagesStorage = global._pagesStorage || new Map<string, any>()
global._pagesStorage = pagesStorage

// Site-wide settings for buttons and links
export const siteSettings = global._siteSettings || {
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
global._siteSettings = siteSettings

// Initialize pages only once
function initializePages() {
  if (!global._initialized && pagesStorage.size === 0) {
    global._initialized = true
    // Load existing dental implants page
    pagesStorage.set('1', {
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
    })
  }
}

// Initialize on module load
initializePages()