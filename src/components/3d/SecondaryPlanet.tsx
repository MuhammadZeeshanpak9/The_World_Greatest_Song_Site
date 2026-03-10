'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function SecondaryPlanet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const { mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    // Mouse parallax
    if (groupRef.current) {
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -5 + mouse.x * 0.5, 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 3 + mouse.y * 0.5, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={[-5, 3, -5]}>
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color="#c8b7dc"
            speed={1.5}
            distort={0.3}
            roughness={0.4}
            metalness={0.5}
            emissive="#c8b7dc"
            emissiveIntensity={0.2}
          />
          <Sphere args={[0.85, 32, 32]}>
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </Sphere>
        </mesh>
      </Float>
    </group>
  );
}
