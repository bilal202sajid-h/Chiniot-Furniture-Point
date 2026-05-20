import { Star } from 'lucide-react'

type StarRatingProps = {
  rating: number
  max?: number
  size?: number
  interactive?: boolean
  onChange?: (rating: number) => void
}

export function StarRating({ rating, max = 5, size = 16, interactive = false, onChange }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5" role={interactive ? 'group' : 'img'} aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => {
        const value = i + 1
        const filled = value <= rating
        return (
          <button
            key={value}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(value)}
            className={interactive ? 'transition-transform hover:scale-110' : 'pointer-events-none'}
            style={{ border: 'none', background: 'transparent', padding: 0, cursor: interactive ? 'pointer' : 'default' }}
            aria-label={interactive ? `Rate ${value} stars` : undefined}
          >
            <Star
              size={size}
              fill={filled ? '#B8845C' : 'transparent'}
              color={filled ? '#B8845C' : '#D4CAB8'}
              strokeWidth={1.5}
            />
          </button>
        )
      })}
    </div>
  )
}
