import React, { useEffect, useRef } from 'react'

const MainSponsor = () => {
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
    <section ref={sectionRef} className="scroll-section section-main-sponsor">
      <div className="main-sponsor-card">
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
            <a href="#explore" className="sponsor-cta">
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

export default MainSponsor