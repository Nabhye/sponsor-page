import React, { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PartnerWithUs = () => {
  const scroll = useScroll()
  const cardRef = useRef(null)

  useFrame(() => {
    if (!scroll || !cardRef.current) return

    const enter = scroll.range(0.86, 0.14)

    const scale = THREE.MathUtils.lerp(0.88, 1.0, enter)
    const opacity = THREE.MathUtils.lerp(0, 1, enter)
    const translateY = THREE.MathUtils.lerp(50, 0, enter)

    cardRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`
    cardRef.current.style.opacity = `${opacity}`
    cardRef.current.style.pointerEvents = opacity > 0.1 ? 'auto' : 'none'
  })

  return (
    <section className="scroll-section section-partner-cta" style={{ pointerEvents: 'none' }}>
      <div ref={cardRef} className="sinusoid-cta-card" style={{ pointerEvents: 'auto' }}>
        
        {/* Background Ambient Glow */}
        <div className="cta-gradient-glow"></div>

        {/* Left Content Side */}
        <div className="cta-left-content">
          {/* Brand Logo Header replacing vertical plain text */}
          <div className="brand-logo-container">
            <img 
              src="../siNUsoid vX text.png" 
              alt="siNUsoid vX" 
              className="sinusoid-brand-logo"
            />
          </div>

          <h2 className="cta-title">
            BECOME A <br />
            <span className="cta-title-gradient">PARTNER</span>
          </h2>

          <p className="cta-description">
            Our partnership opportunities provide direct access to an engaged audience 
            ready to drive meaningful change in their industries and communities. 
            Join us in reaching tomorrow's future and bring change.
          </p>

          <div className="cta-action-group">
            <a href="mailto:sponsorship@sinusoid.in" className="sinusoid-btn">
              <span>GET IN TOUCH</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        {/* Right Visual Side */}
        <div className="cta-right-visual">
          <div className="visual-glass-frame">
            <div className="visual-glow-orb"></div>
            <img 
              src="https://www.sinusoid.in/images/sponsor/Handshake.png" 
              alt="Handshake Partnership" 
              className="partner-3d-img" 
            />
          </div>
        </div>

      </div>
    </section>
  )
}

export default PartnerWithUs