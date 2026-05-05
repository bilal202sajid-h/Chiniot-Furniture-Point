import { motion } from 'motion/react'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Footer } from '../components/Footer'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const TEAM = [
  {
    name: 'Élise Fontaine',
    role: 'Founder & Creative Director',
    bio: 'Trained under Hans Wegner in Copenhagen before founding Chiniot Furniture Point in 2007. Her philosophy: a piece of furniture should improve with use.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=faces',
  },
  {
    name: 'Marcus Webb',
    role: 'Head of Material Research',
    bio: 'Former conservator at the V&A. Joined in 2011 to build the material library — now one of the most comprehensive in European furniture.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=faces',
  },
  {
    name: 'Inês Carvalho',
    role: 'Lead Artisan, Joinery',
    bio: 'Fifth-generation cabinetmaker from Porto. Each joint she makes is indistinguishable from traditional craft, but engineered for modern tolerances.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&fit=crop&crop=faces',
  },
]

const TIMELINE = [
  { year: '2007', event: 'Chiniot Furniture Point founded in a 600m² workshop in Lyon, France.' },
  { year: '2010', event: 'First international stockist — Aesop, Tokyo.' },
  { year: '2014', event: 'Received the Design Council Sustainability Award.' },
  { year: '2018', event: 'Opened the London showroom on Chiltern Street.' },
  { year: '2022', event: 'Launched the Circular Promise take-back programme.' },
  { year: '2025', event: '240 pieces, 32 countries, one workshop.' },
]

export function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: 'calc(80vh - var(--header-height))', backgroundColor: '#1C1917' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80&fit=crop"
            alt="Chiniot Furniture Point workshop"
            className="w-full h-full object-cover opacity-25"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-6 md:px-16 pt-16 md:pt-40 pb-12 md:pb-24">
          <motion.span initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
            Est. Lyon, 2007
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 500, color: '#F7F4F0', lineHeight: 1.08, maxWidth: '700px' }}>
            Furniture as<br /><em>Architecture</em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#9B9085', maxWidth: '500px', marginTop: '1.5rem' }}>
            Chiniot Furniture Point began with a single conviction: that the furniture in a home should be the most considered object in it — not the most conspicuous.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#F7F4F0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1.2rem' }}>
              The Workshop
            </span>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              One Building.<br />Everything Made Inside.
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: '1.85', color: '#5A5450', marginBottom: '1.2rem' }}>
              Every Chiniot Furniture Point piece begins and ends in our workshop in Lyon. We have never outsourced joinery, upholstery, or finishing to a third party. This isn't efficiency — it's control. The kind of control that lets us guarantee a piece for twenty years.
            </p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: '1.85', color: '#5A5450' }}>
              We run in batches of twelve. No piece enters the workshop until the previous batch has shipped and been quality-checked by the artisan who built it. This is slow. It is also the only way we know how to work.
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

      {/* Timeline */}
      <section style={{ backgroundColor: '#241F1B' }} className="py-24 px-6 md:px-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 500, color: '#F7F4F0', marginBottom: '3rem' }}>
          A Brief History
        </motion.h2>
        <div className="max-w-2xl space-y-0">
          {TIMELINE.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-8 pb-10 relative">
              <div className="flex flex-col items-center">
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', fontWeight: 500, color: '#C4965A', whiteSpace: 'nowrap', paddingTop: '0.15rem' }}>{item.year}</div>
                {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-[#2D2926] mt-2" />}
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', lineHeight: '1.7', color: '#9B9085', paddingTop: '0.1rem' }}>{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 md:px-16 bg-[#F7F4F0]">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-14">
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>The People</span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 500, color: '#1C1917' }}>Who Makes Chiniot Furniture Point</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TEAM.map((member, i) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <div className="overflow-hidden mb-5" style={{ aspectRatio: '3/4' }}>
                <ImageWithFallback src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 500, color: '#1C1917', marginBottom: '0.2rem' }}>{member.name}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.12em', color: '#C4965A', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{member.role}</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: '1.7', color: '#7A7269' }}>{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-16 bg-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 500, color: '#1C1917', marginBottom: '1.5rem' }}>
            Ready to find your piece?
          </h2>
          <Link to="/collections" className="inline-flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', padding: '1rem 2.5rem', textTransform: 'uppercase' }}>
            Explore the Collection <ArrowRight size={14} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
