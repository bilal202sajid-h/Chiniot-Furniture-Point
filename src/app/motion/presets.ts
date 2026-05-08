import type { Transition } from 'motion/react'

export const easternFadeIn: Transition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
}

export const easternFadeInWithDelay = (delay = 0): Transition => ({
  duration: 1.2,
  delay,
  ease: [0.22, 1, 0.36, 1],
})
