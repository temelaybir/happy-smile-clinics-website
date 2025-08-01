'use client'

import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Star, MapPin, Calendar, User, Award, Filter, Grid, List } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const filters = [
  'All Results',
  'Dental Implants',
  'All-on-4',
  'Veneers',
  'Smile Design',
  'Crowns & Bridges'
]

const resultsData = [
  {
    id: 1,
    patientName: "Sarah M.",
    age: 34,
    location: "London, UK",
    treatment: "Porcelain Veneers",
    procedures: ["8 Upper Veneers", "Whitening", "Gum Contouring"],
    duration: "2 weeks",
    beforeImage: "/images/gallery/1.jpg",
    afterImage: "/images/gallery/2.jpg",
    rating: 5,
    testimonial: "Absolutely life-changing experience! My confidence has skyrocketed.",
    category: "Veneers",
    featured: true
  },
  {
    id: 2,
    patientName: "Michael K.",
    age: 45,
    location: "New York, USA",
    treatment: "All-on-4 Implants",
    procedures: ["Full Upper Arch", "All-on-4 System", "Immediate Loading"],
    duration: "1 day surgery",
    beforeImage: "/images/gallery/3.jpg",
    afterImage: "/images/gallery/4.jpg",
    rating: 5,
    testimonial: "From no teeth to a perfect smile in one day. Incredible technology!",
    category: "All-on-4",
    featured: true
  },
  {
    id: 3,
    patientName: "Emma L.",
    age: 28,
    location: "Sydney, Australia",
    treatment: "Smile Design",
    procedures: ["6 Veneers", "Teeth Whitening", "Smile Makeover"],
    duration: "3 weeks",
    beforeImage: "/images/gallery/5.jpg",
    afterImage: "/images/gallery/6.jpg",
    rating: 5,
    testimonial: "Perfect results! Exactly what I dreamed of for my wedding.",
    category: "Smile Design",
    featured: false
  },
  {
    id: 4,
    patientName: "James P.",
    age: 52,
    location: "Toronto, Canada",
    treatment: "Dental Implants",
    procedures: ["4 Single Implants", "Bone Grafting", "Crown Placement"],
    duration: "6 months",
    beforeImage: "/images/gallery/7.jpg",
    afterImage: "/images/gallery/8.jpg",
    rating: 5,
    testimonial: "Natural feeling teeth that function perfectly. Worth every penny!",
    category: "Dental Implants",
    featured: false
  },
  {
    id: 5,
    patientName: "Lisa R.",
    age: 39,
    location: "Berlin, Germany",
    treatment: "Zirconia Crowns",
    procedures: ["6 Posterior Crowns", "Color Matching", "Bite Adjustment"],
    duration: "2 weeks",
    beforeImage: "/images/gallery/9.jpg",
    afterImage: "/images/gallery/10.jpg",
    rating: 5,
    testimonial: "Beautiful, strong crowns that look completely natural.",
    category: "Crowns & Bridges",
    featured: false
  },
  {
    id: 6,
    patientName: "David H.",
    age: 41,
    location: "Dubai, UAE",
    treatment: "Full Mouth Reconstruction",
    procedures: ["12 Veneers", "4 Crowns", "Gum Reshaping"],
    duration: "4 weeks",
    beforeImage: "/images/gallery/11.jpg",
    afterImage: "/images/gallery/12.jpg",
    rating: 5,
    testimonial: "Complete transformation! I look 10 years younger.",
    category: "Smile Design",
    featured: true
  }
]

