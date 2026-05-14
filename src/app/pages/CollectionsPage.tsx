import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ProductCard } from '../components/ProductCard'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { COLLECTIONS } from '../data/products'
import { listProducts } from '../services/api'
import { Footer } from '../components/Footer'
import { easternFadeIn, easternFadeInWithDelay, staggerContainer, staggerItem } from '../motion/presets'

const CATEGORIES = ['All', 'Beds', 'Sofas', 'Tables', 'Chairs', 'Wardrobes']

export function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await listProducts()
        if (!mounted) return
        // map backend fields to frontend shape
        const mapped = data.map((p: any) => ({
          ...p,
          imageUrl: p.image_url,
          price: typeof p.price === 'string' ? Number(p.price) : p.price,
        }))
        setProducts(mapped)
      } catch (e) {
        console.error('Failed to load products', e)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const filtered = activeCategory === 'All' ? products : products.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <section className="pt-20 md:pt-48 pb-20 md:pb-32 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={easternFadeIn}>
          <span
            className="mb-4 block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: '#B8845C',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Wooden Furniture Collection
          </span>
          <h1
            className="mb-5"
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              lineHeight: '1.08',
              color: '#2C2520',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Everything for<br /><span style={{ color: '#B8845C' }}>Your Home</span>
          </h1>
          <p
            className="max-w-[480px]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#8A7E6E',
            }}
          >
            Explore handcrafted wooden beds, sofas, tables, chairs, wardrobes,
            and everyday home essentials made for families across Pakistan.
          </p>
        </motion.div>
      </section>

      {/* Curated Rooms — layout unchanged */}
      <section className="px-6 md:px-16 pb-32 md:pb-44" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
        >
          {COLLECTIONS.map((col) => (
            <motion.div
              key={col.id}
              variants={staggerItem}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
            >
              <ImageWithFallback src={col.imageUrl} alt={col.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1714]/75 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <p
                  style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '0.6rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(244,241,235,0.6)',
                    fontWeight: 500,
                    marginBottom: '0.4rem',
                  }}
                >
                  {col.subtitle}
                </p>
                <h3
                  style={{
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    lineHeight: '1.2',
                    color: '#F4F1EB',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {col.title}
                </h3>
                <p
                  className="max-w-[240px]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.82rem',
                    lineHeight: '1.65',
                    color: 'rgba(244,241,235,0.6)',
                  }}
                >
                  {col.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Products — layout unchanged */}
      <section className="py-32 md:py-44 px-6 md:px-16" style={{ backgroundColor: '#E8E2D9' }}>
        <div className="flex items-center justify-between mb-12 flex-wrap gap-6">
          <h2
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#2C2520',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            All Furniture Pieces
          </h2>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-5 py-2 transition-all duration-300"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  ...(activeCategory === cat
                    ? {
                        backgroundColor: '#2C2520',
                        color: '#F4F1EB',
                        border: '1px solid #2C2520',
                      }
                    : {
                        backgroundColor: 'rgba(244, 241, 235, 0.6)',
                        backdropFilter: 'blur(8px)',
                        color: '#8A7E6E',
                        border: '1px solid rgba(212, 202, 184, 0.5)',
                      }),
                }}
              >
                {cat}
              </motion.button>
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
