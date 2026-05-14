import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '../components/HeroSection'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Footer } from '../components/Footer'
import { COLLECTIONS } from '../data/products'
import { listProducts } from '../services/api'
import { staggerContainer, staggerItem, buttonHover, buttonTap } from '../motion/presets'

export function HomePage() {
  const location = useLocation()
  const bannerRef = useRef<HTMLElement>(null)

  const { scrollYProgress: bannerProgress } = useScroll({
    target: bannerRef,
    offset: ['start end', 'end start'],
  })

  const bannerY = useTransform(bannerProgress, [0, 1], [40, -40])

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

  // Bento grid cards with asymmetric sizing
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await listProducts()
        if (!mounted) return
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

  const bentoCards = (
    products.length >= 5
      ? [
          { product: products[0], className: 'md:col-span-2 md:row-span-2', aspect: 'aspect-[4/3] md:aspect-[16/11]', titleSize: 'text-[clamp(1.3rem,2.5vw,1.8rem)]' },
          { product: products[1], className: 'md:col-span-1', aspect: 'aspect-[4/3] md:aspect-[4/3.5]', titleSize: 'text-[clamp(1rem,1.8vw,1.3rem)]' },
          { product: products[2], className: 'md:col-span-1', aspect: 'aspect-[4/3] md:aspect-[4/3.5]', titleSize: 'text-[clamp(1rem,1.8vw,1.3rem)]' },
          { product: products[3], className: 'md:col-span-1', aspect: 'aspect-[4/3] md:aspect-[4/3]', titleSize: 'text-[clamp(1rem,1.8vw,1.3rem)]' },
          { product: products[4], className: 'md:col-span-2', aspect: 'aspect-[4/3] md:aspect-[21/9]', titleSize: 'text-[clamp(1.2rem,2.2vw,1.6rem)]' },
        ]
      : []
  )

  return (
    <>
      <HeroSection
        onExploreClick={() => scrollTo('collections')}
        onViewIn3DClick={() => scrollTo('viewer')}
      />

      {/* ── Bento Showcase ──────────────────────────────────────────────── */}
      <section id="collections" className="py-20 md:py-28 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 md:mb-14"
          >
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
              Pakistani Wood Furniture
            </span>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 600,
                  lineHeight: '1.08',
                  color: '#2C2520',
                  textTransform: 'none',
                  letterSpacing: '-0.01em',
                }}
              >
                Beds, Sofas, Tables & More
              </h2>
              <Link
                to="/collections"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8A7E6E',
                }}
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Bento grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {bentoCards.map((card) => (
              <motion.div
                key={card.product.id}
                variants={staggerItem}
                className={`${card.className} group relative overflow-hidden cursor-pointer`}
                onClick={() => window.location.href = `/products/${card.product.id}`}
              >
                <div className={`${card.aspect} relative overflow-hidden`} style={{ backgroundColor: '#E8E2D9' }}>
                  <ImageWithFallback
                    src={card.product.imageUrl}
                    alt={card.product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                  {/* Badge */}
                  {card.product.badge && (
                    <div
                      className="absolute top-4 left-4 px-3 py-1.5"
                      style={{
                        background: 'rgba(244, 241, 235, 0.65)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(244, 241, 235, 0.35)',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '0.6rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#2C2520',
                        fontWeight: 600,
                      }}
                    >
                      {card.product.badge}
                    </div>
                  )}

                  {/* Glassmorphic info overlay */}
                  <div
                    className="absolute bottom-0 left-0 right-0 p-5 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.62rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: 'rgba(244,241,235,0.7)',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {card.product.category}
                    </p>
                    <h3
                      className={card.titleSize}
                      style={{
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: 700,
                        lineHeight: '1.15',
                        color: '#F4F1EB',
                        textTransform: 'uppercase',
                        letterSpacing: '0.03em',
                        marginBottom: '0.3rem',
                      }}
                    >
                      {card.product.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.82rem',
                        color: 'rgba(244,241,235,0.8)',
                        fontWeight: 500,
                      }}
                    >
                      PKR {card.product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Room Collections ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 md:px-16" style={{ backgroundColor: '#E8E2D9' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
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
              Shop by Room
            </span>
            <h2
              style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 600,
                lineHeight: '1.1',
                color: '#2C2520',
                textTransform: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              Curated Spaces
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {COLLECTIONS.map((col) => (
              <motion.div
                key={col.id}
                variants={staggerItem}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden"
              >
                <ImageWithFallback
                  src={col.imageUrl}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
                      marginBottom: '0.5rem',
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
        </div>
      </section>

      {/* ── Collections Banner with Parallax ──────────────────────────────── */}
      <section
        ref={bannerRef}
        className="relative py-28 md:py-44 px-6 md:px-16 overflow-hidden"
        style={{ backgroundColor: '#2C2520' }}
      >
        {/* Parallax decorative element */}
        <motion.div
          style={{ y: bannerY }}
          className="absolute -right-16 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none opacity-[0.08]"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, #B8845C 0%, transparent 70%)',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl relative z-10"
        >
          <span
            className="mb-5 block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: '#B8845C',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            For Pakistani Homes
          </span>
          <h2
            className="mb-6"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
              fontWeight: 600,
              lineHeight: '1.15',
              color: '#F4F1EB',
              textTransform: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Complete Wooden Home Collection
          </h2>
          <p
            className="mb-8 max-w-[48rem]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              lineHeight: '1.8',
              color: '#B5AA98',
            }}
          >
            From solid wood beds and sofa sets to dining tables, center tables, chairs,
            wardrobes, and storage units, each piece is made for practical daily use.
          </p>
          <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
            <Link
              to="/collections"
              className="inline-flex items-center gap-2 transition-colors"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                padding: '1rem 2rem',
                textTransform: 'uppercase',
                fontWeight: 600,
                backgroundColor: '#F4F1EB',
                color: '#2C2520',
                border: 'none',
              }}
            >
              Explore Collections <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
