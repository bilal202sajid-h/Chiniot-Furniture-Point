import { useEffect } from 'react'
import { useLocation, Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '../components/HeroSection'
import { ProductCard } from '../components/ProductCard'
import { Footer } from '../components/Footer'
import { PRODUCTS } from '../data/products'

export function HomePage() {
  const location = useLocation()

  // Handle scroll-to from navigation
  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const featured = PRODUCTS.slice(0, 6)

  return (
    <>
      <HeroSection
        onExploreClick={() => scrollTo('collections')}
        onViewIn3DClick={() => scrollTo('viewer')}
      />

      {/* Featured Products */}
      <section id="collections" className="py-24 md:py-32 px-8 md:px-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            New Arrivals
          </span>
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.15 }}>
              Featured Pieces
            </h2>
            <Link to="/collections" className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.1em', color: '#6B6358', textTransform: 'uppercase' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featured.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Collections Banner */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-[#F7F4F0]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
            Curated Rooms
          </span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.15, marginBottom: '1.5rem' }}>
            Shop by Collection
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', lineHeight: '1.8', color: '#7A7269', marginBottom: '2rem' }}>
            Carefully assembled rooms for every corner of your home — each one anchored by a signature piece and built to last.
          </p>
          <Link to="/collections"
            className="inline-flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', padding: '1rem 2rem', textTransform: 'uppercase' }}>
            Explore Collections <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
