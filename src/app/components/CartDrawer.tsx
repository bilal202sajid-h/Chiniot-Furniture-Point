import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { Product } from './ProductCard'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQuantity: (productId: number, delta: number) => void
  onRemove: (productId: number) => void
}

export function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: 'rgba(28, 25, 23, 0.45)', backdropFilter: 'blur(4px)' }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320, mass: 0.8 }}
            className="fixed right-0 top-0 h-full z-50 flex flex-col bg-white"
            style={{ width: 'min(440px, 100vw)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-6"
              style={{ borderBottom: '1px solid #EDE8E1' }}
            >
              <div>
                <h2
                  style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    color: '#1C1917',
                    lineHeight: 1.2,
                  }}
                >
                  Your Cart
                </h2>
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: '#9B9085',
                    marginTop: '0.2rem',
                  }}
                >
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-[#F0EDE8] transition-colors"
                aria-label="Close cart"
              >
                <X size={18} color="#6B6358" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div
                  className="flex flex-col items-center justify-center h-full text-center"
                  style={{ gap: '1rem' }}
                >
                  <div
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.2rem',
                      color: '#1C1917',
                      fontStyle: 'italic',
                    }}
                  >
                    Your cart is empty
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: '#9B9085',
                    }}
                  >
                    Add a piece to begin your collection
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-4 px-6 py-3 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex gap-4"
                    >
                      {/* Thumbnail */}
                      <div
                        className="flex-shrink-0 bg-[#F0EDE8] overflow-hidden"
                        style={{ width: '88px', height: '88px' }}
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div
                          style={{
                            fontFamily: '"Playfair Display", serif',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#1C1917',
                          }}
                        >
                          {item.product.name}
                        </div>
                        <div
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.78rem',
                            color: '#9B9085',
                            marginTop: '0.1rem',
                          }}
                        >
                          {item.product.subtitle}
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty control */}
                          <div
                            className="flex items-center border border-[#EDE8E1]"
                            style={{ gap: 0 }}
                          >
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#F0EDE8] transition-colors"
                            >
                              <Minus size={12} color="#6B6358" />
                            </button>
                            <span
                              className="w-8 text-center"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.82rem',
                                color: '#1C1917',
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-[#F0EDE8] transition-colors"
                            >
                              <Plus size={12} color="#6B6358" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                color: '#1C1917',
                              }}
                            >
                              ${(item.product.price * item.quantity).toLocaleString()}
                            </span>
                            <button
                              onClick={() => onRemove(item.product.id)}
                              className="w-7 h-7 flex items-center justify-center hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} color="#9B9085" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-6" style={{ borderTop: '1px solid #EDE8E1' }}>
                {/* Complimentary note */}
                <div
                  className="flex items-center gap-2 mb-5 px-4 py-3 bg-[#F7F4F0]"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: '#7A7269',
                    letterSpacing: '0.04em',
                  }}
                >
                  <span style={{ color: '#C4965A' }}>✦</span>
                  Complimentary white-glove delivery on orders over $2,000
                </div>

                {/* Subtotal */}
                <div className="flex justify-between mb-5">
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8rem',
                      color: '#9B9085',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                    }}
                  >
                    Subtotal
                  </span>
                  <span
                    style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      color: '#1C1917',
                    }}
                  >
                    ${subtotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout */}
                <button
                  className="w-full flex items-center justify-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors py-4"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  Proceed to Checkout
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={onClose}
                  className="w-full mt-3 py-3 text-center hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: '#9B9085',
                    textDecoration: 'underline',
                  }}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
