'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Instagram, Search, ExternalLink, Heart } from 'lucide-react'

interface InstagramVideo {
  id: string
  title: string
  embedCode: string
  thumbnailUrl?: string
  likes?: number
  featured: boolean
  order: number
  createdAt: string
}

export default function InstagramPage() {
  const [videos, setVideos] = useState<InstagramVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<boolean | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchVideos()
  }, [currentPage, filterFeatured, searchTerm])

  const fetchVideos = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '12',
        ...(searchTerm && { search: searchTerm }),
        ...(filterFeatured !== null && { featured: filterFeatured.toString() })
      })

      const response = await fetch(`/api/admin/instagram?${params}`)
      const data = await response.json()
      
      setVideos(data.videos || [])
      setTotalPages(data.pagination?.pages || 1)
    } catch (error) {
      console.error('Error fetching Instagram videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this Instagram video?')) return

    try {
      await fetch(`/api/admin/instagram/${id}`, { method: 'DELETE' })
      fetchVideos()
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const toggleFeatured = async (video: InstagramVideo) => {
    try {
      await fetch(`/api/admin/instagram/${video.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...video, featured: !video.featured })
      })
      fetchVideos()
    } catch (error) {
      console.error('Error updating video:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading Instagram videos...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Instagram Videos</h1>
          <p className="text-gray-600 mt-2">Manage Instagram reels and video content</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:opacity-90 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Instagram Video
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search Instagram videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <select
            value={filterFeatured === null ? '' : filterFeatured.toString()}
            onChange={(e) => setFilterFeatured(e.target.value === '' ? null : e.target.value === 'true')}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Videos</option>
            <option value="true">Featured Only</option>
            <option value="false">Non-Featured</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos.map((video) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden group"
          >
            <div className="relative aspect-[9/16] bg-gray-100">
              {video.thumbnailUrl ? (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Instagram className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all">
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFeatured(video)}
                      className={`p-2 rounded-lg ${
                        video.featured
                          ? 'bg-purple-600 text-white'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      <Instagram className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white text-gray-800 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(video.id)}
                      className="p-2 bg-red-600 text-white rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              {video.featured && (
                <span className="absolute top-2 right-2 px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full">
                  Featured
                </span>
              )}
              {video.likes && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-sm">
                  <Heart className="w-3 h-3 fill-current" />
                  {video.likes.toLocaleString()}
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}