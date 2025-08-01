'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, Maximize2, Play } from 'lucide-react'
import type { VideoContent } from '@/lib/cms'
import StandardButton from '@/components/ui/standard-button'

gsap.registerPlugin(ScrollTrigger)

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

export default function VideoCarousel({ videos }: VideoCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    
    intervalRef.current = setInterval(() => {
      setCurrentVideoIndex((prev) => {
        const nextIndex = (prev + 1) % videoReels.length
        return nextIndex
      })
    }, 4000) // 4 seconds per video
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
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const playCurrentVideo = useCallback(() => {
    const currentVideo = videoRefs.current[currentVideoIndex]
    if (currentVideo) {
      // Pause all other videos and reset
      videoRefs.current.forEach((video, index) => {
        if (video && index !== currentVideoIndex) {
          video.pause()
          video.currentTime = 0
        }
      })
      
      // Hide thumbnails and play current video
      setShowThumbnails(false)
      currentVideo.play().catch(console.error)
    }
  }, [currentVideoIndex])

  useEffect(() => {
    // Show thumbnails briefly when video changes, then start playing
    setShowThumbnails(true)
    const timer = setTimeout(() => {
      playCurrentVideo()
    }, 1000) // Show thumbnail for 1s before playing
    
    return () => clearTimeout(timer)
  }, [currentVideoIndex, playCurrentVideo])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true)
          startAutoPlay()
        } else {
          setIsPlaying(false)
          stopAutoPlay()
          // Pause all videos when section is not visible
          videoRefs.current.forEach(video => {
            if (video) {
              video.pause()
            }
          })
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      observer.disconnect()
      stopAutoPlay()
    }
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

  const handleVideoClick = (index: number, video: any) => {
    if (index === currentVideoIndex) {
      // If clicking on active video, open lightbox
      openLightbox(video.src)
    } else {
      // If clicking on side video, make it active
      setCurrentVideoIndex(index)
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-black overflow-hidden">
      <div className="relative container mx-auto px-4">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div className="mb-6">
            <span className="text-sm font-medium text-purple-400 tracking-[0.3em] uppercase">
              Patient Stories
            </span>
          </motion.div>
          
          <motion.h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-8 text-white leading-tight">
            <motion.span
              className="inline-block mr-4"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Real
            </motion.span>
            <motion.span
              className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Transformations
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Watch amazing smile transformations from our happy patients
          </motion.p>
        </motion.div>

        {/* Video Carousel Container */}
        <div className="relative" style={{ overflow: 'visible' }}>
          {/* Header with Navigation */}
          <div className="flex justify-between items-center mb-12">
            <motion.p 
              className="text-lg text-gray-300 font-light"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Real patient transformations
            </motion.p>
            
            <div className="flex items-center gap-6">
              {/* Video indicator dots */}
              <div className="flex gap-3">
                {videoReels.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                      index === currentVideoIndex 
                        ? 'w-8 h-3 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg' 
                        : 'w-3 h-3 bg-white/30 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {index === currentVideoIndex && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Auto-Playing Video Carousel */}
          <div className="relative h-[550px] md:h-[700px] flex justify-center items-center">
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: isMobile ? '800px' : '1000px', perspectiveOrigin: 'center center' }}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {videoReels.map((video, index) => {
                const isActive = index === currentVideoIndex
                const isPrev = index === (currentVideoIndex - 1 + videoReels.length) % videoReels.length
                const isNext = index === (currentVideoIndex + 1) % videoReels.length
                
                let xOffset = 0
                let scale = 0.7
                let opacity = 0.4
                let zIndex = 1
                let blur = 4
                let rotateY = 0
                
                if (isActive) {
                  xOffset = 0
                  scale = 1
                  opacity = 1
                  zIndex = 30
                  blur = 0
                  rotateY = 0
                } else if (isPrev) {
                  xOffset = isMobile ? -180 : -380
                  scale = isMobile ? 0.7 : 0.75
                  opacity = 1
                  zIndex = 20
                  blur = 0
                  rotateY = isMobile ? 20 : 30
                } else if (isNext) {
                  xOffset = isMobile ? 180 : 380
                  scale = isMobile ? 0.7 : 0.75
                  opacity = 1
                  zIndex = 20
                  blur = 0
                  rotateY = isMobile ? -20 : -30
                } else {
                  // Hide other cards
                  opacity = 0
                  scale = 0.5
                  zIndex = 1
                }
                
                const isVisible = isActive || isPrev || isNext
                
                return (
                  <motion.div
                    key={video.id}
                    className={`video-carousel-card absolute ${
                      !isVisible ? 'opacity-0 pointer-events-none' : ''
                    }`}
                    animate={{
                      x: xOffset,
                      scale: scale,
                      opacity: opacity,
                      filter: `blur(${blur}px)`,
                      rotateY: rotateY
                    }}
                    transition={{ 
                      duration: isMobile ? 0.3 : 0.5, 
                      ease: [0.32, 0.72, 0, 1]
                    }}
                    style={{
                      zIndex,
                      transformStyle: 'preserve-3d',
                      WebkitTransformStyle: 'preserve-3d',
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)'
                    }}
                    onClick={() => handleVideoClick(index, video)}
                  >
                    <div className={`relative aspect-[9/16] w-[200px] md:w-[280px] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black group cursor-pointer transition-all duration-300`}
                      style={{
                        boxShadow: isActive 
                          ? '0 30px 80px rgba(147,51,234,0.4), 0 15px 40px rgba(147,51,234,0.3)' 
                          : isPrev || isNext 
                            ? '0 20px 50px rgba(0,0,0,0.6)' 
                            : '0 10px 30px rgba(0,0,0,0.4)'
                      }}
                    >
                      {/* Thumbnail Overlay */}
                      <motion.div
                        className="absolute inset-0 z-20"
                        animate={{ 
                          opacity: (showThumbnails || !isActive) ? 1 : 0 
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${video.thumbnail})`
                          }}
                        />
                        
                        {/* Play Button for thumbnails, Click indicator for active */}
                        {isActive && (
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center bg-black/30"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                          >
                            {showThumbnails ? (
                              <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 shadow-xl">
                                <motion.div
                                  animate={{ scale: [1, 1.1, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center ml-1">
                                    <div className="w-0 h-0 border-l-[10px] border-l-black border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                                  </div>
                                </motion.div>
                              </div>
                            ) : (
                              <motion.div
                                className="text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Maximize2 className="w-8 h-8 mx-auto mb-2" />
                                <p className="text-sm font-medium">Click to expand</p>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Video Element */}
                      <video
                        ref={(el) => { videoRefs.current[index] = el }}
                        className="w-full h-full object-cover relative z-10"
                        src={video.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />

                      {/* Click to expand indicator */}
                      {isActive && !showThumbnails && (
                        <motion.div
                          className="absolute top-4 right-4 z-40 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white pointer-events-none"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 0.7, scale: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Maximize2 className="w-5 h-5" />
                        </motion.div>
                      )}
                      
                      {/* Video Info Overlay */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/60 to-transparent z-30"
                        animate={{ opacity: isActive ? 1 : 0.7 }}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <motion.div 
                            className="w-8 h-8 bg-gradient-to-tr from-red-500 to-red-600 rounded-full p-0.5 shadow-lg"
                            animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                              <div className={`w-3 h-3 rounded-full ${
                                isActive && !showThumbnails ? 'bg-red-500 animate-pulse' : 'bg-white/60'
                              }`} />
                            </div>
                          </motion.div>
                          <span className="text-sm font-medium text-white tracking-wide">@happysmileclinics</span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-2">
                          {video.title}
                        </h3>
                        
                        <p className="text-sm text-gray-300 line-clamp-2">
                          {video.description}
                        </p>
                      </motion.div>

                      {/* Active Border Glow */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-3xl z-40 pointer-events-none"
                          animate={{
                            boxShadow: [
                              '0 0 0 2px rgba(255,255,255,0.2), 0 0 40px rgba(147,51,234,0.3)',
                              '0 0 0 2px rgba(255,255,255,0.4), 0 0 60px rgba(147,51,234,0.5)',
                              '0 0 0 2px rgba(255,255,255,0.2), 0 0 40px rgba(147,51,234,0.3)'
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
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{currentVideoIndex + 1}</span>
              <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-red-500 to-pink-500 rounded-full shadow-lg"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((currentVideoIndex + 1) / videoReels.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm text-gray-400">{videoReels.length}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <StandardButton className="text-lg">
            View All Treatments
          </StandardButton>
        </motion.div>
      </div>

      {/* Lightbox Modal - Vertical for mobile videos */}
      {isLightboxOpen && selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-sm w-full">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-12 right-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="aspect-[9/16] w-full rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                src={selectedVideo}
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  )
}