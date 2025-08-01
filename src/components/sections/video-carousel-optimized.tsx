'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { X, Maximize2 } from 'lucide-react'
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

export default function VideoCarouselOptimized({ videos }: VideoCarouselProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoReels.length)
    }, 5000) // 5 seconds total (3s video + 2s pause)
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    startAutoPlay()
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      stopAutoPlay()
    }
  }, [startAutoPlay, stopAutoPlay])

  // Play video for 3 seconds when index changes
  useEffect(() => {
    let playTimeout: NodeJS.Timeout | null = null
    let stopTimeout: NodeJS.Timeout | null = null
    
    const playVideo = async () => {
      const currentVideo = videoRefs.current[currentVideoIndex]
      if (currentVideo) {
        try {
          // Stop all other videos first
          await Promise.all(
            videoRefs.current.map(async (video, index) => {
              if (video && index !== currentVideoIndex) {
                video.pause()
                video.currentTime = 0
              }
            })
          )
          
          // Small delay to ensure previous operations complete
          playTimeout = setTimeout(async () => {
            try {
              setIsPlaying(true)
              currentVideo.currentTime = 0
              await currentVideo.play()
              
              // Stop after 3 seconds
              stopTimeout = setTimeout(() => {
                currentVideo.pause()
                setIsPlaying(false)
              }, 3000)
            } catch (error) {
              // Ignore play interruption errors
              if (error instanceof Error && !error.message.includes('interrupted')) {
                console.error('Video play error:', error)
              }
              setIsPlaying(false)
            }
          }, 100)
        } catch (error) {
          console.error('Video setup error:', error)
          setIsPlaying(false)
        }
      }
    }
    
    playVideo()
    
    return () => {
      if (playTimeout) clearTimeout(playTimeout)
      if (stopTimeout) clearTimeout(stopTimeout)
      const currentVideo = videoRefs.current[currentVideoIndex]
      if (currentVideo) {
        currentVideo.pause()
        setIsPlaying(false)
      }
    }
  }, [currentVideoIndex])

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

  const handleVideoClick = (index: number, video: any) => {
    if (index === currentVideoIndex) {
      openLightbox(video.src)
    } else {
      setCurrentVideoIndex(index)
    }
  }

  return (
    <section className="relative py-20 bg-black overflow-hidden">
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mb-6">
            <span className="text-sm font-medium text-purple-400 tracking-[0.3em] uppercase">
              Patient Stories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-light mb-8 text-white">
            Real{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              Transformations
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Watch amazing smile transformations from our happy patients
          </p>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-3 mb-12">
          {videoReels.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* 3D Video Carousel */}
        <div className="relative h-[550px] md:h-[700px] flex justify-center items-center">
          <div 
            className="relative w-full h-full flex items-center justify-center" 
            style={{ 
              perspective: isMobile ? '800px' : '1000px',
              transformStyle: 'preserve-3d'
            }}
          >
            {videoReels.map((video, index) => {
              const isActive = index === currentVideoIndex
              const isPrev = index === (currentVideoIndex - 1 + videoReels.length) % videoReels.length
              const isNext = index === (currentVideoIndex + 1) % videoReels.length
              
              // Only render 3 cards for performance
              if (!isActive && !isPrev && !isNext) return null
              
              let transform = ''
              let opacity = 1
              let zIndex = 1
              
              if (isActive) {
                transform = 'translateX(0) translateZ(0) rotateY(0deg) scale(1)'
                zIndex = 30
              } else if (isPrev) {
                transform = `translateX(${isMobile ? -60 : -80}%) translateZ(-200px) rotateY(${isMobile ? 25 : 30}deg) scale(0.8)`
                zIndex = 20
              } else if (isNext) {
                transform = `translateX(${isMobile ? 60 : 80}%) translateZ(-200px) rotateY(${isMobile ? -25 : -30}deg) scale(0.8)`
                zIndex = 20
              }
              
              return (
                <motion.div
                  key={video.id}
                  className="absolute"
                  animate={{
                    transform,
                    opacity
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  style={{
                    zIndex,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => handleVideoClick(index, video)}
                >
                  <div 
                    className="relative aspect-[9/16] w-[200px] md:w-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black cursor-pointer"
                    style={{
                      boxShadow: isActive 
                        ? '0 30px 60px rgba(147,51,234,0.3)' 
                        : '0 20px 40px rgba(0,0,0,0.4)'
                    }}
                  >
                    {/* Thumbnail */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${video.thumbnail})` }}
                    />
                    
                    {/* Video overlay for active item */}
                    {isActive && (
                      <>
                        <video
                          ref={(el) => { videoRefs.current[index] = el }}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isPlaying ? 'opacity-100' : 'opacity-0'
                          }`}
                          src={video.src}
                          muted
                          playsInline
                          preload="metadata"
                        />
                      </>
                    )}
                    
                    {/* Play/Expand Indicator for active video */}
                    {isActive && !isPlaying && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Maximize2 className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Video Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full ${
                          isActive && isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/60'
                        }`} />
                        <span className="text-xs text-white">@happysmileclinics</span>
                      </div>
                      <h3 className="text-sm font-medium text-white mb-1">{video.title}</h3>
                      <p className="text-xs text-gray-300 line-clamp-1">{video.description}</p>
                    </div>

                    {/* Active Border */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            'inset 0 0 0 2px rgba(168,85,247,0.5)',
                            'inset 0 0 0 2px rgba(236,72,153,0.5)',
                            'inset 0 0 0 2px rgba(168,85,247,0.5)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex justify-center mt-8">
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              animate={{ width: `${((currentVideoIndex + 1) / videoReels.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
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
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30"
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="aspect-[9/16] w-full rounded-2xl overflow-hidden">
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