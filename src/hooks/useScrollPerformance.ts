import { useEffect } from 'react'

export function useScrollPerformance() {
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0

    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      
      if (scrollY > lastScrollY) {
        document.body.classList.add('scrolling-down')
        document.body.classList.remove('scrolling-up')
      } else {
        document.body.classList.add('scrolling-up')
        document.body.classList.remove('scrolling-down')
      }
      
      lastScrollY = scrollY
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection)
        ticking = true
      }
    }

    // Passive event listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true })

    // Optimize images in viewport
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[loading="lazy"]')
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            img.loading = 'eager'
            imageObserver.unobserve(img)
          }
        })
      }, {
        rootMargin: '50px'
      })

      images.forEach(img => imageObserver.observe(img))
    }

    // Run optimization after initial load
    const timer = setTimeout(optimizeImages, 2000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      clearTimeout(timer)
    }
  }, [])
}