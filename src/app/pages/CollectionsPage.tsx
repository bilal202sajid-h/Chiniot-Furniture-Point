import { useState } from 'react'
import { motion } from 'motion/react'
import { ProductCard } from '../components/ProductCard'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { PRODUCTS, COLLECTIONS } from '../data/products'
import { Footer } from '../components/Footer'
import { easternFadeIn, easternFadeInWithDelay } from '../motion/presets'

const CATEGORIES = ['All', 'Beds', 'Sofas', 'Tables', 'Chairs', 'Wardrobes']

export function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-20 md:pt-48 pb-20 md:pb-32 px-6 md:px-16 bg-[#F7F4F0]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={easternFadeIn}>
          <span className="mb-4 block text-[0.68rem] uppercase tracking-[0.28em] text-[#C4965A]">
            Wooden Furniture Collection
          </span>
          <h1 className="mb-5 font-['Playfair_Display',serif] text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[1.08] text-[#1C1917]">
            Everything for<br /><em>Your Home</em>
          </h1>
          <p className="max-w-[480px] text-[1rem] leading-[1.8] text-[#7A7269]">
            Explore handcrafted wooden beds, sofas, tables, chairs, wardrobes,
            and everyday home essentials made for families across Pakistan.
          </p>
        </motion.div>
      </section>

      {/* Curated Rooms */}
      <section className="px-6 md:px-16 pb-32 md:pb-44 bg-[#F7F4F0]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {COLLECTIONS.map((col, i) => (
            <motion.div key={col.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={easternFadeInWithDelay(i * 0.12)}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden">
              <ImageWithFallback src={col.imageUrl} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/75 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-white/70">
                  {col.subtitle}
                </p>
                <h3 className="mb-2 font-['Playfair_Display',serif] text-[1.5rem] font-medium leading-[1.2] text-[#F7F4F0]">
                  {col.title}
                </h3>
                <p className="max-w-[240px] text-[0.82rem] leading-[1.65] text-white/65">
                  {col.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-32 md:py-44 px-6 md:px-16 bg-white">
        <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
          <h2 className="font-['Playfair_Display',serif] text-[clamp(1.6rem,3vw,2.2rem)] font-medium text-[#1C1917]">
            All Furniture Pieces
          </h2>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-[0.72rem] uppercase tracking-[0.1em] transition-colors ${activeCategory === cat ? 'border border-[#1C1917] bg-[#1C1917] text-[#F7F4F0]' : 'border border-[#D4CFC8] bg-transparent text-[#6B6358]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 xl:gap-8 max-w-7xl mx-auto">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={easternFadeInWithDelay(i * 0.05)}
              className="min-w-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
