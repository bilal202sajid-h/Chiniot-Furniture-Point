import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { buttonHover, buttonTap } from '../motion/presets'

interface HeroSectionProps {
  onExploreClick: () => void
  onViewIn3DClick: () => void
}

export function HeroSection({ onExploreClick, onViewIn3DClick }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const gradientOpacity = useTransform(scrollYProgress, [0, 0.5], [0.15, 0.6])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] overflow-hidden"
      style={{ backgroundColor: '#F4F1EB' }}
    >
      {/* Parallax gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: gradientOpacity,
          background:
            'linear-gradient(135deg, rgba(44,37,32,0.4) 0%, rgba(184,132,92,0.15) 50%, transparent 100%)',
        }}
      />

      {/* Decorative organic shape */}
      <div
        className="absolute -right-20 -bottom-20 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #B8845C 0%, transparent 70%)',
        }}
      />

      {/* Text content */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-xl md:max-w-2xl"
      >
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.68rem',
            letterSpacing: '0.28em',
            color: '#B8845C',
            textTransform: 'uppercase',
            fontWeight: 600,
            display: 'block',
            marginBottom: '1.5rem',
          }}
        >
          Handcrafted Since 2016
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.8rem)',
            lineHeight: '1.06',
            fontWeight: 800,
            color: '#2C2520',
            marginBottom: '1.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
          }}
        >
          Solid Wood<br />
          Furniture<br />
          <span style={{ color: '#B8845C' }}>for Home</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.95rem',
            lineHeight: '1.8',
            color: '#8A7E6E',
            maxWidth: '420px',
            marginBottom: '2.5rem',
          }}
        >
          Handcrafted beds, sofas, dining tables, center tables, chairs, wardrobes,
          and side units made from quality wood for everyday family living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap gap-4"
        >
          <motion.button
            onClick={onExploreClick}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="flex items-center gap-2 text-white transition-colors duration-300 mobile-w-full justify-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              fontWeight: 600,
              backgroundColor: '#2C2520',
              border: 'none',
            }}
          >
            Explore Collection
            <ChevronRight size={14} />
          </motion.button>
          <motion.button
            onClick={onViewIn3DClick}
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="flex items-center gap-2 transition-colors duration-300 w-full md:w-auto justify-center"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#2C2520',
              border: '1px solid #D4CAB8',
              backgroundColor: 'transparent',
            }}
          >
            View in 3D
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid rgba(212, 202, 184, 0.5)' }}
        >
          {[
            { value: '200+', label: 'Wooden Designs' },
            { value: '10yr', label: 'Craft Experience' },
            { value: '100%', label: 'Solid Wood Focus' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#2C2520',
                  lineHeight: '1.2',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  color: '#B5AA98',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#B5AA98',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px origin-top"
          style={{ height: '40px', backgroundColor: '#D4CAB8' }}
        />
      </motion.div>
    </section>
  )
}
