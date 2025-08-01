'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Save, X, Upload } from 'lucide-react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface HeroBackground {
  id: string
  imageUrl: string
  title?: string
  order: number
  isActive: boolean
  animationType?: string
  transparency?: number
}

export default function HeroBackgroundPage() {
  const [backgrounds, setBackgrounds] = useState<HeroBackground[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    imageUrl: '',
    title: '',
    order: 0,
    isActive: true,
    animationType: 'slide', // SADECE SLIDE ANIMASYON
    transparency: 0.3
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBackgrounds()
  }, [])

  const loadBackgrounds = async () => {
    try {
      const response = await fetch('/api/admin/hero-background')
      const result = await response.json()
      if (result.success) {
        setBackgrounds(result.data)
      }
    } catch (error) {
      console.error('Error loading backgrounds:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.imageUrl.trim()) {
      alert('Please enter an image URL')
      return
    }
    
    try {
      const url = editingId 
        ? `/api/admin/hero-background` 
        : '/api/admin/hero-background'
      
      const method = editingId ? 'PUT' : 'POST'
      const body = editingId ? { ...formData, id: editingId } : formData

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const result = await response.json()
      
      if (result.success) {
        setFormData({ imageUrl: '', title: '', order: 0, isActive: true, animationType: 'slide', transparency: 0.3 }) // SADECE SLIDE
        setEditingId(null)
        setIsAdding(false)
        loadBackgrounds()
      } else {
        alert(result.error || 'Error saving background')
      }
    } catch (error) {
      console.error('Error saving background:', error)
      alert('Error saving background. Please try again.')
    }
  }

  const handleEdit = (background: HeroBackground) => {
    setEditingId(background.id)
    setFormData({
      imageUrl: background.imageUrl,
      title: background.title || '',
      order: background.order,
      isActive: background.isActive,
      animationType: background.animationType || 'slide',
      transparency: background.transparency || 0.3
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this background?')) return
    
    try {
      const response = await fetch(`/api/admin/hero-background?id=${id}`, {
        method: 'DELETE',
      })

      const result = await response.json()
      
      if (result.success) {
        loadBackgrounds()
      }
    } catch (error) {
      console.error('Error deleting background:', error)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setIsAdding(false)
    setFormData({ imageUrl: '', title: '', order: 0, isActive: true, animationType: 'slide', transparency: 0.3 }) // SADECE SLIDE
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hero Background Management</h1>
          <Button 
            onClick={() => setIsAdding(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Background
          </Button>
        </div>

        {/* Add/Edit Form */}
        {isAdding && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Edit Background' : 'Add New Background'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Animation Type
                  </label>
                  <Select
                    value={formData.animationType}
                    onValueChange={(value) => setFormData({ ...formData, animationType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select animation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slide">Horizontal Slide</SelectItem>
                      {/* <SelectItem value="fade">Fade In/Out</SelectItem> - DEVRE DIŞI BIRAKILD */}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <Input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/images/hero/dental-patients-hero.webp"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Relative path (e.g., /images/hero/image.webp) or full URL
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title (Optional)
                  </label>
                  <Input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Background title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transparency: {Math.round(formData.transparency * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={formData.transparency}
                    onChange={(e) => setFormData({ ...formData, transparency: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    0% = Completely transparent, 100% = Fully opaque
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active
                  </label>
                </div>
                
                <div className="flex space-x-2">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? 'Update' : 'Save'}
                  </Button>
                  <Button type="button" onClick={handleCancel} variant="outline">
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Backgrounds List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {backgrounds.map((background) => (
            <Card key={background.id} className="overflow-hidden">
              <div className="relative h-48 bg-gray-200">
                <Image
                  src={background.imageUrl}
                  alt={background.title || 'Background'}
                  fill
                  className="object-cover"
                />
                {!background.isActive && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-medium">Inactive</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {background.title || 'Untitled'}
                    </h3>
                    <p className="text-sm text-gray-500">Order: {background.order}</p>
                    <p className="text-xs text-gray-400">
                      Animation: {background.animationType || 'slide'}
                    </p>
                    <p className="text-xs text-gray-400">
                      Transparency: {Math.round((background.transparency || 0.3) * 100)}%
                    </p>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(background)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(background.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-400 truncate">
                  {background.imageUrl}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {backgrounds.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No backgrounds found. Add your first one!</p>
          </div>
        )}
      </div>
    </div>
  )
} 