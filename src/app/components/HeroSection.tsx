import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'

interface HeroSectionProps {
  onExploreClick: () => void
  onViewIn3DClick: () => void
}

export function HeroSection({ onExploreClick, onViewIn3DClick }: HeroSectionProps) {
  // Rotating chair removed — placeholder kept for future 3D content.

  return (
    <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] overflow-hidden bg-[#F7F4F0]">
      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #F7F4F0 46%, rgba(247,244,240,0.8) 62%, rgba(247,244,240,0.15) 78%, transparent 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-xl md:max-w-2xl">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.68rem',
            letterSpacing: '0.28em',
            color: '#C4965A',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1.5rem',
          }}
        >
         
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(3rem, 5.5vw, 5.2rem)',
            lineHeight: '1.08',
            fontWeight: 500,
            color: '#1C1917',
            marginBottom: '1.8rem',
          }}
        >
          Solid Wood Furniture<br />
          <em>for Pakistani Homes</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '1rem',
            lineHeight: '1.8',
            color: '#7A7269',
            maxWidth: '420px',
            marginBottom: '2.5rem',
          }}
        >
          Handcrafted beds, sofas, dining tables, center tables, chairs, wardrobes,
          and side units made from quality wood for everyday family living in Pakistan.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors duration-300 mobile-w-full justify-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
            }}
          >
            Explore Collection
            <ChevronRight size={14} />
          </button>
          <button
            onClick={onViewIn3DClick}
            className="flex items-center gap-2 border text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-colors duration-300 w-full md:w-auto justify-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              borderColor: '#C4C0BA',
            }}
          >
            View in 3D
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid #E2DDD6' }}
        >
          {[
            { value: '200+', label: 'Wooden Designs' },
            { value: '10yr', label: 'Craft Experience' },
            { value: '100%', label: 'Solid Wood Focus' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.65rem',
                  fontWeight: 500,
                  color: '#1C1917',
                  lineHeight: '1.2',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  color: '#9B9085',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#9B9085',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-[#C4C0BA] origin-top"
          style={{ height: '40px' }}
        />
      </motion.div>
    </section>
  )
}
