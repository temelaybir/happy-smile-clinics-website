'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  Edit, 
  Save, 
  X, 
  Globe, 
  Eye, 
  EyeOff,
  Clock,
  User,
  Search,
  Plus,
  Trash2,
  Code,
  Type,
  Image as ImageIcon,
  List,
  Loader2,
  Upload,
  Link
} from 'lucide-react'
import { ToastContainer } from '@/components/Toast'
import { useToast } from '@/hooks/useToast'
import dynamic from 'next/dynamic'

// Dynamic imports
const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
})

const MediaUpload = dynamic(() => import('@/components/MediaUpload'), {
  ssr: false
})

interface PageContent {
  id: string
  slug: string
  title: string
  description: string
  sections: {
    id: string
    type: 'hero' | 'text' | 'image-text' | 'features' | 'cta' | 'faq'
    title?: string
    content: string
    image?: string
    order: number
    metadata?: any
  }[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  isPublished: boolean
  lastUpdated: string
  updatedBy: string
}

const pageTemplates = [
  { slug: 'dental-implants', name: 'Dental Implants', icon: '🦷' },
  { slug: 'about', name: 'About Us', icon: '👥' },
  { slug: 'services', name: 'Services', icon: '🏥' },
  { slug: 'contact', name: 'Contact', icon: '📧' },
  { slug: 'treatments', name: 'Treatments', icon: '💊' },
  { slug: 'testimonials', name: 'Testimonials', icon: '⭐' },
  { slug: 'smile-design', name: 'Smile Design', icon: '😊' },
  { slug: 'veneers', name: 'Veneers', icon: '✨' },
  { slug: 'crowns', name: 'Crowns', icon: '👑' }
]

export default function PagesEditor() {
  const [pages, setPages] = useState<PageContent[]>([])
  const [selectedPage, setSelectedPage] = useState<PageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showMediaUpload, setShowMediaUpload] = useState<string | null>(null)
  const { toasts, toast, removeToast } = useToast()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      
      if (!response.ok) {
        throw new Error('Failed to fetch pages')
      }
      
