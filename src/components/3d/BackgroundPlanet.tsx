'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function BackgroundPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[-8, -5, -15]}>
      <sphereGeometry args={[6, 32, 32]} />
      <meshStandardMaterial
        color="#9f81b9"
        transparent
        opacity={0.1}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}
