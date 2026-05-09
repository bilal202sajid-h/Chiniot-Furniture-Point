import { useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'motion/react'
import { Heart } from 'lucide-react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { cardHover, wiggle } from '../motion/presets'

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
  const [wishlisted, setWishlisted] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        onClick={() => navigate(`/products/${product.id}`)}
        whileHover={cardHover}
        className="group cursor-pointer overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: '#E8E2D9',
          border: '1px solid rgba(212, 202, 184, 0.5)',
        }}
      >
        {/* Image container */}
        <div className="relative aspect-[4/5] md:aspect-[4/4.6] xl:aspect-[4/4.2] overflow-hidden" style={{ backgroundColor: '#E8E2D9' }}>
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.badge && (
            <div
              className="absolute left-4 top-4"
              style={{
                background: 'rgba(244, 241, 235, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(244, 241, 235, 0.35)',
                padding: '0.35rem 0.75rem',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#2C2520',
                fontWeight: 600,
              }}
            >
              {product.badge}
            </div>
          )}

          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              setWishlisted(!wishlisted)
            }}
            whileTap={{ rotate: [0, -15, 15, -10, 10, 0], transition: wiggle }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center transition-colors"
            style={{
              background: 'rgba(244, 241, 235, 0.7)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: 'none',
            }}
            aria-label="Wishlist"
          >
            <Heart size={16} className={wishlisted ? 'fill-[#B8845C] stroke-[#B8845C]' : 'stroke-[#8A7E6E]'} />
          </motion.button>
        </div>

        {/* Product info */}
        <div className="space-y-2 p-4" style={{ backgroundColor: '#E8E2D9' }}>
          <div
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#B5AA98',
              fontWeight: 500,
            }}
          >
            {product.category}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3
                style={{
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  lineHeight: '1.3',
                  color: '#2C2520',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}
              >
                {product.name}
              </h3>
              <div
                className="mt-1"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.8rem',
                  color: '#8A7E6E',
                }}
              >
                {product.subtitle}
              </div>
            </div>
            <div
              className="shrink-0 whitespace-nowrap"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.92rem',
                fontWeight: 500,
                color: '#2C2520',
              }}
            >
              PKR {product.price.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
