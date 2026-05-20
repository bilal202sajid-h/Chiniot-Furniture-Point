import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { motion } from 'motion/react'
import { Footer } from '../components/Footer'
import { ReviewCard, averageRating, type Review } from '../components/ReviewCard'
import { StarRating } from '../components/StarRating'
import { createReview, listReviews } from '../services/api'
import { staggerContainer } from '../motion/presets'
import { buttonHover, buttonTap } from '../motion/presets'

const inputStyle: React.CSSProperties = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.9rem',
  color: '#2C2520',
  backgroundColor: '#F4F1EB',
  border: '1px solid rgba(212, 202, 184, 0.6)',
  padding: '0.85rem 1rem',
  width: '100%',
}

const labelStyle: React.CSSProperties = {
  fontFamily: 'Montserrat, sans-serif',
  fontSize: '0.62rem',
  letterSpacing: '0.2em',
  color: '#B8845C',
  textTransform: 'uppercase',
  fontWeight: 600,
  display: 'block',
  marginBottom: '0.5rem',
}

export function ReviewsPage() {
  const location = useLocation()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState(false)

  const [authorName, setAuthorName] = useState('')
  const [city, setCity] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const loadReviews = async () => {
    const data = await listReviews({ limit: 100 })
    setReviews(data)
  }

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        await loadReviews()
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

  useEffect(() => {
    if (location.hash === '#write') {
      setTimeout(() => {
        document.getElementById('write')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [location.hash, loading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormSuccess(false)
    setSubmitting(true)
    try {
      const created = await createReview({
        author_name: authorName.trim(),
        city: city.trim() || null,
        rating,
        comment: comment.trim(),
      })
      setReviews((prev) => [created, ...prev])
      setAuthorName('')
      setCity('')
      setRating(5)
      setComment('')
      setFormSuccess(true)
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Could not submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const avg = averageRating(reviews)

  return (
    <>
      <section className="pt-16 md:pt-40 pb-12 md:pb-20 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: '#B8845C',
              textTransform: 'uppercase',
              fontWeight: 600,
              display: 'block',
              marginBottom: '1rem',
            }}
          >
            Reviews
          </span>
          <h1
            style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 800,
              color: '#2C2520',
              lineHeight: 1.08,
              marginBottom: '1.2rem',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}
          >
            Real Stories from<br />
            <span style={{ color: '#B8845C' }}>Pakistani Homes</span>
          </h1>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: '1.8',
              color: '#8A7E6E',
              maxWidth: '560px',
            }}
          >
            Read what customers say about our beds, sofas, tables, chairs, and wardrobes — then share your own
            experience with Chiniot Furniture Point.
          </p>
          {!loading && reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              <StarRating rating={Math.round(avg)} size={20} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#6B5E52' }}>
                {avg.toFixed(1)} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
              </span>
            </div>
          )}
        </motion.div>
      </section>

      <section id="write" className="pb-16 px-6 md:px-16 scroll-mt-28" style={{ backgroundColor: '#F4F1EB' }}>
        <div className="max-w-3xl">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
            style={{
              backgroundColor: '#E8E2D9',
              border: '1px solid rgba(212, 202, 184, 0.5)',
            }}
          >
            <h2
              style={{
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#2C2520',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                marginBottom: '1.5rem',
              }}
            >
              Write Your Review
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="author_name" style={labelStyle}>
                  Your Name
                </label>
                <input
                  id="author_name"
                  required
                  minLength={2}
                  maxLength={120}
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={inputStyle}
                  placeholder="e.g. Ayesha Khan"
                />
              </div>
              <div>
                <label htmlFor="city" style={labelStyle}>
                  City (optional)
                </label>
                <input
                  id="city"
                  maxLength={120}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  style={inputStyle}
                  placeholder="e.g. Lahore"
                />
              </div>
            </div>

            <div className="mb-5">
              <span style={labelStyle}>Your Rating</span>
              <StarRating rating={rating} size={22} interactive onChange={setRating} />
            </div>

            <div className="mb-6">
              <label htmlFor="comment" style={labelStyle}>
                Your Review
              </label>
              <textarea
                id="comment"
                required
                minLength={10}
                maxLength={2000}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="Tell us about the furniture you bought, quality, delivery, and overall experience..."
              />
            </div>

            {formError && (
              <p
                className="mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#9B4D3A' }}
              >
                {formError}
              </p>
            )}
            {formSuccess && (
              <p
                className="mb-4"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#5A7A52' }}
              >
                Thank you! Your review has been published.
              </p>
            )}

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={buttonHover}
              whileTap={buttonTap}
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
                opacity: submitting ? 0.7 : 1,
                cursor: submitting ? 'wait' : 'pointer',
              }}
            >
              {submitting ? 'Submitting…' : 'Submit Review'}
            </motion.button>
          </motion.form>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-16" style={{ backgroundColor: '#F4F1EB' }}>
        <div className="max-w-6xl">
          <span
            className="mb-6 block"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.68rem',
              letterSpacing: '0.28em',
              color: '#B8845C',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            All Customer Reviews
          </span>

          {loading ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#8A7E6E' }}>Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', color: '#8A7E6E' }}>
              No reviews yet. Be the first to share your experience above.
            </p>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
            >
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
