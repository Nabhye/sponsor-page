import React, { useEffect, useRef } from 'react'

const CoSponsor = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view')
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="scroll-section section-co-sponsor">
      <div className="main-sponsor-card">
        <div className="main-badge" style={{ background: 'linear-gradient(135deg, #804A8A, #F59E51)' }}>
          CO-TITLE SPONSOR
        </div>

        <div className="main-sponsor-content">
          <div className="sponsor-logo-frame">
            <img src="/s2.png" alt="Red Bull Co-Title Sponsor" className="main-logo-img" />
          </div>

          <div className="sponsor-info">
            <h2 className="main-sponsor-name">RED BULL</h2>
            <p className="main-sponsor-desc">
              Empowering next-gen performance and immersive experiences as official co-title partner.
            </p>
            <a href="#learn-more" className="sponsor-cta">
              Explore Partnership
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CoSponsor