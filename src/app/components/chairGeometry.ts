import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

export interface ChairConfig {
  cushionColor?: string
  roughness?: number
  metalColor?: string
}

export interface ChairParts {
  group: THREE.Group
  seat: THREE.Mesh
  back: THREE.Mesh
  lArm: THREE.Mesh
  rArm: THREE.Mesh
  legs: THREE.Mesh[]
  cushionMat: THREE.MeshStandardMaterial
  dispose: () => void
}

// ── Positions for normal and exploded states ─────────────────────────────────
export const PART_NORMAL = {
  seat: new THREE.Vector3(0, 0.42, 0.02),
  back: new THREE.Vector3(0, 0.82, -0.29),
  lArm: new THREE.Vector3(-0.42, 0.52, 0.02),
  rArm: new THREE.Vector3(0.42, 0.52, 0.02),
}
export const PART_EXPLODED = {
  seat: new THREE.Vector3(0, 0.98, 0.10),
  back: new THREE.Vector3(0, 0.50, -0.92),
  lArm: new THREE.Vector3(-0.98, 0.52, 0.02),
  rArm: new THREE.Vector3(0.98, 0.52, 0.02),
}
export const LEG_NORMAL = [
  new THREE.Vector3(-0.34, 0.12, -0.30),
  new THREE.Vector3(0.34, 0.12, -0.30),
  new THREE.Vector3(-0.34, 0.12, 0.33),
  new THREE.Vector3(0.34, 0.12, 0.33),
]
export const LEG_EXPLODED_POS = [
  new THREE.Vector3(-0.74, -0.18, -0.66),
  new THREE.Vector3(0.74, -0.18, -0.66),
  new THREE.Vector3(-0.74, -0.18, 0.72),
  new THREE.Vector3(0.74, -0.18, 0.72),
]

export function applyExplodedProgress(parts: ChairParts, p: number) {
  parts.seat.position.lerpVectors(PART_NORMAL.seat, PART_EXPLODED.seat, p)
  parts.back.position.lerpVectors(PART_NORMAL.back, PART_EXPLODED.back, p)
  parts.lArm.position.lerpVectors(PART_NORMAL.lArm, PART_EXPLODED.lArm, p)
  parts.rArm.position.lerpVectors(PART_NORMAL.rArm, PART_EXPLODED.rArm, p)
  parts.legs.forEach((leg, i) => leg.position.lerpVectors(LEG_NORMAL[i], LEG_EXPLODED_POS[i], p))
}

// ── Factory ──────────────────────────────────────────────────────────────────
export function createChair(config: ChairConfig = {}): ChairParts {
  const { cushionColor = '#F2EDE4', roughness = 0.9, metalColor = '#C4965A' } = config

  const cushionMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(cushionColor),
    roughness,
    metalness: 0,
  })
  const woodMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7A5520'),
    roughness: 0.52,
    metalness: 0.05,
  })
  const metalMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(metalColor),
    roughness: 0.12,
    metalness: 0.92,
  })

  const group = new THREE.Group()

  const addBox = (
    w: number, h: number, d: number,
    mat: THREE.Material,
    x: number, y: number, z: number,
    rx = 0
  ): THREE.Mesh => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat)
    mesh.position.set(x, y, z)
    if (rx) mesh.rotation.x = rx
    mesh.castShadow = true
    mesh.receiveShadow = true
    group.add(mesh)
    return mesh
  }

  const seat = addBox(0.78, 0.14, 0.62, cushionMat, ...PART_NORMAL.seat.toArray() as [number, number, number])
  const back = addBox(0.74, 0.55, 0.14, cushionMat, ...PART_NORMAL.back.toArray() as [number, number, number], -0.12)
  const lArm = addBox(0.10, 0.07, 0.62, woodMat, ...PART_NORMAL.lArm.toArray() as [number, number, number])
  const rArm = addBox(0.10, 0.07, 0.62, woodMat, ...PART_NORMAL.rArm.toArray() as [number, number, number])
  // Non-animated parts
  addBox(0.86, 0.06, 0.68, woodMat, 0, 0.33, 0.02)
  addBox(0.055, 0.50, 0.055, woodMat, -0.38, 0.56, -0.285)
  addBox(0.055, 0.50, 0.055, woodMat,  0.38, 0.56, -0.285)

  const legGeo = new THREE.CylinderGeometry(0.026, 0.018, 0.27, 12)
  const legs = LEG_NORMAL.map((pos) => {
    const mesh = new THREE.Mesh(legGeo, metalMat)
    mesh.position.copy(pos)
    mesh.castShadow = true
    group.add(mesh)
    return mesh
  })

  const dispose = () => {
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) child.geometry.dispose()
    })
    cushionMat.dispose()
    woodMat.dispose()
    metalMat.dispose()
  }

  return { group, seat, back, lArm, rArm, legs, cushionMat, dispose }
}

// ── Studio neutral HDR-like environment and lighting ───────────────────────
export function setupStudioNeutralEnvironment(renderer: THREE.WebGLRenderer, scene: THREE.Scene) {
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new RoomEnvironment(renderer)
  const envMap = pmrem.fromScene(envScene, 0.04).texture
  scene.environment = envMap

  return () => {
    envMap.dispose()
    pmrem.dispose()
  }
}

export function addStudioLights(scene: THREE.Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.48))

  const key = new THREE.DirectionalLight(0xffffff, 1.15)
  key.position.set(2.8, 5.2, 2.2)
  key.castShadow = true
  key.shadow.mapSize.setScalar(2048)
  key.shadow.camera.near = 0.1
  key.shadow.camera.far = 22
  key.shadow.radius = 7
  key.shadow.blurSamples = 12
  key.shadow.normalBias = 0.02
  scene.add(key)

  const fill = new THREE.DirectionalLight(0xf0f0f0, 0.45)
  fill.position.set(-2.6, 3.2, -1.6)
  scene.add(fill)

  const rim = new THREE.HemisphereLight(0xffffff, 0xe6e6e6, 0.28)
  scene.add(rim)

  const contactShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 6),
    new THREE.ShadowMaterial({ opacity: 0.18 })
  )
  contactShadow.rotation.x = -Math.PI / 2
  contactShadow.position.y = 0
  contactShadow.receiveShadow = true
  scene.add(contactShadow)
}
