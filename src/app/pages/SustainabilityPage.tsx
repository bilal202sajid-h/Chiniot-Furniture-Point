import { motion } from 'motion/react'
import { Leaf, Award, Recycle, TreePine, Truck, RefreshCw } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Footer } from '../components/Footer'
import { staggerContainer, staggerItem } from '../motion/presets'

const PILLARS = [
  {
    icon: <Leaf size={24} color="#B8845C" />,
    title: 'Responsibly Sourced',
    text: 'We use responsibly sourced sheesham and related hardwoods selected for strength, stability, and long-term daily use in Pakistani homes.',
  },
  {
    icon: <Award size={24} color="#B8845C" />,
    title: 'Master Craftsmanship',
    text: 'Every bed, sofa frame, table, chair, and wardrobe is hand-fitted by artisans with 10 years of experience in wooden household furniture.',
  },
  {
    icon: <Recycle size={24} color="#B8845C" />,
    title: 'Circular Promise',
    text: 'After years of use, we help restore and refinish major wooden furniture items so families can continue using them instead of replacing them early.',
  },
  {
    icon: <TreePine size={24} color="#B8845C" />,
    title: 'Carbon Neutral by 2027',
    text: 'We have mapped our full supply-chain emissions and are on track for carbon neutrality by 2027. Every shipment is already offset through verified reforestation.',
  },
  {
    icon: <Truck size={24} color="#B8845C" />,
    title: 'Zero-Waste Packaging',
    text: 'All Chiniot Furniture Point pieces ship in custom-formed pulp packaging — no single-use foam, no polystyrene. Packaging material is compostable at home.',
  },
  {
    icon: <RefreshCw size={24} color="#B8845C" />,
    title: 'Lifetime Repair Service',
    text: "If a Chiniot Furniture Point piece needs repair — joint, upholstery, finish — we'll fix it for the cost of materials alone, regardless of when it was purchased.",
  },
]

const STATS = [
  { value: '100%', label: 'FSC-Certified Wood' },
  { value: '0', label: 'Landfill Pieces Since 2020' },
  { value: '40%', label: 'Renewable Energy in Production' },
  { value: '18yr', label: 'Average Piece Lifespan' },
]

export function SustainabilityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden" style={{ backgroundColor: '#1A1714' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80&fit=crop"
            alt="Forest"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20 pt-16 md:pt-32">
          <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#B8845C', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1.2rem' }}>
            Our Commitment
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#F4F1EB', lineHeight: 1.08, maxWidth: '700px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Crafted for<br /><span style={{ color: '#A8B5A0' }}>Generations</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#B5AA98', maxWidth: '480px', marginTop: '1.5rem' }}>
            Sustainability at Chiniot Furniture Point means making wooden beds, sofas,
            tables, chairs, wardrobes, and storage pieces that stay strong for years in daily use.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#2C2520', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', color: '#B5AA98', textTransform: 'uppercase', marginTop: '0.5rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{ backgroundColor: '#1A1714' }} className="py-24 md:py-36 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#F4F1EB', lineHeight: 1.15, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Six Principles
            </h2>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {PILLARS.map((p) => (
              <motion.div
                key={p.title}
                variants={staggerItem}
                className="p-6"
                style={{
                  background: 'rgba(244, 241, 235, 0.04)',
                  border: '1px solid rgba(212, 202, 184, 0.12)',
                }}
              >
                <div className="mb-4">{p.icon}</div>
                <h3 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#F4F1EB', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{p.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: '1.75', color: '#8A7E6E' }}>{p.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Manifesto quote */}
      <section className="py-24 md:py-32 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.blockquote initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: '#2C2520', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '2rem' }}>
            "The most sustainable furniture is what a household can use every day for years without compromise."
          </p>
          <cite style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', color: '#B8845C', textTransform: 'uppercase', fontStyle: 'normal', fontWeight: 600 }}>
            — Chiniot Furniture Point Design Manifesto, 2016
          </cite>
        </motion.blockquote>
      </section>

      <Footer />
    </>
  )
}
