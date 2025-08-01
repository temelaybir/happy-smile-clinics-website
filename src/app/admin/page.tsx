'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users,
  Video,
  Star,
  Instagram,
  FileText,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
  Activity,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  Menu
} from 'lucide-react'

interface DashboardStats {
  totalReviews: number
  totalVideos: number
  totalResults: number
  totalPosts: number
  recentContacts: number
  totalViews: number
}

interface RecentActivity {
  id: string
  type: 'review' | 'video' | 'blog' | 'contact' | 'result'
  action: string
  user: string
  timestamp: string
  status: 'success' | 'pending' | 'error'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
      
      // Mock recent activities for now
      setRecentActivities([
        { id: '1', type: 'review', action: 'New 5-star review added', user: 'Admin', timestamp: '2 hours ago', status: 'success' },
        { id: '2', type: 'video', action: 'Hero video updated', user: 'Admin', timestamp: '5 hours ago', status: 'success' },
        { id: '3', type: 'contact', action: 'New contact form submission', user: 'System', timestamp: '6 hours ago', status: 'pending' },
        { id: '4', type: 'blog', action: 'Blog post published', user: 'Admin', timestamp: '1 day ago', status: 'success' },
        { id: '5', type: 'result', action: 'Patient result added', user: 'Admin', timestamp: '2 days ago', status: 'success' }
      ])
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Use mock data if API fails
      setStats({
        totalReviews: 156,
        totalVideos: 12,
        totalResults: 48,
        totalPosts: 34,
        recentContacts: 23,
        totalViews: 15420
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      label: 'Total Reviews',
      value: stats?.totalReviews || 0,
      icon: Star,
      color: 'bg-yellow-500',
      change: '+12%'
    },
    {
      label: 'Hero Videos',
      value: stats?.totalVideos || 0,
      icon: Video,
      color: 'bg-blue-500',
      change: '+5%'
    },
    {
      label: 'Patient Results',
      value: stats?.totalResults || 0,
      icon: Users,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      label: 'Blog Posts',
      value: stats?.totalPosts || 0,
      icon: FileText,
      color: 'bg-purple-500',
      change: '+8%'
    },
    {
      label: 'Recent Contacts',
      value: stats?.recentContacts || 0,
      icon: MessageSquare,
      color: 'bg-red-500',
      change: '+25%'
    },
    {
      label: 'Total Views',
      value: stats?.totalViews || 0,
      icon: Eye,
      color: 'bg-indigo-500',
      change: '+15%'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your clinic.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2 text-gray-900">{stat.value.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{stat.change}</span>
                    </div>
                    <span className="text-xs text-gray-500">vs last month</span>
                  </div>
                </div>
                <div className="relative">
                  <div className={`${stat.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/reviews" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Star className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Add Review</span>
            </div>
          </Link>
          <Link href="/admin/videos" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Video className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Upload Video</span>
            </div>
          </Link>
          <Link href="/admin/results" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Users className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Add Result</span>
            </div>
          </Link>
          <Link href="/admin/homepage" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Eye className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Homepage</span>
            </div>
          </Link>
          <Link href="/admin/blog" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <FileText className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">New Post</span>
            </div>
          </Link>
          <Link href="/admin/pages" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <FileText className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Edit Pages</span>
            </div>
          </Link>
          <Link href="/admin/settings" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Settings className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Settings</span>
            </div>
          </Link>
          <Link href="/admin/sticky-sidebar" className="group">
            <div className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all">
              <Menu className="w-6 h-6 mx-auto mb-2 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm text-gray-700 group-hover:text-gray-900">Sticky Sidebar</span>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Recent Activity & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Link href="/admin/activity" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => {
              const statusIcons = {
                success: <CheckCircle className="w-5 h-5 text-green-500" />,
                pending: <Clock className="w-5 h-5 text-yellow-500" />,
                error: <AlertCircle className="w-5 h-5 text-red-500" />
              }
              
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  {statusIcons[activity.status]}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.timestamp}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Performance Overview</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Website Traffic</span>
                <span className="font-medium text-gray-900">87%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-medium text-gray-900">64%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Patient Satisfaction</span>
                <span className="font-medium text-gray-900">95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Content Engagement</span>
                <span className="font-medium text-gray-900">72%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}