'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Save, 
  X, 
  Eye, 
  EyeOff,
  Loader2,
  Plus,
  Trash2,
  Edit,
  Type,
  Image as ImageIcon,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { ToastContainer } from '@/components/Toast'
import { useToast } from '@/hooks/useToast'
import dynamic from 'next/dynamic'

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), { 
  ssr: false,
  loading: () => <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
})

const MediaUpload = dynamic(() => import('@/components/MediaUpload'), {
  ssr: false
})

interface PageSection {
  id: string
  type: 'hero' | 'text' | 'image-text' | 'cta'
  title: string
  content: string
  image?: string
  order: number
  metadata?: any
}

interface PageData {
  id: string
  slug: string
  title: string
  description: string
  sections: PageSection[]
  seo: {
    title: string
    description: string
    keywords: string
  }
  isPublished: boolean
  lastUpdated: string
  updatedBy: string
}

interface PageEditorProps {
  pageId: string
  pageTitle: string
}

export default function PageEditor({ pageId, pageTitle }: PageEditorProps) {
  const [pageData, setPageData] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [showMediaUpload, setShowMediaUpload] = useState<string | null>(null)
  const { toasts, toast, removeToast } = useToast()

  useEffect(() => {
    fetchPageData()
  }, [pageId])

  const fetchPageData = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      if (!response.ok) throw new Error('Failed to fetch page')
      
      const data = await response.json()
      const page = data.pages.find((p: PageData) => p.id === pageId)
      
      if (page) {
        setPageData(page)
      }
    } catch (error) {
      console.error('Error fetching page:', error)
      toast.error('Failed to load page', 'Please try again')
    } finally {
      setLoading(false)
    }
  }

  const savePage = async () => {
    if (!pageData) return

    setSaving(true)
    try {
      const response = await fetch(`/api/admin/pages/${pageData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'admin-user'
        },
        body: JSON.stringify(pageData)
      })

      if (!response.ok) throw new Error('Failed to save page')

      toast.success('Page saved successfully', 'All changes have been applied')
      fetchPageData()
    } catch (error: any) {
      console.error('Error saving page:', error)
      toast.error('Failed to save page', error.message)
    } finally {
      setSaving(false)
    }
  }

  const addSection = (type: PageSection['type']) => {
    if (!pageData) return

    const newSection: PageSection = {
      id: `s${Date.now()}`,
      type,
      title: '',
      content: '',
      order: pageData.sections.length + 1
    }

    setPageData({
      ...pageData,
      sections: [...pageData.sections, newSection]
    })
  }

  const deleteSection = (sectionId: string) => {
    if (!pageData) return

    setPageData({
      ...pageData,
      sections: pageData.sections.filter(s => s.id !== sectionId)
    })
  }

  const updateSection = (sectionId: string, updates: Partial<PageSection>) => {
    if (!pageData) return

    setPageData({
      ...pageData,
      sections: pageData.sections.map(s => 
        s.id === sectionId ? { ...s, ...updates } : s
      )
    })
  }

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    if (!pageData) return

    const sections = [...pageData.sections]
    const index = sections.findIndex(s => s.id === sectionId)
    
    if (direction === 'up' && index > 0) {
      [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]]
    } else if (direction === 'down' && index < sections.length - 1) {
      [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]]
    }

    // Update order numbers
    const updatedSections = sections.map((section, idx) => ({
      ...section,
      order: idx + 1
    }))

    setPageData({
      ...pageData,
      sections: updatedSections
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading page...</span>
        </div>
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Page not found</h3>
        <p className="text-gray-600">Unable to load page data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{pageTitle}</h2>
            <p className="text-gray-600 mt-1">Manage content for {pageData.slug} page</p>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={pageData.isPublished}
                onChange={(e) => setPageData({
                  ...pageData,
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
              value={pageData.title}
              onChange={(e) => setPageData({
                ...pageData,
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
                value={pageData.slug}
                readOnly
                className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Page Description
          </label>
          <textarea
            value={pageData.description}
            onChange={(e) => setPageData({
              ...pageData,
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
              onClick={() => addSection('cta')}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              CTA
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {pageData.sections.sort((a, b) => a.order - b.order).map((section, index) => (
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
                    onClick={() => moveSection(section.id, 'up')}
                    disabled={index === 0}
                    className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSection(section.id, 'down')}
                    disabled={index === pageData.sections.length - 1}
                    className="p-1.5 text-gray-500 hover:text-gray-700 disabled:opacity-30"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
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
                      value={section.content || ''}
                      onChange={(value) => updateSection(section.id, {
                        content: value
                      })}
                      placeholder="Enter section content..."
                    />
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
                            <ImageIcon className="w-4 h-4" />
                            Browse
                          </button>
                        </div>
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
              value={pageData.seo.title}
              onChange={(e) => setPageData({
                ...pageData,
                seo: { ...pageData.seo, title: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {pageData.seo.title.length}/60 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Description
            </label>
            <textarea
              value={pageData.seo.description}
              onChange={(e) => setPageData({
                ...pageData,
                seo: { ...pageData.seo, description: e.target.value }
              })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              {pageData.seo.description.length}/160 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keywords (comma separated)
            </label>
            <input
              type="text"
              value={pageData.seo.keywords}
              onChange={(e) => setPageData({
                ...pageData,
                seo: { ...pageData.seo, keywords: e.target.value }
              })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Media Upload Modal */}
      {showMediaUpload && (
        <MediaUpload
          value={pageData.sections.find(s => s.id === showMediaUpload)?.image || ''}
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