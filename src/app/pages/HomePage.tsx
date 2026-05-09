import { useEffect } from 'react'
import { useLocation, Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { HeroSection } from '../components/HeroSection'
import { ProductGrid } from '../components/ProductGrid'
import { Footer } from '../components/Footer'
import { PRODUCTS } from '../data/products'
import { easternFadeIn } from '../motion/presets'

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

  return (
    <>
      <HeroSection
        onExploreClick={() => scrollTo('collections')}
        onViewIn3DClick={() => scrollTo('viewer')}
      />

      {/* Featured Showcase */}
      <section id="collections" className="py-20 md:py-28 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={easternFadeIn}
            className="mb-10 md:mb-14"
          >
            <span className="mb-4 block text-[0.68rem] uppercase tracking-[0.28em] text-[#C4965A]">
              Pakistani Wood Furniture
            </span>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <h2 className="font-['Playfair_Display',serif] text-[clamp(2.2rem,4vw,3.8rem)] font-medium leading-[1.08] text-[#1C1917]">
                Beds, Sofas, Tables & More
              </h2>
              <Link
                to="/collections"
                className="flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.1em] text-[#6B6358] transition-opacity hover:opacity-70"
              >
                View All <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          <ProductGrid products={PRODUCTS.slice(0, 4)} columns={2} />
        </div>
      </section>

      {/* Collections Banner */}
      <section className="py-28 md:py-44 px-6 md:px-16 bg-[#F7F4F0]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={easternFadeIn}
          className="max-w-2xl"
        >
          <span className="mb-5 block text-[0.68rem] uppercase tracking-[0.28em] text-[#C4965A]">
            For Pakistani Homes
          </span>
          <h2 className="mb-6 font-['Playfair_Display',serif] text-[clamp(2rem,3.5vw,2.8rem)] font-medium leading-[1.15] text-[#1C1917]">
            Complete Wooden Home Collection
          </h2>
          <p className="mb-8 max-w-[48rem] text-[0.95rem] leading-[1.8] text-[#7A7269]">
            From solid wood beds and sofa sets to dining tables, center tables, chairs,
            wardrobes, and storage units, each piece is made for practical daily use.
          </p>
          <Link to="/collections"
            className="inline-flex items-center gap-2 bg-[#1C1917] px-8 py-4 text-[0.78rem] uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#3D3530]">
            Explore Collections <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
