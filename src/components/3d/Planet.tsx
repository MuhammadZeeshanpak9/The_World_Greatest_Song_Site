'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { useWindowSize } from '@/hooks/useWindowSize';

// Custom component to draw wavy circular lines
function MusicWaveRing({
  radius = 3,
  amplitude = 0.5,
  frequency = 6,
  points = 120,
  color = '#4facfe',
  opacity = 0.5,
  rotationOffset = 0
}) {
  const lineRef = useRef<THREE.LineLoop>(null!);

  useLayoutEffect(() => {
    if (lineRef.current) {
      const geometry = lineRef.current.geometry;
      const positions = new Float32Array(points * 3);

      for (let i = 0; i < points; i++) {
        const theta = (i / points) * Math.PI * 2;
        // Base circle + sine wave distortion based on frequency
        const r = radius + Math.sin(theta * frequency + rotationOffset) * amplitude;
        
        positions[i * 3] = Math.cos(theta) * r;
        positions[i * 3 + 1] = Math.sin(theta) * r;
        positions[i * 3 + 2] = 0;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.computeBoundingSphere();
    }
  }, [radius, amplitude, frequency, points, rotationOffset]);

  return (
    <lineLoop ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </lineLoop>
  );
}

function InnerGlobe() {
  // Using a realistic daylight earth map as requested via reference
  const texture = useTexture('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  
  return (
    <>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.2}
        metalness={0.2}
        emissive="#ffffff"
        emissiveIntensity={0.25}
      />
    </>
  );
}

export default function Planet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const ringsRef = useRef<THREE.Group>(null!);
  const { isMobile } = useWindowSize();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
    if (ringsRef.current) {
      // Orbital rotation - spin the whole wave group smoothly
      ringsRef.current.rotation.z += 0.002;
      // Slight X/Y tilt and breath
      ringsRef.current.rotation.x = (Math.PI / 2.2) + Math.sin(t * 0.2) * 0.05;
      ringsRef.current.rotation.y = Math.cos(t * 0.3) * 0.05;
    }
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Main Planet Timeline - Zigzag movement across sections
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "main",
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        }
      });

      // Adaptive X positions
      const xPos = isMobile ? 1.5 : 3.5;
      const xFar = isMobile ? 1.8 : 4.5;

      // Target positions for the planet in each section
      tl.to(groupRef.current.position, {
        x: xPos, y: 0.5, z: 0, duration: 0 // Start Hero Right
      })
      .to(groupRef.current.position, {
        x: -xPos, y: -0.5, z: -1, ease: "power2.inOut" // Move Left (Trending)
      })
      .to(groupRef.current.position, {
        x: xPos, y: 0, z: 0, ease: "power2.inOut" // Move Right (Frequencies)
      })
      .to(groupRef.current.position, {
        x: -xFar, y: 0.5, z: -2, ease: "sine.inOut" // Move Left (Value Packages)
      })
      .to(groupRef.current.position, {
        x: xFar, y: -0.5, z: 0, ease: "sine.inOut" // Move Right (Welcome/Creators)
      })
      .to(groupRef.current.position, {
        x: 0, y: 0, z: 1, ease: "power3.inOut" // Center (Writer/Producer)
      })
      .to(groupRef.current.position, {
        x: 0, y: -5, z: 0, ease: "power1.in" // Final exit (Footer)
      });

      // Scale refinement (Mobile is even smaller to not cover text)
      const baseScale = isMobile ? 0.35 : 0.5;
      gsap.set(groupRef.current.scale, { x: baseScale, y: baseScale, z: baseScale });
      
      tl.to(groupRef.current.scale, {
        x: baseScale * 0.9, y: baseScale * 0.9, z: baseScale * 0.9,
        ease: "none",
      }, 0);

      // Fade out at footer - ensuring it doesn't fade too early
      gsap.to(groupRef.current.children[0].children[0], { 
        opacity: 0,
        scrollTrigger: {
          trigger: "footer",
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        }
      });
    });

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <group ref={groupRef} position={[3.5, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group rotation={[Math.PI / 6, 0, Math.PI / 12]}>
          <mesh ref={meshRef}>
            <InnerGlobe />
            {/* Inner Core Glow */}
            <Sphere args={[1.9, 64, 64]}>
              <meshBasicMaterial
                color="#ffffff"
                transparent
                opacity={0.1}
              />
            </Sphere>
            {/* Halo */}
            <Sphere args={[2.4, 64, 64]}>
              <meshBasicMaterial
                color="#4facfe"
                transparent
                opacity={0.06}
                side={THREE.BackSide}
              />
            </Sphere>
          </mesh>

          {/* Dynamic Music Wave Rings */}
          <group ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
            {[...Array(24)].map((_, i) => (
              <MusicWaveRing
                key={i}
                radius={3.0 + i * 0.12}
                amplitude={0.6 + (i * 0.08)}
                frequency={5 + (i % 3 === 0 ? 0 : 1)}
                opacity={0.8 - (i * 0.02)}
                rotationOffset={(i * Math.PI) / 12}
                color="#9f81b9"
              />
            ))}
          </group>
        </group>
      </Float>
    </group>
  );
}
