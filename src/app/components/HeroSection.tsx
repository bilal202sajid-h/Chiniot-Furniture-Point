import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import ScrollSection, { SectionHeading, SectionText, RevealImage, premiumEase } from './ScrollSection'
import { ChevronRight } from 'lucide-react'
import * as THREE from 'three'
import { createChair, addStudioLights } from './chairGeometry'

interface HeroSectionProps {
  onExploreClick: () => void
  onViewIn3DClick: () => void
}

export function HeroSection({ onExploreClick, onViewIn3DClick }: HeroSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    // ── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    // ── Scene / camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.7, 2.5)
    camera.lookAt(0, 0.5, 0)

    addStudioLights(scene)

    const { group: chairGroup, dispose } = createChair({
      cushionColor: '#F2EDE4',
      roughness: 0.88,
      metalColor: '#C4965A',
    })
    chairGroup.position.set(0.55, -0.12, 0)
    scene.add(chairGroup)

    // ── Mouse parallax ─────────────────────────────────────────────────────
    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.12
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Resize ─────────────────────────────────────────────────────────────
    const resize = () => {
      const w = parent.clientWidth
      const h = parent.clientHeight
      if (w > 0 && h > 0) {
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(parent)

    // ── Animation ──────────────────────────────────────────────────────────
    const start = performance.now()
    let raf: number

    const animate = () => {
      raf = requestAnimationFrame(animate)
      const elapsed = (performance.now() - start) * 0.001

      // Auto-rotate with gentle mouse parallax
      chairGroup.rotation.y = elapsed * 0.32 + mouseX
      chairGroup.rotation.x += (mouseY - chairGroup.rotation.x) * 0.04

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouseMove)
      dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] overflow-hidden bg-[#F7F4F0]">
      {/* Vanilla Three.js canvas — no R3F, no event-connection issues */}
      <div className="absolute inset-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>

      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, #F7F4F0 46%, rgba(247,244,240,0.8) 62%, rgba(247,244,240,0.15) 78%, transparent 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 lg:px-28 max-w-xl md:max-w-2xl">
        <SectionHeading className="text-sm uppercase" style={{ fontFamily: 'Inter, sans-serif', color: '#C4965A', letterSpacing: '0.28em', marginBottom: '1.5rem' }}>
          {/* small label */}
        </SectionHeading>

        <SectionHeading as="h1" className="text-5xl" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(3rem, 5.5vw, 5.2rem)', lineHeight: '1.08', fontWeight: 500, color: '#1C1917', marginBottom: '1.8rem' }}>
          Design That<br />
          <em>Defines</em> Space
        </SectionHeading>

        <SectionText style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: '1.8', color: '#7A7269', maxWidth: '420px', marginBottom: '2.5rem' }}>
          Handcrafted furniture for the modern interior. Each piece is an
          architectural statement born from material excellence and timeless proportion.
        </SectionText>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8, ease: premiumEase }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 bg-[#1C1917] text-white hover:bg-[#3D3530] transition-colors duration-300 mobile-w-full justify-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
            }}
          >
            Explore Collection
            <ChevronRight size={14} />
          </button>
          <button
            onClick={onViewIn3DClick}
            className="flex items-center gap-2 border text-[#1C1917] hover:bg-[#1C1917] hover:text-white transition-colors duration-300 mobile-w-full justify-center"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              padding: '1rem 2rem',
              textTransform: 'uppercase',
              borderColor: '#C4C0BA',
            }}
          >
            View in 3D
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: premiumEase }}
          className="flex flex-col sm:flex-row gap-8 mt-14 pt-10"
          style={{ borderTop: '1px solid #E2DDD6' }}
        >
          {[
            { value: '240+', label: 'Artisan Pieces' },
            { value: '32', label: 'Countries' },
            { value: '18yr', label: 'Heritage' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '1.65rem',
                  fontWeight: 500,
                  color: '#1C1917',
                  lineHeight: '1.2',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.68rem',
                  letterSpacing: '0.14em',
                  color: '#9B9085',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.6 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <div
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.2em',
            color: '#9B9085',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </div>
        <motion.div
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-[#C4C0BA] origin-top"
          style={{ height: '40px' }}
        />
      </motion.div>
    </section>
  )
}
