'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

export default function AboutPreviewSimple() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 via-transparent to-gray-900/20" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Small Label */}
            <div>
              <span className="text-xs font-light text-gray-500 tracking-[0.3em] uppercase">
                Istanbul's Premier Dental Clinic
              </span>
            </div>

            {/* Section Title */}
            <div className="mb-6">
              <h2 className="text-4xl md:text-5xl font-light text-white/90 mb-4">
                About Happy Smile
              </h2>
              <div className="w-24 h-px bg-gradient-to-r from-white/60 via-white/20 to-transparent"></div>
            </div>

            {/* Subtitle */}
            <div>
              <h3 className="text-xl md:text-2xl font-light text-gray-300/90 leading-relaxed">
                Where Excellence Meets Innovation in Dental Care
              </h3>
            </div>

            {/* Description */}
            <div className="max-w-lg">
              <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
                Happy Smile Clinics stands as Istanbul's most prestigious dental destination, 
                where state-of-the-art technology meets unparalleled expertise. Our world-class 
                facility combines luxury, innovation, and compassionate care to deliver 
                transformative results for patients from over 50 countries.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div>
                <div className="text-2xl md:text-3xl font-light text-white">50+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Countries</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-white">12K+</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">sqft Facility</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-light text-white">24/7</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">Support</div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link href="/about-us">
                <motion.div 
                  className="group inline-flex items-center gap-4 cursor-pointer"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white font-light tracking-wider">Explore Our Clinic</span>
                  <div className="w-12 h-px bg-white/30 group-hover:bg-white/60 transition-all duration-300" />
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Background Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/clinic-interior.jpg"
                alt="Happy Smile Clinics Interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Clinic Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/90 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="text-xl font-light text-white/90 mb-3">
                International Excellence
              </h3>
              <div className="text-white/70 text-sm font-light leading-relaxed space-y-1">
                <div>• Digital Dental Technology</div>
                <div>• All on Four & All on Six Implants</div>
                <div>• Advanced Smile Design</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl font-light text-gray-400 italic">
            "Setting the standard for cosmetic dentistry in Europe and beyond"
          </p>
        </motion.div>
      </div>
    </section>
  )
}