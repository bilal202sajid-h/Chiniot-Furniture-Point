import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { listReviews } from '../services/api'
import { ReviewCard, averageRating, type Review } from './ReviewCard'
import { StarRating } from './StarRating'
import { staggerContainer } from '../motion/presets'

const PREVIEW_COUNT = 3

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await listReviews({ limit: PREVIEW_COUNT })
        if (mounted) setReviews(data)
      } catch (e) {
        console.error('Failed to load reviews', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const avg = averageRating(reviews)

  return (
    <section id="reviews" className="py-20 md:py-28 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 md:mb-14"
        >
          <span
            className="mb-4 block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: '#B8845C',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Customer Voices
          </span>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  fontWeight: 600,
                  lineHeight: '1.1',
                  color: '#2C2520',
                  textTransform: 'none',
                  letterSpacing: '-0.01em',
                  marginBottom: '0.75rem',
                }}
              >
                What Families Say
              </h2>
              {!loading && reviews.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <StarRating rating={Math.round(avg)} size={18} />
                  <span
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.85rem',
                      color: '#8A7E6E',
                    }}
                  >
                    {avg.toFixed(1)} average from happy customers
                  </span>
                </div>
              )}
            </div>
            <Link
              to="/reviews"
              className="flex items-center gap-2 transition-opacity hover:opacity-70"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.78rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A7E6E',
              }}
            >
              All Reviews <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>

        {!loading && reviews.length === 0 ? (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.95rem',
              color: '#8A7E6E',
              marginBottom: '1.5rem',
            }}
          >
            Be the first to share your experience with Chiniot Furniture Point.
          </p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} compact />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 md:mt-12"
        >
          <Link
            to="/reviews#write"
            className="inline-flex items-center gap-2 transition-colors"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              fontWeight: 600,
              backgroundColor: '#2C2520',
              color: '#F4F1EB',
              border: 'none',
            }}
          >
            Write Your Review <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
