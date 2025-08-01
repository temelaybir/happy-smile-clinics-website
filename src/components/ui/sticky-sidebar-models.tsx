import { motion } from 'framer-motion'
import { Calendar, MessageCircle, Phone, Instagram } from 'lucide-react'
import Link from 'next/link'

const iconMap: { [key: string]: any } = {
  calendar: Calendar,
  message: MessageCircle,
  phone: Phone,
  instagram: Instagram
}

interface StickyItem {
  id: string
  label: string
  icon: string
  action: string
  value: string
  enabled: boolean
}

interface ModelProps {
  items: StickyItem[]
  onItemClick: (item: StickyItem) => void
  isLink: (item: StickyItem) => boolean
}

// Model 1: Gradient Circles with Labels
export const GradientCirclesModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="bg-gray-900/95 backdrop-blur-sm rounded-l-2xl shadow-2xl p-2">
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        const content = (
          <motion.div
            key={item.id}
            className="group relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-300 font-medium whitespace-nowrap">
                {item.label}
              </span>
            </button>
          </motion.div>
        )
        
        return isLink(item) ? (
          <Link key={item.id} href={item.value}>
            {content}
          </Link>
        ) : content
      })}
    </div>
  </div>
)

// Model 2: Minimal Icons Only
export const MinimalIconsModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="bg-white/10 backdrop-blur-md rounded-l-full shadow-xl p-2">
    <div className="flex flex-col gap-2">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        return (
          <motion.div
            key={item.id}
            className="group relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, type: "spring" }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all group-hover:scale-110"
            >
              <Icon className="w-5 h-5 text-white" />
            </button>
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
              <div className="bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                {item.label}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-0 h-0 border-l-8 border-l-black border-t-8 border-t-transparent border-b-8 border-b-transparent" />
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  </div>
)

// Model 3: Colorful Badges
export const ColorfulBadgesModel = ({ items, onItemClick, isLink }: ModelProps) => {
  const colors = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-purple-500 to-pink-500',
    'from-orange-500 to-red-500'
  ]
  
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        const colorClass = colors[index % colors.length]
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className={`group relative bg-gradient-to-r ${colorClass} rounded-l-full pl-4 pr-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium text-sm">
                  {item.label}
                </span>
              </div>
            </button>
          </motion.div>
        )
      })}
    </div>
  )
}

// Model 4: Glassmorphism Cards
export const GlassmorphismModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="p-2">
    <div className="flex flex-col gap-3">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white font-light">{item.label}</span>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )
      })}
    </div>
  </div>
)

// Model 5: Floating Bubbles
export const FloatingBubblesModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="relative h-64">
    {items.map((item, index) => {
      const Icon = iconMap[item.icon] || MessageCircle
      const positions = [
        { top: '0%', right: '0%' },
        { top: '25%', right: '20%' },
        { top: '50%', right: '0%' },
        { top: '75%', right: '20%' }
      ]
      const position = positions[index % positions.length]
      
      return (
        <motion.div
          key={item.id}
          className="absolute"
          style={position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.1,
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <motion.button
            onClick={() => !isLink(item) && onItemClick(item)}
            className="group relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center"
            whileHover={{ scale: 1.2 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                repeatDelay: index * 0.5,
                ease: "easeInOut"
              }
            }}
          >
            <Icon className="w-6 h-6 text-white" />
            
            {/* Label on hover */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-white bg-black/80 px-2 py-1 rounded whitespace-nowrap">
                {item.label}
              </span>
            </div>
          </motion.button>
        </motion.div>
      )
    })}
  </div>
)

// Model 6: Neon Glow
export const NeonGlowModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="bg-black/80 backdrop-blur-xl rounded-l-3xl p-3 border-l-2 border-purple-500/50">
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        const glowColors = [
          'shadow-blue-500/50 hover:shadow-blue-500',
          'shadow-green-500/50 hover:shadow-green-500',
          'shadow-purple-500/50 hover:shadow-purple-500',
          'shadow-pink-500/50 hover:shadow-pink-500'
        ]
        const glowColor = glowColors[index % glowColors.length]
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className={`group relative w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg ${glowColor} transition-all hover:scale-110`}
            >
              <Icon className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )
      })}
    </div>
  </div>
)

// Model 7: Slide Out Labels
export const SlideOutLabelsModel = ({ items, onItemClick, isLink }: ModelProps) => (
  <div className="bg-gray-900/95 backdrop-blur-sm rounded-l-2xl shadow-2xl overflow-hidden">
    <div className="flex flex-col">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="group relative flex items-center px-4 py-4 hover:bg-gray-800 transition-all overflow-hidden"
            >
              <Icon className="w-5 h-5 text-white z-10" />
              <span className="absolute left-12 text-white font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                {item.label}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </motion.div>
        )
      })}
    </div>
  </div>
)

// Model 8: Glass-Minimal Hybrid (Improved)
export const GlassMinimalHybridModel = ({ items, onItemClick, isLink }: ModelProps) => {
  // Mobile layout - horizontal with dividers
  const mobileLayout = (
    <div className="md:hidden flex w-full bg-white/10 backdrop-blur-2xl rounded-xl overflow-hidden border border-white/20">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        const content = (
          <motion.div
            key={item.id}
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="w-full h-full py-3 px-2 flex flex-col items-center justify-center gap-1
                         hover:bg-white/10 transition-colors relative"
            >
              <Icon className="w-5 h-5 text-white/90" />
              <span className="text-white/90 font-light text-[10px] tracking-wide">
                {item.label}
              </span>
              {index < items.length - 1 && (
                <div className="absolute right-0 top-1/4 bottom-1/4 w-px bg-white/20" />
              )}
            </button>
          </motion.div>
        )
        
        return isLink(item) ? (
          <Link key={item.id} href={item.value} className="flex-1">
            {content}
          </Link>
        ) : content
      })}
    </div>
  )
  
  // Desktop layout - vertical badges
  const desktopLayout = (
    <div className="hidden md:flex flex-col gap-2">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon] || MessageCircle
        const content = (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => !isLink(item) && onItemClick(item)}
              className="group relative bg-white/10 backdrop-blur-2xl rounded-l-full 
                         pl-4 pr-6 py-3 shadow-lg hover:shadow-xl 
                         transform hover:scale-105 transition-all duration-300
                         border border-white/20 hover:border-white/30
                         hover:bg-white/15 min-w-[160px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full 
                                flex items-center justify-center group-hover:bg-white/30 
                                transition-colors border border-white/30">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-light text-sm tracking-wide">
                  {item.label}
                </span>
              </div>
              
              {/* Glass overlay effect */}
              <div className="absolute inset-0 rounded-l-full bg-gradient-to-r 
                              from-white/10 via-white/5 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </motion.div>
        )
        
        return isLink(item) ? (
          <Link key={item.id} href={item.value}>
            {content}
          </Link>
        ) : content
      })}
    </div>
  )
  
  return (
    <>
      {mobileLayout}
      {desktopLayout}
    </>
  )
}

export const stickyModels = {
  gradient: { name: 'Gradient Circles', component: GradientCirclesModel },
  minimal: { name: 'Minimal Icons', component: MinimalIconsModel },
  badges: { name: 'Colorful Badges', component: ColorfulBadgesModel },
  glass: { name: 'Glassmorphism', component: GlassmorphismModel },
  bubbles: { name: 'Floating Bubbles', component: FloatingBubblesModel },
  neon: { name: 'Neon Glow', component: NeonGlowModel },
  slideout: { name: 'Slide Out Labels', component: SlideOutLabelsModel },
  glassminimal: { name: 'Glass Minimal', component: GlassMinimalHybridModel }
}