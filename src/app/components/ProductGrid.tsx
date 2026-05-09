import { motion } from 'motion/react'
import { ProductCard } from './ProductCard'
import { easternFadeInWithDelay } from '../motion/presets'
import type { Product } from './ProductCard'

interface ProductGridProps {
  /** Array of products to display */
  products: Product[]
  /** Number of columns at the largest breakpoint (default: 3) */
  columns?: 2 | 3 | 4
  /** Stagger delay between each card animation in seconds (default: 0.05) */
  animationDelayStep?: number
}

/**
 * Reusable product grid that standardises layout, gaps and card sizing
 * across every page that lists products.
 *
 * Usage:
 *   <ProductGrid products={someArray} />
 *   <ProductGrid products={someArray} columns={2} />
 */
export function ProductGrid({
  products,
  columns = 3,
  animationDelayStep = 0.05,
}: ProductGridProps) {
  const colsClass =
    columns === 2
      ? 'grid-cols-1 sm:grid-cols-2'
      : columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div
      className={`grid ${colsClass} gap-5 md:gap-6 xl:gap-8 max-w-7xl mx-auto`}
    >
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={easternFadeInWithDelay(i * animationDelayStep)}
          className="min-w-0"
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  )
}
