import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronRight, ChevronDown } from 'lucide-react'
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

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.7])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        height: '100vh',
        marginTop: 'calc(-1 * var(--header-height, 4rem))',
      }}
    >
      {/* Background image — zoomed out to show full furniture perspective */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: imageScale,
          /* Pull the image container outward so object-fit: cover shows more of the photo */
          inset: '-2%',
          width: '116%',
          height: '116%',
        }}
      >
        <img
          src="/img.jpeg"
          alt="Luxury handcrafted furniture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 35%',
            display: 'block',
          }}
        />
      </motion.div>

      {/* Left-side scrim — darkens text area, reveals furniture on right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(26,23,20,0.78) 0%, rgba(26,23,20,0.55) 35%, rgba(26,23,20,0.15) 65%, transparent 100%)',
        }}
      />

      {/* Subtle top-to-bottom vignette for depth */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background:
            'linear-gradient(to bottom, rgba(26,23,20,0.4) 0%, transparent 40%, transparent 70%, rgba(26,23,20,0.6) 100%)',
        }}
      />

      {/* Text content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-3xl"
        /* Account for the negative margin — push content down by header height */
      >
        <div style={{ paddingTop: 'var(--header-height, 4rem)' }}>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.32em',
              color: '#D4CAB8',
              textTransform: 'uppercase',
              fontWeight: 500,
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
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              lineHeight: '1.05',
              fontWeight: 600,
              color: '#F4F1EB',
              marginBottom: '1.8rem',
              textTransform: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Solid Wood<br />
            Furniture<br />
            <span style={{ color: '#C9A96E', fontStyle: 'italic' }}>for Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              lineHeight: '1.8',
              color: 'rgba(244, 241, 235, 0.7)',
              maxWidth: '440px',
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
                backgroundColor: '#B8845C',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Explore Collection
              <ChevronRight size={14} />
            </motion.button>
           
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 mt-8 pt-6"
            style={{ borderTop: '1px solid rgba(244, 241, 235, 0.15)' }}
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
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: '#F4F1EB',
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
                    color: 'rgba(244, 241, 235, 0.5)',
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
      </motion.div>

      {/* Scroll-down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            letterSpacing: '0.28em',
            color: 'rgba(244, 241, 235, 0.92)',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '0.15rem 0.6rem',
            borderRadius: '999px',
            background: 'rgba(0,0,0,0.22)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            textShadow: '0 6px 18px rgba(0,0,0,0.55)',
          }}
        >
          Scroll Down
        </div>

        {/* Bouncing chevron arrow */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'rgba(244, 241, 235, 0.9)' }}
        >
          <ChevronDown size={18} strokeWidth={1.6} />
        </motion.div>

        {/* Slim animated line */}
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px origin-top"
          style={{ height: '28px', backgroundColor: 'rgba(244, 241, 235, 0.35)' }}
        />
      </motion.div>
    </section>
  )
}
