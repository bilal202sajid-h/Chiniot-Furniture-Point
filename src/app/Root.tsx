import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Menu, X } from 'lucide-react'
import { SmoothScroll } from './components/SmoothScroll'

// ── Navigation ────────────────────────────────────────────────────────────────
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  const navLinks = [
    { label: 'Collections', to: '/collections' },
    { label: 'Sustainability', to: '/sustainability' },
    { label: 'About', to: '/about' },
    { label: 'Reviews', to: '/reviews' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
      style={{
        background: scrolled
          ? 'rgba(244, 241, 235, 0.55)'
          : 'rgba(244, 241, 235, 0.0)',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(212, 202, 184, 0.4)'
          : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-16 h-16 md:h-20">
        <Link
          to="/"
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(0.7rem, 1.6vw, 0.9rem)',
            fontWeight: 700,
            color: '#2C2520',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          Chiniot Furniture Point
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="transition-colors hover:text-[#B8845C]"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#2C2520',
                fontWeight: 400,
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Search"
            title="Search"
            style={{ border: 'none' }}
          >
            <Search size={18} color="#8A7E6E" />
          </motion.button>
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            title={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ border: 'none' }}
          >
            {mobileOpen ? <X size={20} color="#2C2520" /> : <Menu size={20} color="#2C2520" />}
          </button>
        </div>
      </div>

      {/* Mobile glass menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden md:hidden"
            style={{
              background: 'rgba(244, 241, 235, 0.75)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              borderTop: '1px solid rgba(212, 202, 184, 0.35)',
            }}
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                >
                  <Link
                    to={link.to}
                    className="block py-3 transition-colors hover:text-[#B8845C]"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#2C2520',
                      fontWeight: 500,
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

// ── Root Layout ───────────────────────────────────────────────────────────────
export function Root() {
  return (
    <SmoothScroll>
      <div className="min-h-screen pt-16 md:pt-20" style={{ fontFamily: 'Inter, sans-serif' }}>
        <Navigation />
        <Outlet />
      </div>
    </SmoothScroll>
  )
}
