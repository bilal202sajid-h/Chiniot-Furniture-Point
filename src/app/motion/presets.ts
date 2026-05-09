import type { Transition, Variants } from 'motion/react'

/* ── Fade-ins ───────────────────────────────────────────────────────────────── */
export const easternFadeIn: Transition = {
  duration: 1.2,
  ease: [0.22, 1, 0.36, 1],
}

export const easternFadeInWithDelay = (delay = 0): Transition => ({
  duration: 1.2,
  delay,
  ease: [0.22, 1, 0.36, 1],
})

/* ── Parallax ───────────────────────────────────────────────────────────────── */
export const parallaxSlow: Transition = {
  duration: 0,
  ease: 'linear',
}

/* ── Stagger containers ─────────────────────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

/* ── Micro-interactions ─────────────────────────────────────────────────────── */
export const wiggle: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 12,
}

export const buttonHover = {
  scale: 1.03,
  transition: { type: 'spring', stiffness: 400, damping: 15 } as Transition,
}

export const buttonTap = {
  scale: 0.97,
}

export const cardHover = {
  y: -6,
  transition: { type: 'spring', stiffness: 300, damping: 20 } as Transition,
}