      const data = await response.json()
      console.log('Fetched pages data:', data)
      setPages(data.pages || [])
    } catch (error) {
      console.error('Error fetching pages:', error)
      toast.error('Failed to load pages', 'Using demo data')
      
      // Demo data
      setPages([
        {
          id: '1',
          slug: 'dental-implants',
          title: 'Dental Implants',
          description: 'Premium dental implant treatments in Turkey',
          sections: [
            {
              id: 's1',
              type: 'hero',
              title: 'Transform Your Smile with Dental Implants',
              content: 'Experience world-class dental care with our expert team in Turkey.',
              order: 1
            },
            {
              id: 's2',
              type: 'text',
              title: 'Why Choose Our Clinic?',
              content: 'We offer state-of-the-art facilities, experienced surgeons, and comprehensive care packages.',
              order: 2
            }
          ],
          seo: {
            title: 'Dental Implants in Turkey | Happy Smile Clinics',
            description: 'Get premium dental implants at affordable prices in Turkey.',
            keywords: 'dental implants, turkey, dental clinic'
          },
          isPublished: true,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'Admin'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const savePage = async () => {
    if (!selectedPage) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/pages/${selectedPage.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'admin-user'
        },
        body: JSON.stringify(selectedPage)
      })

      if (!response.ok) {
        throw new Error('Failed to save page')
      }

      toast.success('Page saved successfully', 'All changes have been applied')
      fetchPages()
    } catch (error: any) {
      console.error('Error saving page:', error)
      toast.error('Failed to save page', error.message)
    } finally {
      setSaving(false)
    }
  }

  const addSection = (type: PageContent['sections'][0]['type']) => {
    if (!selectedPage) return

    const newSection = {
      id: `s${Date.now()}`,
      type,
      title: '',
      content: '',
      order: selectedPage.sections.length + 1
    }

    setSelectedPage({
      ...selectedPage,
      sections: [...selectedPage.sections, newSection]
    })
  }

  const deleteSection = (sectionId: string) => {
    if (!selectedPage) return

    setSelectedPage({
      ...selectedPage,
      sections: selectedPage.sections.filter(s => s.id !== sectionId)
    })
  }

  const updateSection = (sectionId: string, updates: Partial<PageContent['sections'][0]>) => {
    if (!selectedPage) return

    const updatedSections = selectedPage.sections.map(s => 
      s.id === sectionId ? { ...s, ...updates } : s
    )
    
    setSelectedPage({
      ...selectedPage,
      sections: updatedSections
    })
    
    console.log('Updated section:', sectionId, updates)
  }

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading pages...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Page Editor</h1>
        <p className="text-gray-600 mt-2">Edit content for your website pages</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Page List */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-4 sticky top-4"
          >
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              {filteredPages.map((page) => (
                <motion.button
                  key={page.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    console.log('Selected page:', page)
                    console.log('Page sections:', page.sections)
                    setSelectedPage(page)
                    setEditingSection(null)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedPage?.id === page.id
                      ? 'bg-blue-50 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">
                      {pageTemplates.find(t => t.slug === page.slug)?.icon || '📄'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{page.title}</h3>
                      <p className="text-sm text-gray-500">/{page.slug}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {page.isPublished ? (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            Published
                          </span>
                        ) : (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <EyeOff className="w-3 h-3" />
                            Draft
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-3">
          {selectedPage ? (
            <motion.div
              key={selectedPage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Page Header */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedPage.title}</h2>
                    <p className="text-gray-600 mt-1">Edit page content and settings</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedPage.isPublished}
                        onChange={(e) => setSelectedPage({
                          ...selectedPage,
                          isPublished: e.target.checked
                        })}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Published</span>
                    </label>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={savePage}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                    >
                      {saving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </motion.button>
                  </div>
                </div>

                {/* Page Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page Title
                    </label>
                    <input
                      type="text"
                      value={selectedPage.title}
                      onChange={(e) => setSelectedPage({
                        ...selectedPage,
                        title: e.target.value
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL Slug
                    </label>
                    <div className="flex items-center">
                      <span className="text-gray-500 mr-2">/</span>
                      <input
                        type="text"
                        value={selectedPage.slug}
                        onChange={(e) => setSelectedPage({
                          ...selectedPage,
                          slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                        })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Description
                  </label>
                  <textarea
                    value={selectedPage.description}
                    onChange={(e) => setSelectedPage({
                      ...selectedPage,
                      description: e.target.value
                    })}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Page Sections */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Page Sections</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addSection('text')}
                      className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                    >
                      <Type className="w-4 h-4" />
                      Text
                    </button>
                    <button
                      onClick={() => addSection('image-text')}
                      className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                    >
                      <ImageIcon className="w-4 h-4" />
                      Image + Text
                    </button>
                    <button
                      onClick={() => addSection('features')}
                      className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
                    >
                      <List className="w-4 h-4" />
                      Features
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedPage.sections.map((section, index) => (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-gray-500">
                            #{index + 1}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                            {section.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingSection(
                              editingSection === section.id ? null : section.id
                            )}
                            className="p-1.5 text-gray-500 hover:text-gray-700"
                          >
                            {editingSection === section.id ? (
                              <X className="w-4 h-4" />
                            ) : (
                              <Edit className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => deleteSection(section.id)}
                            className="p-1.5 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {editingSection === section.id ? (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Section Title
                            </label>
                            <input
                              type="text"
                              value={section.title || ''}
                              onChange={(e) => updateSection(section.id, {
                                title: e.target.value
                              })}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Enter ${section.type} title...`}
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Content
                            </label>
                            <RichTextEditor
                              key={`editor-${section.id}-${section.content?.length || 0}`}
                              value={section.content || ''}
                              onChange={(value) => updateSection(section.id, {
                                content: value
                              })}
                              placeholder="Enter section content..."
                            />
                            {/* Debug info */}
                            <details className="mt-2">
                              <summary className="text-xs text-gray-500 cursor-pointer">Having issues? Use plain text editor</summary>
                              <textarea
                                className="mt-2 w-full p-3 border border-gray-200 rounded-lg text-sm"
                                rows={6}
                                value={section.content || ''}
                                onChange={(e) => updateSection(section.id, {
                                  content: e.target.value
                                })}
                                placeholder="Enter HTML content..."
                              />
                              <p className="text-xs text-gray-400 mt-1">You can enter HTML tags like &lt;p&gt;, &lt;strong&gt;, etc.</p>
                            </details>
                          </div>

                          {(section.type === 'image-text' || section.type === 'hero') && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section Image
                              </label>
                              <div className="space-y-3">
                                {section.image && (
                                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                                    <img 
                                      src={section.image} 
                                      alt="Section preview" 
                                      className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => updateSection(section.id, { image: '' })}
                                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    value={section.image || ''}
                                    onChange={(e) => updateSection(section.id, {
                                      image: e.target.value
                                    })}
                                    placeholder="Enter image URL"
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                  />
                                  <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 text-sm"
                                    onClick={() => setShowMediaUpload(section.id)}
                                  >
                                    <Upload className="w-4 h-4" />
                                    Browse
                                  </button>
                                </div>
                                
                                <p className="text-xs text-gray-500">
                                  Use a direct image URL (e.g., /images/example.jpg or https://...)
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          {section.title && (
                            <h4 className="font-medium text-gray-900 mb-2">
                              {section.title}
                            </h4>
                          )}
                          {section.type === 'image-text' && section.image && (
                            <div className="mb-3">
                              <img 
                                src={section.image} 
                                alt={section.title || 'Section image'}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <div 
                            className="text-sm text-gray-600 line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: section.content || '<p>No content yet...</p>' }}
                          />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SEO Settings */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Title
                    </label>
                    <input
                      type="text"
                      value={selectedPage.seo.title}
                      onChange={(e) => setSelectedPage({
                        ...selectedPage,
                        seo: { ...selectedPage.seo, title: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedPage.seo.title.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SEO Description
                    </label>
                    <textarea
                      value={selectedPage.seo.description}
                      onChange={(e) => setSelectedPage({
                        ...selectedPage,
                        seo: { ...selectedPage.seo, description: e.target.value }
                      })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedPage.seo.description.length}/160 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Keywords (comma separated)
                    </label>
                    <input
                      type="text"
                      value={selectedPage.seo.keywords}
                      onChange={(e) => setSelectedPage({
                        ...selectedPage,
                        seo: { ...selectedPage.seo, keywords: e.target.value }
                      })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Last Updated Info */}
              <div className="text-sm text-gray-500 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Last updated: {new Date(selectedPage.lastUpdated).toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  By: {selectedPage.updatedBy}
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a page to edit
              </h3>
              <p className="text-gray-600">
                Choose a page from the list to start editing its content
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Media Upload Modal */}
      {showMediaUpload && selectedPage && (
        <MediaUpload
          value={selectedPage.sections.find(s => s.id === showMediaUpload)?.image || ''}
          onChange={(url) => {
            updateSection(showMediaUpload, { image: url })
            setShowMediaUpload(null)
          }}
          onClose={() => setShowMediaUpload(null)}
        />
      )}

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}