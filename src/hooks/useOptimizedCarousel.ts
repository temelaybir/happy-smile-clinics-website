import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

interface UseOptimizedCarouselOptions extends EmblaOptionsType {
  autoplay?: boolean
  autoplayDelay?: number
  virtualSlides?: boolean
  preloadRange?: number
}

export const useOptimizedCarousel = (options: UseOptimizedCarouselOptions = {}) => {
  const {
    autoplay = true,
    autoplayDelay = 6000,
    virtualSlides = true,
    preloadRange = 2,
    ...emblaOptions
  } = options

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const [slidesInView, setSlidesInView] = useState<number[]>([])

  const plugins = autoplay ? [
    Autoplay({ 
      delay: autoplayDelay, 
      stopOnInteraction: false,
      stopOnMouseEnter: true
    })
  ] : []

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      skipSnaps: false,
      align: 'start',
      containScroll: 'trimSnaps',
      dragFree: false,
      speed: 10,
      ...emblaOptions
    },
    plugins
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index)
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const updateSlidesInView = useCallback(() => {
    if (!emblaApi) return
    
    const inView = emblaApi.slidesInView()
    const selected = emblaApi.selectedScrollSnap()
    
    // Calculate slides to preload
    const toPreload = new Set<number>()
    
    // Add visible slides
    inView.forEach(index => toPreload.add(index))
    
    // Add slides in preload range
    for (let i = 1; i <= preloadRange; i++) {
      const prevIndex = (selected - i + emblaApi.scrollSnapList().length) % emblaApi.scrollSnapList().length
      const nextIndex = (selected + i) % emblaApi.scrollSnapList().length
      toPreload.add(prevIndex)
      toPreload.add(nextIndex)
    }
    
    setSlidesInView(Array.from(toPreload))
  }, [emblaApi, preloadRange])

  useEffect(() => {
    if (!emblaApi) return

    onSelect()
    updateSlidesInView()
    setScrollSnaps(emblaApi.scrollSnapList())
    
    emblaApi.on('select', onSelect)
    emblaApi.on('slidesInView', updateSlidesInView)
    emblaApi.on('reInit', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('slidesInView', updateSlidesInView)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect, updateSlidesInView])

  // Performance optimization for touch events
  useEffect(() => {
    if (!emblaApi) return

    const handlePointerDown = () => {
      if (autoplay && emblaApi.plugins().autoplay) {
        emblaApi.plugins().autoplay.stop()
      }
    }

    const handlePointerUp = () => {
      if (autoplay && emblaApi.plugins().autoplay) {
        emblaApi.plugins().autoplay.play()
      }
    }

    emblaApi.on('pointerDown', handlePointerDown)
    emblaApi.on('pointerUp', handlePointerUp)

    return () => {
      emblaApi.off('pointerDown', handlePointerDown)
      emblaApi.off('pointerUp', handlePointerUp)
    }
  }, [emblaApi, autoplay])

  const shouldLoadSlide = useCallback((index: number) => {
    if (!virtualSlides) return true
    return slidesInView.includes(index)
  }, [virtualSlides, slidesInView])

  return {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    slidesInView,
    scrollPrev,
    scrollNext,
    scrollTo,
    shouldLoadSlide
  }
}