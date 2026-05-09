import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Footer } from '../components/Footer'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { buttonHover, buttonTap } from '../motion/presets'

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 'calc(80vh - var(--header-height))', backgroundColor: '#1A1714' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80&fit=crop"
            alt="Chiniot Furniture Point workshop"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 pt-16 md:pt-40 pb-12 md:pb-24">
          <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#B8845C', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1.2rem' }}>
            Est. Chiniot, 2016
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#F4F1EB', lineHeight: 1.08, maxWidth: '700px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Furniture as<br /><span style={{ color: '#B8845C' }}>Architecture</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#B5AA98', maxWidth: '500px', marginTop: '1.5rem' }}>
            Chiniot Furniture Point builds practical wooden furniture for real homes in Pakistan,
            including beds, sofas, tables, chairs, wardrobes, and other everyday-use pieces.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', color: '#B8845C', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1.2rem' }}>
              The Workshop
            </span>
            <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#2C2520', lineHeight: 1.15, marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              One Building.<br />Everything Made Inside.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: '1.85', color: '#6B5E52', marginBottom: '1.2rem' }}>
              Every Chiniot Furniture Point piece begins and ends in our workshop in Chiniot.
              We make wooden beds, sofa sets, center tables, dining tables, chairs, wardrobes,
              and storage furniture with strict in-house quality checks backed by 10 years of experience.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: '1.85', color: '#6B5E52' }}>
              We run in small batches, and no item leaves the workshop before final polishing,
              fitting, and structural checks. This approach keeps our furniture reliable for everyday household use.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&fit=crop"
              alt="Chiniot Furniture Point workshop interior"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-16 text-center" style={{ backgroundColor: '#E8E2D9' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#2C2520', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Ready to furnish your home?
          </h2>
          <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
            <Link to="/collections" className="inline-flex items-center gap-2 transition-colors"
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', padding: '1rem 2.5rem', textTransform: 'uppercase', fontWeight: 600, backgroundColor: '#2C2520', color: '#F4F1EB', border: 'none' }}>
              Explore the Collection <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