export default function ResultsGalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('All Results')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredResults = selectedFilter === 'All Results' 
    ? resultsData 
    : resultsData.filter(result => result.category === selectedFilter)

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-black text-white overflow-hidden py-20">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(/images/hero/dental-patients-hero.webp)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <span className="text-sm font-medium text-blue-400 tracking-[0.3em] uppercase">
                Real Transformations
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="uppercase tracking-wider mb-6 text-white"
              style={{ 
                fontFamily: '"Poiret One", sans-serif', 
                fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
                fontWeight: '700',
                lineHeight: '1.1'
              }}
            >
              RESULTS GALLERY
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-200 leading-relaxed mb-8 text-xl max-w-3xl mx-auto"
              style={{ 
                fontFamily: '"Red Hat Text", sans-serif', 
                fontWeight: '300'
              }}
            >
              See the incredible transformations achieved by our patients. Real stories, real results, real confidence restored.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Book Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-3">
                Treatment Options
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Filters & Controls */}
        <section className="bg-white py-8 border-b">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <motion.button
                    key={filter}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </motion.button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-sm">
                  {filteredResults.length} Results
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <Card className="h-full bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Before/After Images */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="grid grid-cols-2 h-full">
                          <div className="relative group-hover:scale-105 transition-transform duration-500">
                            <Image
                              src={result.beforeImage}
                              alt="Before"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute top-3 left-3 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-medium">
                              Before
                            </div>
                          </div>
                          
                          <div className="relative group-hover:scale-105 transition-transform duration-500">
                            <Image
                              src={result.afterImage}
                              alt="After"
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">
                              After
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 transform -translate-x-1/2" />
                        
                        {/* Hover Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                        >
                          <div className="text-white text-center p-6">
                            <h4 className="font-semibold mb-2">Procedures Performed:</h4>
                            <ul className="text-sm space-y-1">
                              {result.procedures.map((procedure, i) => (
                                <li key={i} className="text-blue-300">• {procedure}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>

                        {/* Featured Badge */}
                        {result.featured && (
                          <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            <Award className="w-3 h-3 inline mr-1" />
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Patient Information */}
                      <CardContent className="p-6">
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {result.patientName}
                            </h3>
                            <div className="flex items-center gap-1">
                              {[...Array(result.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{result.age} years</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{result.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-500 text-sm font-medium">Treatment:</span>
                            <span className="text-blue-600 font-medium">{result.treatment}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Duration: {result.duration}</span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-600 text-sm italic leading-relaxed">
                            "{result.testimonial}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                            ✓ Verified Patient
                          </div>
                          <Button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredResults.map((result, index) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                          {/* Before/After Images */}
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                            <div className="grid grid-cols-2 h-full">
                              <div className="relative">
                                <Image
                                  src={result.beforeImage}
                                  alt="Before"
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute top-2 left-2 bg-red-500/90 text-white px-2 py-1 rounded text-xs">
                                  Before
                                </div>
                              </div>
                              <div className="relative">
                                <Image
                                  src={result.afterImage}
                                  alt="After"
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 50vw, 25vw"
                                />
                                <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded text-xs">
                                  After
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/50 transform -translate-x-1/2" />
                          </div>

                          {/* Patient Details */}
                          <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-2xl font-semibold text-gray-900">
                                {result.patientName}
                              </h3>
                              <div className="flex items-center gap-1">
                                {[...Array(result.rating)].map((_, i) => (
                                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Patient Info</p>
                                <p className="text-gray-700">{result.age} years • {result.location}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Treatment</p>
                                <p className="text-blue-600 font-medium">{result.treatment}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Duration</p>
                                <p className="text-gray-700">{result.duration}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 mb-1">Procedures</p>
                                <p className="text-gray-700">{result.procedures.join(', ')}</p>
                              </div>
                            </div>

                            <div className="mb-6">
                              <p className="text-gray-600 italic leading-relaxed">
                                "{result.testimonial}"
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                                ✓ Verified Patient
                              </div>
                              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                View Full Case Study
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="uppercase tracking-wider mb-6"
              style={{ 
                fontFamily: '"Poiret One", sans-serif', 
                fontSize: '2.5rem', 
                fontWeight: '700' 
              }}
            >
              Ready for Your Transformation?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl mb-8 text-blue-100"
              style={{ 
                fontFamily: '"Red Hat Text", sans-serif', 
                fontWeight: '300'
              }}
            >
              Join thousands of satisfied patients who have transformed their lives with our treatments. Your perfect smile is just a consultation away.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium"
              >
                Schedule Free Consultation
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-medium"
              >
                Download Treatment Guide
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
} 