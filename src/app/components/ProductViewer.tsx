import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Smartphone, Check } from 'lucide-react'
import * as THREE from 'three'
import { createChair, addStudioLights, applyExplodedProgress, ChairParts } from './chairGeometry'

const COLOR_VARIANTS = [
  { id: 'ivory',    name: 'Ivory Boucle',    color: '#F2EDE4', roughness: 0.91, metalColor: '#C4965A' },
  { id: 'cognac',   name: 'Cognac Leather',  color: '#9B6240', roughness: 0.38, metalColor: '#C4965A' },
  { id: 'charcoal', name: 'Charcoal Velvet', color: '#3A3733', roughness: 0.88, metalColor: '#A0A0A0' },
  { id: 'forest',   name: 'Forest Green',    color: '#2E4B3F', roughness: 0.86, metalColor: '#C4965A' },
  { id: 'rose',     name: 'Dusty Rose',      color: '#C49082', roughness: 0.88, metalColor: '#C4965A' },
]

const SPECS = [
  { label: 'Width',       value: '78 cm' },
  { label: 'Depth',       value: '70 cm' },
  { label: 'Height',      value: '88 cm' },
  { label: 'Seat Height', value: '40 cm' },
  { label: 'Frame',       value: 'Solid Walnut' },
  { label: 'Hardware',    value: 'Polished Brass' },
]

