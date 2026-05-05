import { motion } from 'motion/react'
import { Leaf, Award, Recycle, TreePine, Truck, RefreshCw } from 'lucide-react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Footer } from '../components/Footer'

const PILLARS = [
  {
    icon: <Leaf size={24} color="#C4965A" />,
    title: 'Responsibly Sourced',
    text: 'All timber is FSC-certified and sourced from managed forests. Zero old-growth wood, ever. Our suppliers are audited in person every two years.',
  },
  {
    icon: <Award size={24} color="#C4965A" />,
    title: 'Master Craftsmanship',
    text: 'Every joint is hand-fitted by artisans with decades of experience. Built to last generations, not seasons. Repairability is designed in from the start.',
  },
  {
    icon: <Recycle size={24} color="#C4965A" />,
    title: 'Circular Promise',
    text: 'We take back any Chiniot Furniture Point piece after 10 years and restore or repurpose it — keeping furniture out of landfill and extending the useful life of every piece.',
  },
  {
    icon: <TreePine size={24} color="#C4965A" />,
    title: 'Carbon Neutral by 2027',
    text: 'We have mapped our full supply-chain emissions and are on track for carbon neutrality by 2027. Every shipment is already offset through verified reforestation.',
  },
  {
    icon: <Truck size={24} color="#C4965A" />,
    title: 'Zero-Waste Packaging',
    text: 'All Chiniot Furniture Point pieces ship in custom-formed pulp packaging — no single-use foam, no polystyrene. Packaging material is compostable at home.',
  },
  {
    icon: <RefreshCw size={24} color="#C4965A" />,
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
      <section className="relative h-[70vh] overflow-hidden" style={{ backgroundColor: '#1C1917' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80&fit=crop"
            alt="Forest"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-end px-8 md:px-16 pb-20 pt-32">
          <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
            Our Commitment
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 500, color: '#F7F4F0', lineHeight: 1.08, maxWidth: '700px' }}>
            Crafted for<br /><em>Generations</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#9B9085', maxWidth: '480px', marginTop: '1.5rem' }}>
            Sustainability isn't a feature at Chiniot Furniture Point — it's the foundation. From forest to living room, every decision is made with the next century in mind.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-8 md:px-16 bg-[#F7F4F0]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
              <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', fontWeight: 500, color: '#1C1917', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.14em', color: '#9B9085', textTransform: 'uppercase', marginTop: '0.5rem' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pillars */}
      <section style={{ backgroundColor: '#241F1B' }} className="py-24 md:py-36 px-8 md:px-16">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="text-center mb-16">
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#F7F4F0', lineHeight: 1.15 }}>
              Six Principles
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="mb-4">{p.icon}</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 500, color: '#F7F4F0', marginBottom: '0.75rem' }}>{p.title}</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: '1.75', color: '#6B6358' }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto quote */}
      <section className="py-24 md:py-32 px-8 md:px-16 bg-[#F7F4F0]">
        <motion.blockquote initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, color: '#1C1917', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '2rem' }}>
            "The most sustainable object is the one that never needs replacing. We design for heirlooms, not inventory turns."
          </p>
          <cite style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.18em', color: '#C4965A', textTransform: 'uppercase', fontStyle: 'normal' }}>
            — Chiniot Furniture Point Design Manifesto, 2007
          </cite>
        </motion.blockquote>
      </section>

      <Footer />
    </>
  )
}
