import Header from "@/components/layout/header"
import Footer from "@/components/sections/footer"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-thin text-white mb-4">404</h1>
          <h2 className="text-2xl font-light text-gray-300 mb-6">Page Not Found</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <Button className="bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white hover:text-black px-8 py-4 text-sm uppercase tracking-wider font-light transition-all duration-500 group">
              <ArrowLeft className="mr-3 w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500" />
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}