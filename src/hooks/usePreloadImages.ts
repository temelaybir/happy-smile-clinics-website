import { useEffect } from 'react'

export function usePreloadImages(images: string[]) {
  useEffect(() => {
    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = resolve
        img.onerror = reject
        img.src = src
      })
    }

    // Preload images in batches to avoid overwhelming the browser
    const batchSize = 3
    const preloadBatch = async (batch: string[]) => {
      try {
        await Promise.all(batch.map(preloadImage))
      } catch (error) {
        console.warn('Failed to preload some images:', error)
      }
    }

    const preloadAll = async () => {
      for (let i = 0; i < images.length; i += batchSize) {
        const batch = images.slice(i, i + batchSize)
        await preloadBatch(batch)
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }

    // Start preloading after initial render
    const timer = setTimeout(() => {
      preloadAll()
    }, 1000)

    return () => clearTimeout(timer)
  }, [images])
}