'use client'

import Image from 'next/image'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const CAROUSEL_IMAGES = [
  {
    id: 1,
    src: '/images/carousel/carousel-1.webp',
    alt: 'Dental Treatment 1'
  },
  {
    id: 2,
    src: '/images/carousel/carousel-2.webp',
    alt: 'Dental Treatment 2'
  },
  {
    id: 3,
    src: '/images/carousel/carousel-3.webp',
    alt: 'Dental Treatment 3'
  },
  {
    id: 4,
    src: '/images/carousel/carousel-4.jpg',
    alt: 'Dental Treatment 4'
  },
  {
    id: 5,
    src: '/images/carousel/carousel-5.webp',
    alt: 'Dental Treatment 5'
  },
  {
    id: 6,
    src: '/images/carousel/carousel-6.webp',
    alt: 'Dental Treatment 6'
  }
]

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1536 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1
  }
}

export default function ImageCarousel() {
  return (
    <div className="w-full h-full">
      <Carousel
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000}
        swipeable={true}
        draggable={true}
        showDots={false}
        arrows={false}
        customTransition="transform 800ms ease-in-out"
        transitionDuration={800}
        containerClass="w-full h-full"
        itemClass="w-full h-full"
      >
        {CAROUSEL_IMAGES.map((image) => (
          <div key={image.id} className="relative w-full h-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover rounded-3xl"
              sizes="(max-width: 768px) 100vw, 100vw"
              priority={image.id === 1}
            />
          </div>
        ))}
      </Carousel>
    </div>
  )
}