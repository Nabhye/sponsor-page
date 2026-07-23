// src/App.jsx
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'

import SceneContent from './components/SceneContent'
import HeaderBlock from './components/HeaderBlock'
import DynamicSponsorsPath from './components/SponsorsPath'
import PastSponsors from './components/PastSponsors'
import PartnerWithUs from './components/PartnerWithUs'

import './style.css'

const App = () => {
  return (
    <div className="canvas-container">
      <div className="ambient-glow"></div>
      <div className="bg-watermark">SPONSORS</div>

      <Canvas camera={{ position: [0, 0, 7.5], fov: 35 }} eventPrefix="client">
        <ambientLight intensity={1.2} />
        <directionalLight position={[0, 4, 6]} intensity={1.8} />
        <pointLight position={[-6, 2, 3]} intensity={2} color="#804A8A" />
        <pointLight position={[6, -2, 3]} intensity={2} color="#F59E51" />

        <ScrollControls pages={6.6} damping={0.25}>
          {/* 3D Scene Cylinder */}
          <SceneContent />

          {/* HTML Overlay Stack */}
          <Scroll html style={{ width: '100vw', pointerEvents: 'none' }}>
            <HeaderBlock />
            <DynamicSponsorsPath />
            <PastSponsors />
            <PartnerWithUs/>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  )
}

export default App