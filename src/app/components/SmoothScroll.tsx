import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import Lenis from 'lenis'

/**
 * Smooth-scroll wrapper using Lenis.
 * Provides weighted, "liquid" scrolling across the entire site.
 * Wraps children and initialises Lenis on mount.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      // @ts-expect-error - Lenis types may not include infinite
      infinite: false,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll to top on route change (works with Lenis)
  useEffect(() => {
    if (!lenisRef.current) return
    try {
      // lenis.scrollTo supports options; use immediate where available
      // @ts-expect-error - runtime API may include options
      lenisRef.current.scrollTo?.(0, { immediate: true })
    } catch (e) {
      try { lenisRef.current.scrollTo?.(0) } catch {}
    }
  }, [location.pathname])

  return <>{children}</>
}
