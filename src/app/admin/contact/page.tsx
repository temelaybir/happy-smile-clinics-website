'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Trash2, CheckCircle, Circle, Search, MessageSquare } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  country: string
  status: 'new' | 'contacted' | 'completed'
  notes?: string
  createdAt: string
  updatedAt: string
}

export default function ContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'contacted' | 'completed'>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [searchTerm, filterStatus])

  const fetchSubmissions = async () => {
    try {
      const params = new URLSearchParams({
        ...(searchTerm && { search: searchTerm }),
        ...(filterStatus !== 'all' && { status: filterStatus })
      })

      const response = await fetch(`/api/admin/contact?${params}`)
      const data = await response.json()
      
      setSubmissions(data.submissions || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: status as any } : s))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(prev => prev ? { ...prev, status: status as any } : null)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setSubmissions(prev => prev.filter(s => s.id !== id))
        if (selectedSubmission?.id === id) {
          setSelectedSubmission(null)
        }
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
    }
  }

  const getNewCount = () => submissions.filter(s => s.status === 'new').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800'
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new':
        return 'New'
      case 'contacted':
        return 'Contacted'
      case 'completed':
        return 'Completed'
      default:
        return status
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading submissions...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 mt-2">Manage customer inquiries and contact form submissions</p>
        </div>
        {getNewCount() > 0 && (
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            {getNewCount()} new submissions
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    filterStatus === 'all'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('new')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    filterStatus === 'new'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  New
                </button>
                <button
                  onClick={() => setFilterStatus('contacted')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    filterStatus === 'contacted'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Contacted
                </button>
                <button
                  onClick={() => setFilterStatus('completed')}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    filterStatus === 'completed'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Submissions */}
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {submissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 hover:bg-gray-50 cursor-pointer ${
                    selectedSubmission?.id === submission.id ? 'bg-blue-50' : ''
                  } ${submission.status === 'new' ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{submission.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(submission.status)}`}>
                          {getStatusText(submission.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{submission.email}</p>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{submission.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    {submission.status === 'new' && (
                      <Circle className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </motion.div>
              ))}
              
              {submissions.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p>No submissions found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submission Detail */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedSubmission.name}</h2>
                  <p className="text-gray-500 mt-1">
                    Submitted on {new Date(selectedSubmission.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {selectedSubmission.status === 'new' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedSubmission.id, 'contacted')}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    >
                      Mark as Contacted
                    </button>
                  )}
                  {selectedSubmission.status === 'contacted' && (
                    <button
                      onClick={() => handleUpdateStatus(selectedSubmission.id, 'completed')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Completed
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedSubmission.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-900">
                      <Mail className="w-4 h-4 text-gray-400" />
                      {selectedSubmission.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <Phone className="w-4 h-4 text-gray-400" />
                      {selectedSubmission.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-900">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      {selectedSubmission.country}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Status</h3>
                  <div className="space-y-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedSubmission.status)}`}>
                      {getStatusText(selectedSubmission.status)}
                    </span>
                    <p className="text-xs text-gray-400">
                      Last updated: {new Date(selectedSubmission.updatedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=Re: Your inquiry to Happy Smile Clinics`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Reply via Email
                  </a>
                  <a
                    href={`tel:${selectedSubmission.phone}`}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Select a submission to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}