export function ProductViewer() {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const wrapRef      = useRef<HTMLDivElement>(null)
  const chairRef     = useRef<ChairParts | null>(null)
  const explodedRef  = useRef(false)
  const variantRef   = useRef(0)

  // Animation state — mutated directly in rAF, never triggers React renders
  const anim = useRef({ rotY: 0, rotX: 0, velY: 0, velX: 0, camZ: 2.6, explProg: 0 })

  const [selectedVariant, setSelectedVariant] = useState(0)
  const [exploded, setExploded]               = useState(false)
  const [added, setAdded]                     = useState(false)
  const [grabbing, setGrabbing]               = useState(false)

  // ── Sync React state → refs (so rAF loop can read without closure issues) ─
  useEffect(() => { explodedRef.current = exploded }, [exploded])

  useEffect(() => {
    variantRef.current = selectedVariant
    if (chairRef.current) {
      const v = COLOR_VARIANTS[selectedVariant]
      chairRef.current.cushionMat.color.set(v.color)
      chairRef.current.cushionMat.roughness = v.roughness
      chairRef.current.cushionMat.needsUpdate = true
    }
  }, [selectedVariant])

  // ── Vanilla Three.js setup ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const wrap   = wrapRef.current
    if (!canvas || !wrap) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.setClearColor(0x1c1917, 1)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.7, 2.6)
    camera.lookAt(0, 0.55, 0)

    addStudioLights(scene)

    const v0     = COLOR_VARIANTS[0]
    const chair  = createChair({ cushionColor: v0.color, roughness: v0.roughness, metalColor: v0.metalColor })
    chairRef.current = chair

    const outerGroup = new THREE.Group()
    outerGroup.add(chair.group)
    scene.add(outerGroup)

    // ── Resize ──────────────────────────────────────────────────────────────
    const resize = () => {
      const w = wrap.clientWidth
      const h = wrap.clientHeight
      if (w > 0 && h > 0) {
        renderer.setSize(w, h, false)
        camera.aspect = w / h
        camera.updateProjectionMatrix()
      }
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    // ── Animation loop (uses refs — no closures over React state) ───────────
    let raf: number
    const tick = () => {
      raf = requestAnimationFrame(tick)
      const s = anim.current

      // Inertia decay
      s.velY *= 0.90
      s.velX *= 0.90
      s.rotY += s.velY
      s.rotX  = Math.max(-0.38, Math.min(0.38, s.rotX + s.velX))

      outerGroup.rotation.y = s.rotY
      outerGroup.rotation.x = s.rotX

      // Camera zoom (smooth)
      camera.position.z += (s.camZ - camera.position.z) * 0.08

      // Exploded animation
      const targetP = explodedRef.current ? 1 : 0
      s.explProg += (targetP - s.explProg) * 0.06
      applyExplodedProgress(chairRef.current!, s.explProg)

      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      chair.dispose()
      chairRef.current = null
      renderer.dispose()
    }
  }, [])

  // ── Pointer drag handlers ─────────────────────────────────────────────────
  const isDragging = useRef(false)
  const lastPos    = useRef({ x: 0, y: 0 })

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    setGrabbing(true)
    lastPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    anim.current.velY = (e.clientX - lastPos.current.x) * 0.009
    anim.current.velX = (e.clientY - lastPos.current.y) * 0.004
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = () => { isDragging.current = false; setGrabbing(false) }
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    anim.current.camZ = Math.max(1.5, Math.min(4.5, anim.current.camZ + e.deltaY * 0.003))
  }

  const handleAddToCart = () => { setAdded(true); setTimeout(() => setAdded(false), 2500) }

  const variant = COLOR_VARIANTS[selectedVariant]

  return (
    <section id="viewer" className="min-h-screen flex flex-col lg:flex-row"
      style={{ backgroundColor: '#1C1917' }}>

      {/* ── Info panel ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center px-8 md:px-16 py-16 lg:py-24 lg:w-[42%]"
      >
        <span style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
          letterSpacing: '0.28em', color: '#C4965A', textTransform: 'uppercase',
          display: 'block', marginBottom: '1.2rem',
        }}>Interactive 3D Viewer</span>

        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          fontWeight: 500, color: '#F7F4F0', lineHeight: '1.15', marginBottom: '1.2rem',
        }}>
          The Forma<br /><em>Lounge Chair</em>
        </h2>

        <p style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.92rem',
          lineHeight: '1.75', color: '#9B9085', marginBottom: '2.5rem',
        }}>
          Drag to rotate 360°. Scroll to zoom. Explore every angle and see the precision
          of handcrafted joinery up close.
        </p>

        {/* Color swatches */}
        <div className="mb-8">
          <div style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
            letterSpacing: '0.14em', color: '#6B6358',
            textTransform: 'uppercase', marginBottom: '1rem',
          }}>Material — {variant.name}</div>
          <div className="flex gap-3">
            {COLOR_VARIANTS.map((v, i) => (
              <button key={v.id} onClick={() => setSelectedVariant(i)} title={v.name}
                className="w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
                style={{
                  backgroundColor: v.color,
                  outline: selectedVariant === i ? '2px solid #C4965A' : '2px solid transparent',
                  outlineOffset: '2px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button onClick={() => setExploded(!exploded)}
            className="flex items-center gap-2 border border-[#3D3530] text-[#C4C0BA] hover:border-[#C4965A] hover:text-[#C4965A] transition-colors px-4 py-2.5"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            {exploded ? <EyeOff size={14} /> : <Eye size={14} />}
            {exploded ? 'Collapse View' : 'Exploded View'}
          </button>
          <button onClick={() => alert('AR view requires a WebXR-compatible device.')}
            className="flex items-center gap-2 border border-[#3D3530] text-[#C4C0BA] hover:border-[#C4965A] hover:text-[#C4965A] transition-colors px-4 py-2.5"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em' }}>
            <Smartphone size={14} /> View in Your Room
          </button>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-10 pb-10"
          style={{ borderBottom: '1px solid #2D2926' }}>
          {SPECS.map((s) => (
            <div key={s.label}>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
                letterSpacing: '0.12em', color: '#6B6358', textTransform: 'uppercase',
              }}>{s.label}</div>
              <div style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#C4C0BA', marginTop: '0.15rem',
              }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <div style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              letterSpacing: '0.12em', color: '#6B6358', textTransform: 'uppercase',
            }}>Price</div>
            <div style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1.8rem', fontWeight: 500, color: '#F7F4F0',
            }}>$2,840</div>
          </div>
          <button onClick={handleAddToCart}
            className="flex items-center gap-2 bg-[#C4965A] text-white hover:bg-[#B8855A] transition-colors px-8 py-4 flex-1 justify-center"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {added ? <><Check size={14} /> Added to Cart</> : 'Add to Cart'}
          </button>
        </div>
      </motion.div>

      {/* ── Canvas wrapper ───────────────────────────────────────────────── */}
      <div
        ref={wrapRef}
        className="flex-1 min-h-[480px] lg:min-h-0 relative select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
        style={{ cursor: grabbing ? 'grabbing' : 'grab' }}
      >
        <div style={{
          fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.12em',
          color: '#4A4440', textTransform: 'uppercase',
          position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10,
          pointerEvents: 'none',
        }}>
          Drag to rotate · Scroll to zoom
        </div>
        {/* Plain <canvas> — vanilla Three.js, zero R3F involvement */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />
      </div>
    </section>
  )
}
