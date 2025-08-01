'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Eye, MessageSquare, Calendar, ArrowUp, ArrowDown, BarChart3 } from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalVisitors: number
    totalPageViews: number
    totalMessages: number
    totalReviews: number
    visitorsTrend: number
    pageViewsTrend: number
    messagesTrend: number
    reviewsTrend: number
  }
  dailyStats: {
    date: string
    visitors: number
    pageViews: number
    messages: number
  }[]
  topPages: {
    path: string
    views: number
    percentage: number
  }[]
  topCountries: {
    country: string
    visitors: number
    percentage: number
  }[]
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7d')

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/admin/analytics?range=${dateRange}`)
      const analyticsData = await response.json()
      setData(analyticsData)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-600">Loading analytics...</div>
      </div>
    )
  }

  const statCards = [
    {
      title: 'Total Visitors',
      value: data.overview.totalVisitors.toLocaleString(),
      trend: data.overview.visitorsTrend,
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Page Views',
      value: data.overview.totalPageViews.toLocaleString(),
      trend: data.overview.pageViewsTrend,
      icon: Eye,
      color: 'green'
    },
    {
      title: 'Messages',
      value: data.overview.totalMessages.toLocaleString(),
      trend: data.overview.messagesTrend,
      icon: MessageSquare,
      color: 'purple'
    },
    {
      title: 'Reviews',
      value: data.overview.totalReviews.toLocaleString(),
      trend: data.overview.reviewsTrend,
      icon: TrendingUp,
      color: 'orange'
    }
  ]

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    }
    return colors[color as keyof typeof colors]
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-2">Monitor your website performance and user engagement</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
          <option value="1y">Last year</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${getColorClass(stat.color)}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(stat.trend)}%
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Daily Statistics
          </h3>
          <div className="h-64 flex items-end gap-2">
            {data.dailyStats.map((day, index) => {
              const maxViews = Math.max(...data.dailyStats.map(d => d.pageViews))
              const height = (day.pageViews / maxViews) * 100
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors relative group"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {day.pageViews} views
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Countries</h3>
          <div className="space-y-4">
            {data.topCountries.map((country, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-900">{country.country}</span>
                  <span className="text-sm text-gray-600">{country.visitors}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Page
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Views
                </th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider pb-3">
                  Percentage
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.topPages.map((page, index) => (
                <tr key={index}>
                  <td className="py-3 text-sm text-gray-900">{page.path}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{page.views.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-600 text-right">{page.percentage}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}