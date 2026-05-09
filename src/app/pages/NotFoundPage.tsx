import { Link } from 'react-router'
import { motion } from 'motion/react'
import { buttonHover, buttonTap } from '../motion/presets'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ backgroundColor: '#F4F1EB', paddingTop: 'calc(var(--header-height) + 0.5rem)' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '6rem', fontWeight: 800, color: '#D4CAB8', lineHeight: 1 }}>404</span>
        <h1 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 700, color: '#2C2520', marginTop: '1rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#8A7E6E', marginBottom: '2.5rem', maxWidth: '360px' }}>
          The page you're looking for doesn't exist, or may have moved.
        </p>
        <motion.div whileHover={buttonHover} whileTap={buttonTap} className="inline-block">
          <Link to="/" className="inline-flex items-center gap-2 transition-colors"
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.72rem', letterSpacing: '0.14em', padding: '1rem 2rem', textTransform: 'uppercase', fontWeight: 600, backgroundColor: '#2C2520', color: '#F4F1EB', border: 'none' }}>
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
