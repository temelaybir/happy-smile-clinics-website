'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, User, FileText, Image, MessageSquare, Star, Video, Filter } from 'lucide-react'

interface Activity {
  id: string
  type: 'login' | 'create' | 'update' | 'delete' | 'upload' | 'message' | 'review'
  action: string
  user: string
  userId: string
  details?: string
  ipAddress?: string
  timestamp: string
}

const activityIcons = {
  login: User,
  create: FileText,
  update: FileText,
  delete: FileText,
  upload: Image,
  message: MessageSquare,
  review: Star
}

const activityColors = {
  login: 'text-blue-600 bg-blue-100',
  create: 'text-green-600 bg-green-100',
  update: 'text-yellow-600 bg-yellow-100',
  delete: 'text-red-600 bg-red-100',
  upload: 'text-purple-600 bg-purple-100',
  message: 'text-indigo-600 bg-indigo-100',
  review: 'text-orange-600 bg-orange-100'
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [filterType, setFilterType] = useState<string>('')
  const [filterUser, setFilterUser] = useState<string>('')
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    fetchActivities()
  }, [filterType, filterUser, dateRange])

  const fetchActivities = async () => {
    try {
      const params = new URLSearchParams({
        ...(filterType && { type: filterType }),
        ...(filterUser && { user: filterUser }),
        range: dateRange
      })

      const response = await fetch(`/api/admin/activity?${params}`)
      const data = await response.json()
      
      setActivities(data.activities || [])
    } catch (error) {
      console.error('Error fetching activities:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const then = new Date(timestamp)
    const diff = now.getTime() - then.getTime()
    
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return then.toLocaleDateString()
  }

  const groupActivitiesByDate = () => {
    const grouped: { [key: string]: Activity[] } = {}
    
    activities.forEach(activity => {
      const date = new Date(activity.timestamp).toDateString()
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(activity)
    })
    
    return grouped
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading activity log...</div>
      </div>
    )
  }

  const groupedActivities = groupActivitiesByDate()

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-2">Monitor all admin activities and changes</p>
        </div>
        <div className="flex gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1d">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex gap-4 items-center">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Activities</option>
            <option value="login">Logins</option>
            <option value="create">Created</option>
            <option value="update">Updated</option>
            <option value="delete">Deleted</option>
            <option value="upload">Uploads</option>
            <option value="message">Messages</option>
            <option value="review">Reviews</option>
          </select>
          <input
            type="text"
            placeholder="Filter by user..."
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="space-y-8">
        {Object.entries(groupedActivities).map(([date, dayActivities]) => (
          <div key={date}>
            <h3 className="text-sm font-medium text-gray-500 mb-4">{date}</h3>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="divide-y divide-gray-200">
                {dayActivities.map((activity, index) => {
                  const Icon = activityIcons[activity.type]
                  const colorClass = activityColors[activity.type]
                  
                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg ${colorClass}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-900">
                                <span className="font-medium">{activity.user}</span>
                                {' '}{activity.action}
                              </p>
                              {activity.details && (
                                <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-500">{getRelativeTime(activity.timestamp)}</p>
                              {activity.ipAddress && (
                                <p className="text-xs text-gray-400 mt-1">{activity.ipAddress}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No activities found for the selected filters</p>
        </div>
      )}
    </div>
  )
}