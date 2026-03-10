'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Planet from './Planet';
import Galaxy from './Galaxy';
import SecondaryPlanet from './SecondaryPlanet';
import BackgroundPlanet from './BackgroundPlanet';
import BlackStars from './BlackStars';
import { Preload } from '@react-three/drei';

export default function Scene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: -1,
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#9f81b9" />
          <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} intensity={1.5} color="#c8b7dc" />
          
          <Galaxy />
          <BlackStars />
          <BackgroundPlanet />
          <SecondaryPlanet />
          <Planet />
          
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
