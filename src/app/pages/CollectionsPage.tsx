import { useState } from 'react'
import { motion } from 'motion/react'
import { ProductCard } from '../components/ProductCard'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { PRODUCTS, COLLECTIONS } from '../data/products'
import { Footer } from '../components/Footer'

const CATEGORIES = ['All', 'Seating', 'Tables', 'Lighting']

export function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-20 px-8 md:px-16 bg-[#F7F4F0]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            The Collection
          </span>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.08, marginBottom: '1.2rem' }}>
            Every Piece,<br /><em>Considered</em>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#7A7269', maxWidth: '480px' }}>
            240 artisan pieces. Each one designed to outlast trends and become a fixture in the home — not a feature.
          </p>
        </motion.div>
      </section>

      {/* Curated Rooms */}
      <section className="px-8 md:px-16 pb-24 bg-[#F7F4F0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COLLECTIONS.map((col, i) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden cursor-pointer" style={{ aspectRatio: '3/4' }}>
              <ImageWithFallback src={col.imageUrl} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(28,25,23,0.75) 0%, transparent 55%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', color: 'rgba(247,244,240,0.7)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {col.subtitle}
                </p>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', fontWeight: 500, color: '#F7F4F0', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                  {col.title}
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: '1.65', color: 'rgba(247,244,240,0.65)', maxWidth: '240px' }}>
                  {col.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, color: '#1C1917' }}>
            All Pieces
          </h2>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 transition-colors"
                style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                  backgroundColor: activeCategory === cat ? '#1C1917' : 'transparent',
                  color: activeCategory === cat ? '#F7F4F0' : '#6B6358',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#1C1917' : '#D4CFC8',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((product, i) => (
            <motion.div key={product.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.06 }}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
