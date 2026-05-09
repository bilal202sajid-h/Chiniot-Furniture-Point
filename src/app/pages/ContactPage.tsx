import { motion } from 'motion/react'
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react'
import { Footer } from '../components/Footer'
import { staggerContainer, staggerItem } from '../motion/presets'

const CONTACT_LINKS = [
  {
    title: 'Instagram',
    name: 'Chiniot Furniture Point',
    href: 'https://www.instagram.com/chiniotfurniturepoint01?igsh=MTFncGxucHVhNzBjdA%3D%3D&utm_source=qr',
    icon: Instagram,
    iconColor: '#E4405F',
  },
  {
    title: 'Facebook',
    name: 'Chiniot Furniture Point',
    href: 'https://www.facebook.com/share/15pzVzH2VBa/?mibextid=wwXIfr',
    icon: Facebook,
    iconColor: '#1877F2',
  },
  {
    title: 'TikTok',
    name: 'Chiniot Furniture Point',
    href: 'https://www.tiktok.com/@chiniot.furniture17?_r=1&_t=ZS-966vJBxZ52A',
    icon: Music2,
    iconColor: '#2C2520',
  },
  {
    title: 'WhatsApp',
    name: 'Chiniot Furniture Point',
    href: 'https://wa.me/923180740205',
    icon: MessageCircle,
    iconColor: '#25D366',
  },
]

export function ContactPage() {
  return (
    <>
      <section className="pt-16 md:pt-40 pb-12 md:pb-20 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#B8845C', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '1rem' }}>
            Contact
          </span>
          <h1 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#2C2520', lineHeight: 1.08, marginBottom: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            Reach Us on<br /><span style={{ color: '#B8845C' }}>All Accounts</span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#8A7E6E', maxWidth: '560px' }}>
            For orders and enquiries about beds, sofas, tables, chairs, wardrobes, and all other wooden furniture,
            connect with Chiniot Furniture Point through any of the channels below.
          </p>
        </motion.div>
      </section>

      <section className="pb-24 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl"
        >
          {CONTACT_LINKS.map((link) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={staggerItem}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="block p-6 md:p-7 transition-all duration-300"
              style={{
                backgroundColor: '#E8E2D9',
                border: '1px solid rgba(212, 202, 184, 0.5)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#B8845C'
                e.currentTarget.style.background = 'rgba(232, 226, 217, 0.7)'
                e.currentTarget.style.backdropFilter = 'blur(12px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 202, 184, 0.5)'
                e.currentTarget.style.background = '#E8E2D9'
                e.currentTarget.style.backdropFilter = 'none'
              }}
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full mb-4"
                style={{ backgroundColor: 'rgba(244, 241, 235, 0.8)', color: link.iconColor }}
              >
                <link.icon size={18} />
              </div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.62rem', letterSpacing: '0.2em', color: '#B8845C', textTransform: 'uppercase', marginBottom: '0.8rem', fontWeight: 600 }}>
                {link.title}
              </p>
              <h2 style={{ fontFamily: '"Montserrat", sans-serif', fontSize: '1.3rem', lineHeight: 1.3, color: '#2C2520', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                {link.name}
              </h2>
            </motion.a>
          ))}
        </motion.div>
      </section>

      <Footer />
    </>
  )
}