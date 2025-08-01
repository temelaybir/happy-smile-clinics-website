'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Play } from 'lucide-react'
import type { VideoContent } from '@/lib/cms'
import StandardButton from '@/components/ui/standard-button'

interface VideoCarouselProps {
  videos: VideoContent[]
}

// Video Data - MP4 files
const videoReels = [
  {
    id: 'video-1',
    src: '/videos/1.mp4',
    title: 'Smile Transformation',
    description: 'Amazing smile makeover results',
    thumbnail: '/images/video-thumbnails/thumb-1.jpg'
  },
  {
    id: 'video-2',
    src: '/videos/2.mp4',
    title: 'Before & After',
    description: 'Incredible dental transformation',
    thumbnail: '/images/video-thumbnails/thumb-2.jpg'
  },
  {
    id: 'video-3',
    src: '/videos/3.mp4',
    title: 'Veneers Process',
    description: 'Step by step veneer application',
    thumbnail: '/images/video-thumbnails/thumb-3.jpg'
  },
  {
    id: 'video-4',
    src: '/videos/4.mp4',
    title: 'Patient Journey',
    description: 'Complete smile restoration story',
    thumbnail: '/images/video-thumbnails/thumb-4.jpg'
  },
  {
    id: 'video-5',
    src: '/videos/5.mp4',
    title: 'Dental Implants',
    description: 'All-on-4 implant procedure',
    thumbnail: '/images/video-thumbnails/thumb-5.jpg'
  },
  {
    id: 'video-6',
    src: '/videos/6.mp4',
    title: 'Full Mouth Reconstruction',
    description: 'Complete oral rehabilitation',
    thumbnail: '/images/video-thumbnails/thumb-6.jpg'
  },
  {
    id: 'video-7',
    src: '/videos/7.mp4',
    title: 'Hollywood Smile',
    description: 'Premium veneer transformation',
    thumbnail: '/images/video-thumbnails/thumb-7.jpg'
  }
]

export default function VideoCarouselSimple({ videos }: VideoCarouselProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoReels.length)
    }, 4000) // 4 seconds per video
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])

  const openLightbox = (videoSrc: string) => {
    setSelectedVideo(videoSrc)
    setIsLightboxOpen(true)
    stopAutoPlay()
  }

  const closeLightbox = () => {
    setSelectedVideo(null)
    setIsLightboxOpen(false)
    startAutoPlay()
  }

  const handleVideoClick = (index: number) => {
    if (index === currentVideoIndex) {
      openLightbox(videoReels[index].src)
    } else {
      setCurrentVideoIndex(index)
    }
  }

  return (
    <section className="relative py-24 bg-black overflow-hidden">
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-sm font-medium text-purple-400 tracking-[0.3em] uppercase">
              Patient Stories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light mb-8 text-white">
            Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Transformations</span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch amazing smile transformations from our happy patients
          </p>
        </div>

        {/* Simple Video Carousel */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mb-8">
            {videoReels.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideoIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentVideoIndex 
                    ? 'w-8 bg-gradient-to-r from-purple-500 to-pink-500' 
                    : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Video Display */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {videoReels.map((video, index) => {
              const isActive = index === currentVideoIndex
              const offset = (index - currentVideoIndex + videoReels.length) % videoReels.length
              const isVisible = offset === 0 || offset === 1 || offset === videoReels.length - 1
              
              if (!isVisible) return null
              
              return (
                <motion.div
                  key={video.id}
                  onClick={() => handleVideoClick(index)}
                  className={`relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isActive ? 'md:scale-110 z-10' : 'opacity-70 hover:opacity-100'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Thumbnail */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  
                  {/* Play Button */}
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center"
                      >
                        <Play className="w-6 h-6 text-white ml-1" />
                      </motion.div>
                    </div>
                  )}
                  
                  {/* Video Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-white font-medium mb-1">{video.title}</h3>
                    <p className="text-gray-300 text-sm">{video.description}</p>
                  </div>
                  
                  {/* Active Border */}
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-purple-500 rounded-2xl pointer-events-none" />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center mt-8">
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{ width: `${((currentVideoIndex + 1) / videoReels.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <StandardButton className="text-lg">
            View All Treatments
          </StandardButton>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-sm w-full">
            <button
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                src={selectedVideo}
              />
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}