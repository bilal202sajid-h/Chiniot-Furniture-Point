import { motion } from 'motion/react'
import { StarRating } from './StarRating'
import { staggerItem } from '../motion/presets'

export type Review = {
  id: number
  author_name: string
  rating: number
  comment: string
  city: string | null
  is_approved: boolean
  created_at: string
}

function formatReviewDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-PK', { month: 'short', year: 'numeric' })
}

type ReviewCardProps = {
  review: Review
  compact?: boolean
}

export function ReviewCard({ review, compact = false }: ReviewCardProps) {
  return (
    <motion.article
      variants={staggerItem}
      className="flex flex-col h-full p-6 md:p-7"
      style={{
        backgroundColor: '#E8E2D9',
        border: '1px solid rgba(212, 202, 184, 0.5)',
      }}
    >
      <StarRating rating={review.rating} size={compact ? 14 : 16} />
      <p
        className={compact ? 'mt-4 mb-5 flex-1' : 'mt-5 mb-6 flex-1'}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: compact ? '0.88rem' : '0.92rem',
          lineHeight: 1.75,
          color: '#6B5E52',
        }}
      >
        &ldquo;{review.comment}&rdquo;
      </p>
      <div>
        <p
          style={{
            fontFamily: '"Montserrat", sans-serif',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: '#2C2520',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          {review.author_name}
        </p>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: '#8A7E6E',
            marginTop: '0.25rem',
          }}
        >
          {[review.city, formatReviewDate(review.created_at)].filter(Boolean).join(' · ')}
        </p>
      </div>
    </motion.article>
  )
}

export function averageRating(reviews: Review[]) {
  if (reviews.length === 0) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}
