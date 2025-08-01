'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Calendar, MessageCircle, Phone, Instagram, ArrowLeft, Plus, Trash2, Palette } from 'lucide-react'
import Link from 'next/link'
import { stickyModels } from '@/components/ui/sticky-sidebar-models'

interface StickyItem {
  id: string
  label: string
  icon: string
  action: string
  value: string
  enabled: boolean
}

const iconOptions = [
  { value: 'calendar', label: 'Calendar', icon: Calendar },
  { value: 'message', label: 'Message', icon: MessageCircle },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'instagram', label: 'Instagram', icon: Instagram }
]

const actionOptions = [
  { value: 'link', label: 'Internal Link' },
  { value: 'external', label: 'External Link' },
  { value: 'modal', label: 'Open Modal' }
]

export default function AdminStickySidebar() {
  const [items, setItems] = useState<StickyItem[]>([])
  const [selectedModel, setSelectedModel] = useState('gradient')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const response = await fetch('/api/admin/sticky-sidebar')
      if (response.ok) {
        const data = await response.json()
        setItems(data.items)
        setSelectedModel(data.model || 'gradient')
      }
    } catch (error) {
      console.error('Failed to load items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/sticky-sidebar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, model: selectedModel })
      })

      if (response.ok) {
        alert('Sticky sidebar updated successfully!')
      } else {
        alert('Failed to save changes')
      }
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error saving changes')
    } finally {
      setSaving(false)
    }
  }

  const updateItem = (index: number, field: keyof StickyItem, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const addItem = () => {
    const newItem: StickyItem = {
      id: `item-${Date.now()}`,
      label: 'New Item',
      icon: 'message',
      action: 'link',
      value: '/',
      enabled: true
    }
    setItems([...items, newItem])
  }

  const removeItem = (index: number) => {
    if (confirm('Are you sure you want to remove this item?')) {
      setItems(items.filter((_, i) => i !== index))
    }
  }

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...items]
    const newIndex = direction === 'up' ? index - 1 : index + 1
    
    if (newIndex >= 0 && newIndex < items.length) {
      [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]]
      setItems(newItems)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/admin"
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-light">Sticky Sidebar Settings</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Model Selection */}
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-light mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Design Model
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(stickyModels).map(([key, model]) => (
              <button
                key={key}
                onClick={() => setSelectedModel(key)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedModel === key
                    ? 'border-purple-500 bg-purple-500/20'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <span className="text-sm font-medium">{model.name}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="mt-4 text-sm text-purple-400 hover:text-purple-300"
          >
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-gray-900 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-light mb-4">Preview</h3>
            <div className="relative h-64 bg-black rounded-lg overflow-hidden">
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                {(() => {
                  const ModelComponent = stickyModels[selectedModel]?.component
                  if (!ModelComponent) return null
                  
                  return (
                    <ModelComponent
                      items={items.filter(item => item.enabled)}
                      onItemClick={() => {}}
                      isLink={() => false}
                    />
                  )
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Items Management */}
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-light mb-4">Items</h2>
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => moveItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveItem(index, 'down')}
                      disabled={index === items.length - 1}
                      className="p-1 hover:bg-gray-700 rounded disabled:opacity-30"
                    >
                      ↓
                    </button>
                  </div>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.enabled}
                      onChange={(e) => updateItem(index, 'enabled', e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span>Enabled</span>
                  </label>

                  <button
                    onClick={() => removeItem(index)}
                    className="ml-auto p-2 text-red-400 hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Label</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Icon</label>
                    <select
                      value={item.icon}
                      onChange={(e) => updateItem(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      {iconOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Action</label>
                    <select
                      value={item.action}
                      onChange={(e) => updateItem(index, 'action', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    >
                      {actionOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-1">
                      {item.action === 'modal' ? 'Modal Type' : 'URL/Path'}
                    </label>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => updateItem(index, 'value', e.target.value)}
                      placeholder={item.action === 'link' ? '/page-path' : item.action === 'external' ? 'https://...' : 'contact'}
                      className="w-full px-3 py-2 bg-gray-700 rounded border border-gray-600 focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                  <span>Preview:</span>
                  <div className="flex items-center gap-2">
                    {(() => {
                      const IconComponent = iconOptions.find(opt => opt.value === item.icon)?.icon || MessageCircle
                      return <IconComponent className="w-4 h-4" />
                    })()}
                    <span>{item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button
            onClick={addItem}
            className="mt-4 w-full py-3 border-2 border-dashed border-gray-600 hover:border-purple-500 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add New Item
          </button>
        </div>

        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-light mb-4">Instructions</h2>
          <div className="space-y-2 text-gray-400">
            <p>• Items will appear in the order shown above</p>
            <p>• Use "Internal Link" for pages within the site (e.g., /events)</p>
            <p>• Use "External Link" for outside websites (must include https://)</p>
            <p>• Use "Modal" to open popups (currently only "contact" is supported)</p>
            <p>• Disabled items will not appear on the website</p>
          </div>
        </div>
      </div>
    </div>
  )
}