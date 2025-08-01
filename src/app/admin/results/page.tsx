'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Search, Image as ImageIcon, Save, Loader2, Upload } from 'lucide-react'
import { ToastContainer } from '@/components/Toast'
import { useToast } from '@/hooks/useToast'

interface PatientResult {
  id: string
  name: string
  afterImage: string
  treatments: string[]
  featured: boolean
  order: number
  createdAt: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<PatientResult[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    name: '',
    afterImage: '',
    treatments: ['']
  })
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toasts, toast, removeToast } = useToast()

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const response = await fetch('/api/admin/results')
      const data = await response.json()
      
      if (data.success) {
        setResults(data.results || [])
      }
    } catch (error) {
      console.error('Error fetching results:', error)
      toast.error('Failed to load results', 'Please try again')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = () => {
    const newResult: PatientResult = {
      id: Date.now().toString(),
      name: 'New Patient',
      afterImage: '',
      treatments: ['Treatment 1'],
      featured: false,
      order: results.length,
      createdAt: new Date().toISOString()
    }
    setResults([...results, newResult])
    setEditingId(newResult.id)
    setEditForm({
      name: newResult.name,
      afterImage: newResult.afterImage,
      treatments: newResult.treatments
    })
  }

  const handleEdit = (result: PatientResult) => {
    setEditingId(result.id)
    setEditForm({
      name: result.name,
      afterImage: result.afterImage,
      treatments: result.treatments
    })
  }

  const handleSave = async () => {
    if (!editingId) return

    const updatedResults = results.map(r => 
      r.id === editingId 
        ? { ...r, ...editForm }
        : r
    )
    setResults(updatedResults)
    setEditingId(null)
    
    setSaving(true)
    try {
      const response = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results: updatedResults })
      })

      if (response.ok) {
        toast.success('Results saved successfully!', 'Changes have been applied')
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving results:', error)
      toast.error('Failed to save results', 'Please try again')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this result?')) return
    
    setResults(prev => prev.filter(r => r.id !== id))
    toast.success('Result deleted', 'The result has been removed')
  }

  const toggleFeatured = (result: PatientResult) => {
    setResults(prev => prev.map(r => 
      r.id === result.id ? { ...r, featured: !r.featured } : r
    ))
  }

  const addTreatmentLine = () => {
    setEditForm(prev => ({
      ...prev,
      treatments: [...prev.treatments, '']
    }))
  }

  const updateTreatmentLine = (index: number, value: string) => {
    setEditForm(prev => ({
      ...prev,
      treatments: prev.treatments.map((t, i) => i === index ? value : t)
    }))
  }

  const removeTreatmentLine = (index: number) => {
    setEditForm(prev => ({
      ...prev,
      treatments: prev.treatments.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File too large', 'Please select an image under 5MB')
      return
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
    if (!validTypes.includes(file.type)) {
      toast.error('Invalid file type', 'Please select a JPEG, PNG, or WebP image')
      return
    }

    setUploadingImage(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setEditForm(prev => ({
          ...prev,
          afterImage: data.url
        }))
        toast.success('Image uploaded successfully!', 'The image has been uploaded')
      } else {
        throw new Error(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Failed to upload image', 'Please try again')
    } finally {
      setUploadingImage(false)
    }
  }

  const filteredResults = results.filter(result => {
    const matchesSearch = result.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFeatured = filterFeatured === null || result.featured === filterFeatured
    return matchesSearch && matchesFeatured
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Results</h1>
          <p className="text-gray-600 mt-2">Manage patient transformation results</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Save All Changes
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Result
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by patient name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={filterFeatured === null ? '' : filterFeatured.toString()}
            onChange={(e) => setFilterFeatured(e.target.value === '' ? null : e.target.value === 'true')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Results</option>
            <option value="true">Featured Only</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResults.map((result) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {editingId === result.id ? (
              <div className="p-6">
                {/* Edit Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">After Image</label>
                    
                    {/* Image Preview */}
                    {editForm.afterImage && (
                      <div className="mb-4 relative">
                        <img
                          src={editForm.afterImage}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => setEditForm({ ...editForm, afterImage: '' })}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    
                    {/* Upload Button */}
                    <div className="space-y-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingImage}
                        className="w-full px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload Image
                          </>
                        )}
                      </button>
                      
                      {/* URL Input */}
                      <div className="relative">
                        <input
                          type="text"
                          value={editForm.afterImage}
                          onChange={(e) => setEditForm({ ...editForm, afterImage: e.target.value })}
                          placeholder="Or enter image URL..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Treatments</label>
                    {editForm.treatments.map((treatment, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={treatment}
                          onChange={(e) => updateTreatmentLine(index, e.target.value)}
                          placeholder={`Treatment ${index + 1}`}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {editForm.treatments.length > 1 && (
                          <button
                            onClick={() => removeTreatmentLine(index)}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={addTreatmentLine}
                      className="w-full px-4 py-2 border border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400"
                    >
                      <Plus className="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        handleSave()
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative aspect-[4/3] bg-gray-100">
                  {result.afterImage ? (
                    <img
                      src={result.afterImage}
                      alt={result.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  {result.featured && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-blue-600 text-white rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{result.name}</h3>
                  <div className="space-y-1 mb-4">
                    {result.treatments.map((treatment, index) => (
                      <p key={index} className="text-sm text-gray-600">• {treatment}</p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {new Date(result.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFeatured(result)}
                        className={`p-2 rounded-lg ${
                          result.featured
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        } hover:bg-opacity-80`}
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => handleEdit(result)}
                        className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(result.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  )
}