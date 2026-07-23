// src/components/PastSponsors.jsx
import React, { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const pastSponsorsRow1 = [
  { id: 'p1', name: 'Google', logo: '/s1.png', year: '2025' },
  { id: 'p2', name: 'Microsoft', logo: '/s2.png', year: '2025' },
  { id: 'p3', name: 'Intel', logo: '/s3.png', year: '2024' },
  { id: 'p4', name: 'Nvidia', logo: '/s4.png', year: '2024' },
  { id: 'p5', name: 'Spotify', logo: '/s5.png', year: '2023' },
  { id: 'p6', name: 'Uber', logo: '/s6.png', year: '2023' },
]

const pastSponsorsRow2 = [
  { id: 'p7', name: 'Amazon', logo: '/s7.png', year: '2025' },
  { id: 'p8', name: 'Meta', logo: '/s8.png', year: '2025' },
  { id: 'p9', name: 'Samsung', logo: '/s1.png', year: '2024' },
  { id: 'p10', name: 'GitHub', logo: '/s2.png', year: '2024' },
  { id: 'p11', name: 'Adobe', logo: '/s3.png', year: '2023' },
  { id: 'p12', name: 'Discord', logo: '/s4.png', year: '2023' },
]

const PastSponsors = () => {
  const scroll = useScroll()
  const sectionRef = useRef(null)

  useFrame(() => {
    if (!scroll || !sectionRef.current) return

    // Triggers smooth fade and scale-in towards the end of page scroll
    const enter = scroll.range(0.78, 0.18)

    const scale = THREE.MathUtils.lerp(0.85, 1.0, enter)
    const opacity = THREE.MathUtils.lerp(0, 1, enter)
    const translateY = THREE.MathUtils.lerp(80, 0, enter)

    sectionRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`
    sectionRef.current.style.opacity = `${opacity}`
    sectionRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none'
  })

  return (
    <section className="scroll-section section-past-sponsors" style={{ pointerEvents: 'none' }}>
      <div ref={sectionRef} className="past-sponsors-wrapper">
        <div className="path-header">
          <span className="section-tag">• LEGACY</span>
          <h2 className="path-title">PAST SPONSORS</h2>
          <p className="past-subtitle">Honoring our visionaries from previous editions</p>
        </div>

        <div className="marquee-container" style={{ pointerEvents: 'auto' }}>
          {/* Track 1: Moving Left */}
          <div className="marquee-track track-left">
            {[...pastSponsorsRow1, ...pastSponsorsRow1].map((s, i) => (
              <div key={`${s.id}-${i}`} className="past-sponsor-card">
                <img src={s.logo} alt={s.name} className="past-logo" />
                <div className="past-info">
                  <span className="past-name">{s.name}</span>
                  <span className="past-year">{s.year}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2: Moving Right */}
          <div className="marquee-track track-right">
            {[...pastSponsorsRow2, ...pastSponsorsRow2].map((s, i) => (
              <div key={`${s.id}-${i}`} className="past-sponsor-card">
                <img src={s.logo} alt={s.name} className="past-logo" />
                <div className="past-info">
                  <span className="past-name">{s.name}</span>
                  <span className="past-year">{s.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PastSponsors