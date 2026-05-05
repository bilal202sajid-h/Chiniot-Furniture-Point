import { Link } from 'react-router'
import { motion } from 'motion/react'

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F0] px-6 text-center" style={{ paddingTop: 'calc(var(--header-height) + 0.5rem)' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '6rem', fontWeight: 500, color: '#E2DDD6', lineHeight: 1 }}>404</span>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 500, color: '#1C1917', marginTop: '1rem', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', color: '#7A7269', marginBottom: '2.5rem', maxWidth: '360px' }}>
          The page you're looking for doesn't exist, or may have moved.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', padding: '1rem 2rem', textTransform: 'uppercase' }}>
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
