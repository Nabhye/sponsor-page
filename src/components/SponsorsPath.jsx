// src/components/SponsorsPath.jsx
import React, { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const sponsorLogos = [
  { id: 1, name: 'BMW', logo: '/s1.png', pos: { left: '10%', top: '11.7%' }, threshold: 0.05 },
  { id: 2, name: 'Idea Bulb', logo: '/s7.png', pos: { left: '36.6%', top: '11.7%' }, threshold: 0.12 },
  { id: 3, name: 'Laser Tag', logo: '/s6.png', pos: { left: '63.3%', top: '11.7%' }, threshold: 0.18 },
  { id: 4, name: 'Red Bull', logo: '/s2.png', pos: { left: '90%', top: '11.7%' }, threshold: 0.25 },
  { id: 5, name: 'MetaSpace', logo: '/s4.png', pos: { left: '90%', top: '37%' }, threshold: 0.32 },
  { id: 6, name: 'Red Bull', logo: '/s2.png', pos: { left: '63.3%', top: '37%' }, threshold: 0.38 },
  { id: 7, name: 'Idea Bulb', logo: '/s3.png', pos: { left: '36.6%', top: '37%' }, threshold: 0.44 },
  { id: 8, name: 'Stud Cops', logo: '/s3.png', pos: { left: '10%', top: '37%' }, threshold: 0.50 },
  { id: 9, name: 'BMW', logo: '/s1.png', pos: { left: '10%', top: '61.7%' }, threshold: 0.56 },
  { id: 10, name: 'Idea Bulb', logo: '/s7.png', pos: { left: '36.6%', top: '61.7%' }, threshold: 0.62 },
  { id: 11, name: 'Stud Cops', logo: '/s3.png', pos: { left: '63.3%', top: '61.7%' }, threshold: 0.68 },
  { id: 12, name: 'Laser Tag', logo: '/s6.png', pos: { left: '90%', top: '61.7%' }, threshold: 0.75 },
  { id: 13, name: 'Red Bull', logo: '/s2.png', pos: { left: '90%', top: '87%' }, threshold: 0.81 },
  { id: 14, name: 'Trends', logo: '/s5.png', pos: { left: '63.3%', top: '87%' }, threshold: 0.87 },
  { id: 15, name: 'BCN', logo: '/s8.png', pos: { left: '36.6%', top: '87%' }, threshold: 0.93 },
  { id: 16, name: 'BMW', logo: '/s1.png', pos: { left: '10%', top: '87%' }, threshold: 0.98 },
]

const DynamicSponsorsPath = () => {
  const scroll = useScroll()
  
  const upperOverlayRef = useRef(null)
  const upperPathRef = useRef(null)
  const gridPathRef = useRef(null)
  const mainCardRef = useRef(null)
  const coCardRef = useRef(null)
  const networkSectionRef = useRef(null)
  const nodeRefs = useRef([])

  useFrame(() => {
    if (!scroll) return

    const offset = scroll.offset

    // TITLE SPONSOR
    if (mainCardRef.current) {
      if (offset >= 0.08 && offset < 0.28) {
        mainCardRef.current.classList.add('scrolly-active')
      } else {
        mainCardRef.current.classList.remove('scrolly-active')
      }
    }

    // CO-TITLE SPONSOR
    if (coCardRef.current) {
      const coIn = scroll.range(0.24, 0.10)
      const coOut = scroll.range(0.38, 0.10)

      if (offset >= 0.24 && offset < 0.45) {
        coCardRef.current.classList.add('scrolly-active')
      } else {
        coCardRef.current.classList.remove('scrolly-active')
      }

      const scale = THREE.MathUtils.lerp(0.9, 1.0, coIn) + (coOut * 0.4)
      const opacity = Math.max(0, 1 - coOut * 1.8)
      const blur = coOut * 20

      coCardRef.current.style.transform = `scale(${scale})`
      coCardRef.current.style.opacity = `${opacity}`
      coCardRef.current.style.filter = `blur(${blur}px)`
    }

    // UPPER SVG LINE FADE OUT
    if (upperOverlayRef.current) {
      const upperFadeOut = scroll.range(0.36, 0.08)
      const upperOpacity = Math.max(0, 1 - upperFadeOut * 2)
      
      upperOverlayRef.current.style.opacity = `${upperOpacity}`
      upperOverlayRef.current.style.pointerEvents = upperOpacity > 0.05 ? 'auto' : 'none'
    }

    // UPPER SVG LINE SCRUB
    const upperProgress = scroll.range(0.10, 0.26)
    if (upperPathRef.current) {
      const len = upperPathRef.current.getTotalLength()
      upperPathRef.current.style.strokeDasharray = `${len}`
      upperPathRef.current.style.strokeDashoffset = `${len * (1 - upperProgress)}`
    }

    // SUPPORTING PARTNERS SECTION
    if (networkSectionRef.current) {
      const enterProgress = scroll.range(0.42, 0.12)
      const exitProgress = scroll.range(0.72, 0.08)

      const sectionScale = THREE.MathUtils.lerp(0.70, 1.0, enterProgress)
      const sectionOpacity = Math.max(0, THREE.MathUtils.lerp(0, 1, enterProgress) - exitProgress * 1.5)
      const translateY = THREE.MathUtils.lerp(60, 0, enterProgress)
      const sectionBlur = exitProgress * 15

      networkSectionRef.current.style.transform = `scale(${sectionScale}) translateY(${translateY}px)`
      networkSectionRef.current.style.opacity = `${sectionOpacity}`
      networkSectionRef.current.style.filter = `blur(${sectionBlur}px)`
      networkSectionRef.current.style.pointerEvents = sectionOpacity > 0.1 ? 'auto' : 'none'
    }

    // LOWER GRID LINE SCRUB
    const gridProgress = scroll.range(0.50, 0.22)
    if (gridPathRef.current) {
      const len = gridPathRef.current.getTotalLength()
      gridPathRef.current.style.strokeDasharray = `${len}`
      gridPathRef.current.style.strokeDashoffset = `${len * (1 - gridProgress)}`
    }

    // GRID LOGOS REVEAL
    sponsorLogos.forEach((logo, index) => {
      const el = nodeRefs.current[index]
      if (el) {
        if (gridProgress >= logo.threshold) {
          el.classList.add('revealed')
        } else {
          el.classList.remove('revealed')
        }
      }
    })
  })

  return (
    <div className="scrolly-flow-container" style={{ pointerEvents: 'none' }}>
      {/* SECTION 1: TITLE SPONSOR */}
      <section className="scroll-section section-feature">
        <div ref={mainCardRef} className="main-sponsor-card feature-card scrolly-card" style={{ pointerEvents: 'auto' }}>
          <span className="main-badge">TITLE SPONSOR</span>
          <div className="main-sponsor-content">
            <div className="sponsor-logo-frame">
              <img src="/s1.png" alt="BMW Group" className="main-logo-img" />
            </div>
            <div className="sponsor-info">
              <h2 className="main-sponsor-name">BMW GROUP</h2>
              <p className="main-sponsor-desc">
                Driving innovation and mobility worldwide. Official technology & title partner for 2026.
              </p>
              <a href="#explore" className="sponsor-cta">Explore Partnership →</a>
            </div>
          </div>
        </div>

        <svg ref={upperOverlayRef} className="feature-overlay-svg" viewBox="0 0 1000 1200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGradUpper" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#804A8A" />
              <stop offset="50%" stopColor="#F59E51" />
              <stop offset="100%" stopColor="#F8D299" />
            </linearGradient>
            <filter id="glowUpper">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <path
            d="M 20 -50 C 20 180, 50 300, 200 300 H 800 C 950 300, 950 480, 950 600 C 950 800, 950 900, 800 900 H 200 C 100 900, 100 1050, 100 1200"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />

          <path
            ref={upperPathRef}
            d="M 20 -50 C 20 180, 50 300, 200 300 H 800 C 950 300, 950 480, 950 600 C 950 800, 950 900, 800 900 H 200 C 100 900, 100 1050, 100 1200"
            fill="none"
            stroke="url(#lineGradUpper)"
            strokeWidth="5"
            strokeLinecap="round"
            filter="url(#glowUpper)"
          />
        </svg>
      </section>

      {/* SECTION 2: CO-TITLE SPONSOR */}
      <section className="scroll-section section-feature">
        <div ref={coCardRef} className="main-sponsor-card feature-card scrolly-card" style={{ pointerEvents: 'auto' }}>
          <div className="main-badge" style={{ background: 'linear-gradient(135deg, #804A8A, #F59E51)' }}>
            CO-TITLE SPONSOR
          </div>
          <div className="main-sponsor-content">
            <div className="sponsor-logo-frame">
              <img src="/s2.png" alt="Red Bull" className="main-logo-img" />
            </div>
            <div className="sponsor-info">
              <h2 className="main-sponsor-name">RED BULL</h2>
              <p className="main-sponsor-desc">
                Empowering next-gen performance and immersive experiences as official co-title partner.
              </p>
              <a href="#explore" className="sponsor-cta">Explore Partnership →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SUPPORTING PARTNERS GRID */}
      <section className="scroll-section section-path">
        <div ref={networkSectionRef} className="entire-network-wrapper">
          <div className="path-header">
            <span className="section-tag">• OUR NETWORK</span>
            <h2 className="path-title">SUPPORTING PARTNERS</h2>
          </div>

          <div className="snake-container">
            <svg className="snake-svg" viewBox="0 0 1000 850" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#804A8A" />
                  <stop offset="50%" stopColor="#F59E51" />
                  <stop offset="100%" stopColor="#F8D299" />
                </linearGradient>
                <filter id="glowGrid">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M 100 -20 V 100 H 900 V 315 H 100 V 525 H 900 V 740 H 100"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />

              <path
                ref={gridPathRef}
                d="M 100 -20 V 100 H 900 V 315 H 100 V 525 H 900 V 740 H 100"
                fill="none"
                stroke="url(#lineGradGrid)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glowGrid)"
              />
            </svg>

            <div className="path-nodes">
              {sponsorLogos.map((s, idx) => (
                <div
                  key={s.id}
                  ref={(el) => (nodeRefs.current[idx] = el)}
                  className="path-node-card"
                  style={{ left: s.pos.left, top: s.pos.top, pointerEvents: 'auto' }}
                >
                  <img src={s.logo} alt={s.name} className="node-logo" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DynamicSponsorsPath