// src/components/SceneContent.jsx
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'
import Cyl from './Cyl'

const SceneContent = () => {
  const scroll = useScroll()
  const groupRef = useRef()

  useFrame((state) => {
    // scroll.offset goes from 0.0 (top) to 1.0 (bottom)
    const progress = scroll.offset

    if (groupRef.current) {
      // 1. Position movement scrubbed to scroll
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -progress * 4.5, 0.1)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -progress * 1.5, 0.1)

      // 2. Continuous dynamic rotation
      groupRef.current.rotation.y = progress * Math.PI * 2
      groupRef.current.rotation.x = Math.sin(progress * Math.PI) * 0.2

      // 3. FADE OUT FAST: Map opacity from 1.0 down to 0.0 purely within [0.0 -> 0.22] scroll range
      // This ensures Cyl is completely invisible right as you leave the Hero section
      const fadeProgress = Math.min(progress / 0.22, 1.0)
      const opacity = THREE.MathUtils.lerp(1.0, 0.0, fadeProgress)

      groupRef.current.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.transparent = true
          child.material.opacity = opacity
          // Turn off rendering completely when transparent to optimize GPU load
          child.visible = opacity > 0.01
        }
      })

      // 4. Subtle camera motion during Hero scroll
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(progress * Math.PI) * 1.2, 0.05)
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -progress * 1.0, 0.05)
      state.camera.lookAt(0, -progress * 2, 0)
    }
  })

  return (
    <group ref={groupRef} position={[0.5, 0, 0]} scale={0.85}>
      <Cyl />
    </group>
  )
}

export default SceneContent