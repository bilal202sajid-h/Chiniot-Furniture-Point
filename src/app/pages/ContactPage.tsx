import { motion } from 'motion/react'
import { Facebook, Instagram, MessageCircle, Music2 } from 'lucide-react'
import { Footer } from '../components/Footer'

const CONTACT_LINKS = [
  {
    title: 'Instagram',
    name: 'Chiniot Furniture Point',
    href: 'https://www.instagram.com/chiniotfurniturepoint01?igsh=MTFncGxucHVhNzBjdA%3D%3D&utm_source=qr',
    icon: Instagram,
    iconColor: '#E4405F',
    iconBg: '#FDEBF2',
  },
  {
    title: 'Facebook',
    name: 'Chiniot Furniture Point',
    href: 'https://www.facebook.com/share/15pzVzH2VBa/?mibextid=wwXIfr',
    icon: Facebook,
    iconColor: '#1877F2',
    iconBg: '#EAF2FF',
  },
  {
    title: 'TikTok',
    name: 'Chiniot Furniture Point',
    href: 'https://www.tiktok.com/@chiniot.furniture17?_r=1&_t=ZS-966vJBxZ52A',
    icon: Music2,
    iconColor: '#111111',
    iconBg: '#F0F0F0',
  },
  {
    title: 'WhatsApp',
    name: 'Chiniot Furniture Point',
    href: 'https://wa.me/923180740205',
    icon: MessageCircle,
    iconColor: '#25D366',
    iconBg: '#E8FBF0',
  },
]

export function ContactPage() {
  return (
    <>
      <section className="pt-16 md:pt-40 pb-12 md:pb-20 px-6 md:px-16 bg-[#F7F4F0]">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
            Contact
          </span>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.08, marginBottom: '1.2rem' }}>
            Reach Us on<br /><em>All Accounts</em>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#7A7269', maxWidth: '560px' }}>
            For orders and enquiries about beds, sofas, tables, chairs, wardrobes, and all other wooden furniture,
            connect with Chiniot Furniture Point through any of the channels below.
          </p>
        </motion.div>
      </section>

      <section className="pb-24 px-6 md:px-16 bg-[#F7F4F0]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="block p-6 md:p-7 bg-white border border-[#E2DDD6] hover:border-[#C4965A] transition-colors"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full mb-4"
                style={{ backgroundColor: link.iconBg, color: link.iconColor }}
              >
                <link.icon size={18} />
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', letterSpacing: '0.18em', color: '#C4965A', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                {link.title}
              </p>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.45rem', lineHeight: 1.3, color: '#1C1917', marginBottom: '0.7rem' }}>
                {link.name}
              </h2>
            </motion.a>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}