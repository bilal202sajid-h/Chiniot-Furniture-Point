import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { ProductCard } from '../components/ProductCard'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { PRODUCTS } from '../data/products'
import { Footer } from '../components/Footer'

const WHATSAPP_NUMBER = '923180740205'

function whatsappLink(name: string, subtitle: string, price: number) {
  const msg = encodeURIComponent(`Hi, I'm interested in the ${name} ${subtitle} ($${price.toLocaleString()}). Could you provide more details?`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const SPECS = [
  { label: 'Width', value: '78 cm' },
  { label: 'Depth', value: '70 cm' },
  { label: 'Height', value: '88 cm' },
  { label: 'Seat Height', value: '40 cm' },
  { label: 'Frame', value: 'Solid Walnut' },
  { label: 'Hardware', value: 'Polished Brass' },
]

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()

  const product = PRODUCTS.find((p) => p.id === Number(id))
  const related = PRODUCTS.filter((p) => p.id !== Number(id)).slice(0, 3)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F4F0]" style={{ paddingTop: 'calc(var(--header-height) + 0.5rem)' }}>
        <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#1C1917' }}>Product not found.</p>
        <Link to="/collections" className="mt-6" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.1em', color: '#C4965A', textTransform: 'uppercase' }}>
          ← Back to Collections
        </Link>
      </div>
    )
  }

  const isChair = product.id === 1

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-16 md:pt-28 pb-6 px-6 md:px-16 bg-[#F7F4F0]">
        <Link to="/collections" className="inline-flex items-center gap-1.5 hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', color: '#9B9085', textTransform: 'uppercase' }}>
          <ChevronLeft size={13} /> Collections
        </Link>
      </div>

      {/* Main product section */}
      <section className="px-6 md:px-16 pb-12 md:pb-24 bg-[#F7F4F0]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            className="relative overflow-hidden bg-[#EDE9E3]" style={{ aspectRatio: '4/5' }}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            {product.badge && (
              <div className="absolute top-5 left-5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', backgroundColor: '#C4965A', color: '#fff', padding: '0.3rem 0.75rem' }}>
                {product.badge}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="lg:pt-4">
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.22em', color: '#C4965A', textTransform: 'uppercase', display: 'block', marginBottom: '1rem' }}>
              {product.category}
            </span>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#1C1917', lineHeight: 1.1, marginBottom: '0.4rem' }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', color: '#7A7269', marginBottom: '1.8rem' }}>
              {product.subtitle}
            </p>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: '1.8', color: '#5A5450', marginBottom: '2rem' }}>
              {product.details || product.description}
            </p>

            {/* Specs for chair */}
            {isChair && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8 pb-8" style={{ borderBottom: '1px solid #D4CFC8' }}>
                {SPECS.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em', color: '#9B9085', textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#1C1917', marginTop: '0.15rem' }}>{s.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Price */}
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', fontWeight: 500, color: '#1C1917', marginBottom: '1.5rem' }}>
              ${product.price.toLocaleString()}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={whatsappLink(product.name, product.subtitle, product.price)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 text-white transition-opacity hover:opacity-90 py-4"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase', backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon />
              Enquire on WhatsApp
            </a>

            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#9B9085', marginTop: '1rem', textAlign: 'center' }}>
              Lead time 6–8 weeks · Free white-glove delivery
            </p>
          </motion.div>
        </div>
      </section>

      {/* Related products */}
      <section className="py-20 md:py-24 px-6 md:px-16 bg-white">
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 500, color: '#1C1917', marginBottom: '2.5rem' }}>
          You May Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {related.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
