'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Home,
  Save,
  Loader2,
  Type,
  Image as ImageIcon,
  Sliders
} from 'lucide-react'
import { ToastContainer } from '@/components/Toast'
import { useToast } from '@/hooks/useToast'

interface HomepageContent {
  hero: {
    title: string
    subtitle: string
    buttonText: string
  }
  services: {
    title: string
    subtitle: string
  }
  reviews: {
    title: string
    subtitle: string
  }
  about: {
    title: string
    subtitle: string
    description: string
    stats: {
      countries: string
      facility: string
      support: string
    }
  }
  results: {
    title: string
    subtitle: string
  }
  contact: {
    title: string
    subtitle: string
  }
  effectTexts: {
    kineticOne: {
      lines: string[]
      subtitle: string
    }
    kineticTwo: {
      phrases: string[]
      subtitle: string
    }
    kineticThree: {
      text: string
    }
  }
}

export default function HomepageEditor() {
  const [content, setContent] = useState<HomepageContent>({
    hero: {
      title: 'Welcome to Happy Smile Clinics',
      subtitle: 'Transform Your Smile, Transform Your Life',
      buttonText: 'Get A Free Quote'
    },
    services: {
      title: 'Our Premium Services',
      subtitle: 'World-class dental treatments tailored to your needs'
    },
    reviews: {
      title: 'Patient Testimonials',
      subtitle: 'Hear from our satisfied patients'
    },
    about: {
      title: 'About Happy Smile',
      subtitle: "Istanbul's Premier Dental Clinic Excellence",
      description: "Happy Smile Clinics stands as Istanbul's most prestigious dental destination...",
      stats: {
        countries: '50+',
        facility: '12K+',
        support: '24/7'
      }
    },
    results: {
      title: 'Results Gallery',
      subtitle: 'Discover the life-changing transformations our patients have experienced'
    },
    contact: {
      title: 'Ready to Transform Your Smile?',
      subtitle: 'Contact us today for a free consultation'
    },
    effectTexts: {
      kineticOne: {
        lines: ['PERFECT', 'SMILE', 'DESIGN'],
        subtitle: 'Premium cosmetic dentistry in Istanbul'
      },
      kineticTwo: {
        phrases: ['GET A FREE', 'QUOTE', 'TODAY'],
        subtitle: 'Get your personalized treatment plan and pricing in 24 hours'
      },
      kineticThree: {
        text: 'READY TO SMILE?'
      }
    }
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toasts, toast, removeToast } = useToast()

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/homepage')
      if (response.ok) {
        const data = await response.json()
        if (data.content) {
          setContent(data.content)
        }
      }
    } catch (error) {
      console.error('Error fetching homepage content:', error)
      toast.error('Failed to load content', 'Using default values')
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content })
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      toast.success('Content saved successfully!', 'Homepage content has been updated')
    } catch (error) {
      console.error('Error saving content:', error)
      toast.error('Failed to save content', 'Please try again')
    } finally {
      setSaving(false)
    }
  }

  const updateSection = (section: keyof HomepageContent, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Homepage Content</h1>
          </div>
          <button
            onClick={saveContent}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save Changes
          </button>
        </div>

        <div className="space-y-8">
          {/* Hero Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-gray-600" />
              Hero Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => updateSection('hero', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) => updateSection('hero', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={content.hero.buttonText}
                  onChange={(e) => updateSection('hero', 'buttonText', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-gray-600" />
              Services Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.services.title}
                  onChange={(e) => updateSection('services', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.services.subtitle}
                  onChange={(e) => updateSection('services', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-gray-600" />
              About Section
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.about.title}
                  onChange={(e) => updateSection('about', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.about.subtitle}
                  onChange={(e) => updateSection('about', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={content.about.description}
                  onChange={(e) => updateSection('about', 'description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Countries Stat</label>
                  <input
                    type="text"
                    value={content.about.stats.countries}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        stats: {
                          ...prev.about.stats,
                          countries: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facility Stat</label>
                  <input
                    type="text"
                    value={content.about.stats.facility}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        stats: {
                          ...prev.about.stats,
                          facility: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Stat</label>
                  <input
                    type="text"
                    value={content.about.stats.support}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      about: {
                        ...prev.about,
                        stats: {
                          ...prev.about.stats,
                          support: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Results Gallery Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={content.results.title}
                  onChange={(e) => updateSection('results', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={content.results.subtitle}
                  onChange={(e) => updateSection('results', 'subtitle', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>

          {/* Effect Texts Section */}
          <motion.div 
            className="bg-white rounded-xl shadow-sm p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Type className="w-5 h-5 text-gray-600" />
              Effect Texts
            </h2>
            
            {/* Kinetic Text One */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-800">First Effect Text (Perfect Smile Design)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lines (one per line)</label>
                  <textarea
                    value={content.effectTexts.kineticOne.lines.join('\n')}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      effectTexts: {
                        ...prev.effectTexts,
                        kineticOne: {
                          ...prev.effectTexts.kineticOne,
                          lines: e.target.value.split('\n')
                        }
                      }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="PERFECT&#10;SMILE&#10;DESIGN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={content.effectTexts.kineticOne.subtitle}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      effectTexts: {
                        ...prev.effectTexts,
                        kineticOne: {
                          ...prev.effectTexts.kineticOne,
                          subtitle: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Kinetic Text Two */}
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Second Effect Text (Get A Free Quote)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phrases (one per line)</label>
                  <textarea
                    value={content.effectTexts.kineticTwo.phrases.join('\n')}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      effectTexts: {
                        ...prev.effectTexts,
                        kineticTwo: {
                          ...prev.effectTexts.kineticTwo,
                          phrases: e.target.value.split('\n')
                        }
                      }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="GET A FREE&#10;QUOTE&#10;TODAY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                  <input
                    type="text"
                    value={content.effectTexts.kineticTwo.subtitle}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      effectTexts: {
                        ...prev.effectTexts,
                        kineticTwo: {
                          ...prev.effectTexts.kineticTwo,
                          subtitle: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Kinetic Text Three */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-800">Third Effect Text (Ready to Smile)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Text</label>
                  <input
                    type="text"
                    value={content.effectTexts.kineticThree.text}
                    onChange={(e) => setContent(prev => ({
                      ...prev,
                      effectTexts: {
                        ...prev.effectTexts,
                        kineticThree: {
                          text: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="READY TO SMILE?"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}