import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

export interface ChairModelProps {
  color?: string
  roughness?: number
  metalColor?: string
  autoRotate?: boolean
  exploded?: boolean
  interactive?: boolean
}

const SEAT_POS = new THREE.Vector3(0, 0.42, 0.02)
const BACK_POS = new THREE.Vector3(0, 0.82, -0.29)
const LARM_POS = new THREE.Vector3(-0.42, 0.52, 0.02)
const RARM_POS = new THREE.Vector3(0.42, 0.52, 0.02)

const SEAT_EXP = new THREE.Vector3(0, 0.98, 0.10)
const BACK_EXP = new THREE.Vector3(0, 0.50, -0.92)
const LARM_EXP = new THREE.Vector3(-0.98, 0.52, 0.02)
const RARM_EXP = new THREE.Vector3(0.98, 0.52, 0.02)

const LEG_NORMALS = [
  new THREE.Vector3(-0.34, 0.12, -0.30),
  new THREE.Vector3(0.34, 0.12, -0.30),
  new THREE.Vector3(-0.34, 0.12, 0.33),
  new THREE.Vector3(0.34, 0.12, 0.33),
]

const LEG_EXPLODED = [
  new THREE.Vector3(-0.74, -0.18, -0.66),
  new THREE.Vector3(0.74, -0.18, -0.66),
  new THREE.Vector3(-0.74, -0.18, 0.72),
  new THREE.Vector3(0.74, -0.18, 0.72),
]

export function ChairModel({
  color = '#F2EDE4',
  roughness = 0.9,
  metalColor = '#C4965A',
  autoRotate = false,
  exploded = false,
  interactive = true,
}: ChairModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const seatRef = useRef<THREE.Group>(null)
  const backRef = useRef<THREE.Group>(null)
  const lArmRef = useRef<THREE.Group>(null)
  const rArmRef = useRef<THREE.Group>(null)
  const legRefs = useRef<(THREE.Mesh | null)[]>([null, null, null, null])
  const explProg = useRef(0)

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.32
    } else if (interactive) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.mouse.x * 0.55,
        0.045
      )
    }
    if (interactive) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.mouse.y * 0.12,
        0.045
      )
    }

    explProg.current = THREE.MathUtils.lerp(
      explProg.current,
      exploded ? 1 : 0,
      delta * 2.8
    )
    const p = explProg.current

    if (seatRef.current) seatRef.current.position.lerpVectors(SEAT_POS, SEAT_EXP, p)
    if (backRef.current) backRef.current.position.lerpVectors(BACK_POS, BACK_EXP, p)
    if (lArmRef.current) lArmRef.current.position.lerpVectors(LARM_POS, LARM_EXP, p)
    if (rArmRef.current) rArmRef.current.position.lerpVectors(RARM_POS, RARM_EXP, p)

    legRefs.current.forEach((mesh, i) => {
      if (mesh) mesh.position.lerpVectors(LEG_NORMALS[i], LEG_EXPLODED[i], p)
    })
  })

  return (
    <group ref={groupRef}>
      {/* Seat cushion */}
      <group ref={seatRef}>
        <RoundedBox args={[0.78, 0.14, 0.62]} radius={0.04} smoothness={4} castShadow>
          <meshStandardMaterial color={color} roughness={roughness} metalness={0} />
        </RoundedBox>
      </group>

      {/* Back cushion */}
      <group ref={backRef}>
        <RoundedBox
          args={[0.74, 0.55, 0.14]}
          radius={0.04}
          smoothness={4}
          castShadow
          rotation={[-0.12, 0, 0] as [number, number, number]}
        >
          <meshStandardMaterial color={color} roughness={roughness} metalness={0} />
        </RoundedBox>
      </group>

      {/* Left armrest */}
      <group ref={lArmRef}>
        <RoundedBox args={[0.1, 0.07, 0.62]} radius={0.025} smoothness={3} castShadow>
          <meshStandardMaterial color="#7A5520" roughness={0.52} metalness={0.05} />
        </RoundedBox>
      </group>

      {/* Right armrest */}
      <group ref={rArmRef}>
        <RoundedBox args={[0.1, 0.07, 0.62]} radius={0.025} smoothness={3} castShadow>
          <meshStandardMaterial color="#7A5520" roughness={0.52} metalness={0.05} />
        </RoundedBox>
      </group>

      {/* Seat frame */}
      <RoundedBox
        args={[0.86, 0.06, 0.68]}
        radius={0.02}
        smoothness={3}
        position={[0, 0.33, 0.02]}
        castShadow
      >
        <meshStandardMaterial color="#7A5520" roughness={0.52} metalness={0.05} />
      </RoundedBox>

      {/* Back vertical supports */}
      <mesh position={[-0.38, 0.56, -0.285]} castShadow>
        <boxGeometry args={[0.055, 0.5, 0.055]} />
        <meshStandardMaterial color="#7A5520" roughness={0.52} metalness={0.05} />
      </mesh>
      <mesh position={[0.38, 0.56, -0.285]} castShadow>
        <boxGeometry args={[0.055, 0.5, 0.055]} />
        <meshStandardMaterial color="#7A5520" roughness={0.52} metalness={0.05} />
      </mesh>

      {/* Legs */}
      {LEG_NORMALS.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { legRefs.current[i] = el }}
          castShadow
        >
          <cylinderGeometry args={[0.026, 0.018, 0.27, 12]} />
          <meshStandardMaterial color={metalColor} roughness={0.12} metalness={0.92} />
        </mesh>
      ))}

      <ContactShadows
        position={[0, -0.01, 0]}
        opacity={0.28}
        scale={3}
        blur={2.2}
        far={1.2}
        color="#6B5A45"
      />
    </group>
  )
}
