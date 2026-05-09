import { useState } from 'react'
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
  const [wishlisted, setWishlisted] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <motion.div
        onClick={() => navigate(`/products/${product.id}`)}
        className="group cursor-pointer overflow-hidden border border-[#E3DDD5] bg-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        {/* Image container */}
        <div className="relative aspect-[4/5] md:aspect-[4/4.6] xl:aspect-[4/4.2] overflow-hidden bg-[#F0EDE8]">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {product.badge && (
            <div className="absolute left-4 top-4 bg-[#C4965A] px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-white">
              {product.badge}
            </div>
          )}

          <button
            onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center bg-white/85 transition-colors hover:bg-white"
            aria-label="Wishlist"
          >
            <Heart size={16} className={wishlisted ? 'fill-[#C4965A] stroke-[#C4965A]' : 'stroke-[#6B6358]'} />
          </button>
        </div>

        {/* Product info */}
        <div className="space-y-2 bg-white p-4">
          <div className="text-[0.65rem] uppercase tracking-[0.16em] text-[#9B9085]">
            {product.category}
          </div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="font-['Playfair_Display',serif] text-[1.15rem] font-medium leading-[1.3] text-[#1C1917]">
                {product.name}
              </h3>
              <div className="mt-1 text-[0.8rem] text-[#7A7269]">
                {product.subtitle}
              </div>
            </div>
            <div className="shrink-0 whitespace-nowrap text-[0.92rem] font-medium text-[#1C1917]">
              PKR {product.price.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
