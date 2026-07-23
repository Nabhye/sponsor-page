import React, { useMemo, useRef } from "react"
import { useLoader, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const logoUrls = [
  "/s1.png", "/s2.png", "/s3.png", "/s4.png",
  "/s5.png", "/s6.png", "/s7.png", "/s8.png",
  "/s9.png", "/s10.png", "/s11.png", "/s12.png",
  "/s13.png", "/s14.png", "/s15.png", "/s16.png",
]

const createTierTexture = (tierTextures) => {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  const itemWidth = 512
  const itemHeight = 512
  canvas.width = itemWidth * tierTextures.length
  canvas.height = itemHeight

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  tierTextures.forEach((tex, index) => {
    const img = tex.image
    if (img) {
      const cardMargin = 30
      const xStart = index * itemWidth + cardMargin
      const yStart = cardMargin
      const cardW = itemWidth - cardMargin * 2
      const cardH = itemHeight - cardMargin * 2
      const radius = 24

      // Dark Glass Card Background
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)"
      ctx.beginPath()
      ctx.roundRect(xStart, yStart, cardW, cardH, radius)
      ctx.fill()

      // Glowing Gradient Border
      const borderGradient = ctx.createLinearGradient(
        xStart, yStart, xStart + cardW, yStart + cardH
      )
      borderGradient.addColorStop(0, "#F59E51")
      borderGradient.addColorStop(0.5, "#804A8A")
      borderGradient.addColorStop(1, "rgba(255, 255, 255, 0.1)")

      ctx.lineWidth = 3
      ctx.strokeStyle = borderGradient
      ctx.stroke()

      // Center logo safely inside card
      const maxLogoW = cardW - 80
      const maxLogoH = cardH - 80

      let drawW = img.width
      let drawH = img.height

      const scale = Math.min(maxLogoW / drawW, maxLogoH / drawH)
      drawW *= scale
      drawH *= scale

      const drawX = xStart + (cardW - drawW) / 2
      const drawY = yStart + (cardH - drawH) / 2

      ctx.drawImage(img, drawX, drawY, drawW, drawH)
    }
  })

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const Cyl = () => {
  const textures = useLoader(THREE.TextureLoader, logoUrls)

  const topCylRef = useRef(null)
  const bottomCylRef = useRef(null)

  const halfLength = Math.ceil(textures.length / 2)
  const topTextures = textures.slice(0, halfLength)
  const bottomTextures = textures.slice(halfLength)

  const topTexture = useMemo(() => createTierTexture(topTextures), [topTextures])
  const bottomTexture = useMemo(() => createTierTexture(bottomTextures), [bottomTextures])

  useFrame((state, delta) => {
    if (topCylRef.current) {
      topCylRef.current.rotation.y += delta * 0.15
    }
    if (bottomCylRef.current) {
      bottomCylRef.current.rotation.y -= delta * 0.15
    }
  })

  // src/components/Cyl.jsx
return (
  <group rotation={[0.1, 0.4, 0.15]}>
    {/* Top Tier */}
    <mesh ref={topCylRef} position={[0, 0.7, 0]}>
      <cylinderGeometry args={[1.9, 1.9, 0.85, 80, 1, true]} />
      <meshStandardMaterial
        map={topTexture}
        transparent
        roughness={0.2}
        metalness={0.1}
        side={THREE.FrontSide}
      />
    </mesh>

    {/* Bottom Tier */}
    <mesh ref={bottomCylRef} position={[0, -0.7, 0]}>
      <cylinderGeometry args={[1.9, 1.9, 0.85, 80, 1, true]} />
      <meshStandardMaterial
        map={bottomTexture}
        transparent
        roughness={0.2}
        metalness={0.1}
        side={THREE.FrontSide}
      />
    </mesh>
  </group>
)
}

export default Cyl