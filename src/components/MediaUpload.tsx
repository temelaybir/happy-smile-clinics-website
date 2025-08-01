'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Link, 
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react'

interface MediaUploadProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export default function MediaUpload({ value, onChange, onClose }: MediaUploadProps) {
  const [inputType, setInputType] = useState<'url' | 'upload'>('url')
  const [urlInput, setUrlInput] = useState(value || '')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      setError('Please enter a valid URL')
      return
    }

    // Basic URL validation
    try {
      if (urlInput.startsWith('/')) {
        // Local URL
        onChange(urlInput)
        onClose()
      } else {
        // External URL
        new URL(urlInput)
        onChange(urlInput)
        onClose()
      }
    } catch {
      setError('Please enter a valid URL')
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }

    setUploading(true)
    setError('')

    try {
      // Create FormData
      const formData = new FormData()
      formData.append('file', file)

      // Upload to API
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      onChange(data.url)
      onClose()
    } catch (err) {
      setError('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Add Image
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInputType('url')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                inputType === 'url'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <Link className="w-4 h-4 inline mr-2" />
              URL
            </button>
            <button
              onClick={() => setInputType('upload')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                inputType === 'upload'
                  ? 'bg-blue-50 text-blue-600 border-2 border-blue-500'
                  : 'bg-gray-100 text-gray-600 border-2 border-transparent'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Upload
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* URL Input */}
          {inputType === 'url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value)
                    setError('')
                  }}
                  placeholder="https://example.com/image.jpg or /images/local.jpg"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUrlSubmit()
                    }
                  }}
                />
              </div>

              {urlInput && (
                <div className="border border-gray-200 rounded-lg p-2">
                  <img
                    src={urlInput}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded"
                    onError={() => setError('Failed to load image')}
                    onLoad={() => setError('')}
                  />
                </div>
              )}

              <button
                onClick={handleUrlSubmit}
                disabled={!urlInput || !!error}
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Image
              </button>
            </div>
          )}

          {/* File Upload */}
          {inputType === 'upload' && (
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer"
                >
                  {uploading ? (
                    <div className="space-y-3">
                      <Loader2 className="w-12 h-12 mx-auto text-blue-500 animate-spin" />
                      <p className="text-sm text-gray-600">Uploading...</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </p>
                    </div>
                  )}
                </label>
              </div>

              {!uploading && (
                <p className="text-xs text-gray-500 text-center">
                  Max file size: 5MB. Supported formats: JPG, PNG, GIF, WebP
                </p>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}