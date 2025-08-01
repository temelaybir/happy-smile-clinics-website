'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Video,
  Star,
  Instagram,
  Users,
  Image,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Activity,
  Mail,
  BarChart,
  Palette,
  Edit3,
  BookOpen
} from 'lucide-react'

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/homepage', label: 'Homepage Content', icon: Home },
  { href: '/admin/pages', label: 'Page Editor', icon: Edit3 },
  { href: '/admin/dental-implants', label: 'Dental Implants', icon: FileText },
  { href: '/admin/about-us', label: 'About Us', icon: FileText },
  { href: '/admin/all-on-four', label: 'All-on-4', icon: FileText },
  { href: '/admin/veneers', label: 'Veneers', icon: FileText },
  { href: '/admin/videos', label: 'Hero Videos', icon: Video },
  { href: '/admin/hero-background', label: 'Hero Backgrounds', icon: Palette },
  { href: '/admin/reviews', label: 'Reviews', icon: Star },
  { href: '/admin/instagram', label: 'Instagram Videos', icon: Instagram },
  { href: '/admin/results', label: 'Patient Results', icon: Users },
  { href: '/admin/media', label: 'Media Library', icon: Image },
  { href: '/admin/blog', label: 'Blog Posts', icon: BookOpen },
  { href: '/admin/contact', label: 'Contact Forms', icon: Mail },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
  { href: '/admin/activity', label: 'Activity Logs', icon: Activity },
  { href: '/admin/sticky-sidebar', label: 'Sticky Sidebar', icon: Menu },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    // Temporarily set a dummy user for development
    setUser({
      id: 'admin-user',
      email: 'admin@happysmileclinics.com',
      name: 'Admin User'
    })
    
    // TODO: Re-enable auth after fixing database issues
    // fetch('/api/auth/me')
    //   .then(res => {
    //     if (!res.ok) throw new Error('Not authenticated')
    //     return res.json()
    //   })
    //   .then(data => setUser(data))
    //   .catch(() => router.push('/login'))
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'tween' }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 text-white z-40"
          >
            <div className="p-6">
              <h1 className="text-2xl font-bold">CMS Admin</h1>
              <p className="text-sm text-gray-400 mt-1">Happy Smile Clinics</p>
            </div>

            <nav className="px-4">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg mb-1
                      transition-all duration-200
                      ${isActive 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-medium">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="mt-3 flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : ''}`}>
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}