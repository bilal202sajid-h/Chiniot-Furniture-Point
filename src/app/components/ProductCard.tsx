import { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'

export interface Product {
  id: number
  name: string
  subtitle: string
  price: number
  category: string
  description: string
  imageUrl: string
  badge?: string
  details?: string
}

interface ProductCardProps {
  product: Product
}

const WHATSAPP_NUMBER = '923180740205'

function whatsappLink(product: Product) {
  const msg = encodeURIComponent(`Hi, I'm interested in the ${product.name} ${product.subtitle} (PKR ${product.price.toLocaleString()}). Could you provide more details?`)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
}

export function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const navigate = useNavigate()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: -y * 10, y: x * 10 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <div ref={cardRef} style={{ perspective: '1100px' }}>
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 380, damping: 22, mass: 0.5 }}
        style={{ transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/products/${product.id}`)}
        className="group cursor-pointer"
      >
        {/* Image container */}
        <div className="relative overflow-hidden bg-[#F0EDE8] aspect-[4/5]">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.badge && (
            <div className="absolute top-4 left-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', backgroundColor: '#C4965A', color: '#fff', padding: '0.3rem 0.75rem' }}>
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label="Wishlist"
          >
            <Heart size={16} className={wishlisted ? 'fill-[#C4965A] stroke-[#C4965A]' : 'stroke-[#6B6358]'} />
          </button>

          {/* WhatsApp CTA overlay */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <a
              href={whatsappLink(product)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center justify-center gap-2 text-white transition-colors py-3"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon />
              Enquire on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Product info */}
        <div className="pt-4 pb-2">
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.16em', color: '#9B9085', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
            {product.category}
          </div>
          <div className="flex items-end justify-between gap-2">
            <div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', fontWeight: 500, color: '#1C1917', lineHeight: '1.3' }}>
                {product.name}
              </h3>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#7A7269', marginTop: '0.15rem' }}>
                {product.subtitle}
              </div>
            </div>
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', fontWeight: 500, color: '#1C1917', whiteSpace: 'nowrap' }}>
              PKR {product.price.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
