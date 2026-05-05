import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { Search, Menu, X } from 'lucide-react'

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
  ]

  const linkStyle = {
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.78rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    color: '#6B6358',
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-30 transition-all duration-500"
      style={{
        backgroundColor: scrolled ? 'rgba(247,244,240,0.88)' : 'rgba(247,244,240,0.0)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,192,186,0.4)' : '1px solid transparent',
      }}
    >
      <div className="flex items-center justify-between px-8 md:px-16 h-20">
        <Link to="/" style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.45rem', fontWeight: 600, color: '#1C1917', letterSpacing: '0.12em' }}>
          MAISON
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.to} style={linkStyle} className="hover:text-[#1C1917] transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="w-9 h-9 flex items-center justify-center hover:opacity-70 transition-opacity">
            <Search size={18} color="#6B6358" />
          </button>
          <button className="md:hidden w-9 h-9 flex items-center justify-center" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} color="#1C1917" /> : <Menu size={20} color="#1C1917" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden bg-[#F7F4F0] border-t border-[#EDE8E1]">
            <div className="flex flex-col px-8 py-6 gap-6">
              {navLinks.map((link) => (
                <Link key={link.label} to={link.to} style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: '#1C1917', fontWeight: 400 }}>
                  {link.label}
                </Link>
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
    <div className="min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navigation />
      <Outlet />
    </div>
  )
}
