'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, Settings, MessageCircle, Mail, ArrowRight } from 'lucide-react'
import { useToast } from '@/hooks/useToast'
import { ToastContainer } from '@/components/Toast'

interface ButtonSettings {
  text: string
  url: string
  openInNewTab: boolean
  enabled: boolean
}

interface SiteSettings {
  buttons: {
    whatsapp: ButtonSettings
    contact: ButtonSettings
    hero: ButtonSettings
  }
}

export default function SettingsPage() {
  const { toast, toasts, removeToast } = useToast()
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      if (!response.ok) throw new Error('Failed to fetch settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!settings) return
    
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      
      if (!response.ok) throw new Error('Failed to save settings')
      
      toast.success('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const updateButton = (buttonType: keyof SiteSettings['buttons'], field: keyof ButtonSettings, value: any) => {
    if (!settings) return
    
    setSettings({
      ...settings,
      buttons: {
        ...settings.buttons,
        [buttonType]: {
          ...settings.buttons[buttonType],
          [field]: value
        }
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!settings) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            Site Settings
          </h1>
          <p className="text-gray-600">Configure site-wide button settings and links</p>
        </div>

        {/* Settings Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Button Configuration</h2>
          
          <div className="space-y-8">
            {/* WhatsApp Button */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageCircle className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-medium text-gray-900">WhatsApp Button</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.whatsapp.text}
                    onChange={(e) => updateButton('whatsapp', 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp URL
                  </label>
                  <input
                    type="url"
                    value={settings.buttons.whatsapp.url}
                    onChange={(e) => updateButton('whatsapp', 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://wa.me/908503059595"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.whatsapp.openInNewTab}
                    onChange={(e) => updateButton('whatsapp', 'openInNewTab', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Open in new tab</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.whatsapp.enabled}
                    onChange={(e) => updateButton('whatsapp', 'enabled', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
              </div>
            </div>

            {/* Contact Button */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Contact Button</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.contact.text}
                    onChange={(e) => updateButton('contact', 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact URL
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.contact.url}
                    onChange={(e) => updateButton('contact', 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/contact or https://..."
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.contact.openInNewTab}
                    onChange={(e) => updateButton('contact', 'openInNewTab', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Open in new tab</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.contact.enabled}
                    onChange={(e) => updateButton('contact', 'enabled', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
              </div>
            </div>

            {/* Hero Button */}
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <ArrowRight className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-medium text-gray-900">Hero Button</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.hero.text}
                    onChange={(e) => updateButton('hero', 'text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Button URL
                  </label>
                  <input
                    type="text"
                    value={settings.buttons.hero.url}
                    onChange={(e) => updateButton('hero', 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/contact or https://..."
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.hero.openInNewTab}
                    onChange={(e) => updateButton('hero', 'openInNewTab', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Open in new tab</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={settings.buttons.hero.enabled}
                    onChange={(e) => updateButton('hero', 'enabled', e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Enabled</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Settings'}
        </motion.button>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  )
}