'use client';

import { useRef, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Ring } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { useWindowSize } from '@/hooks/useWindowSize';

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
      // Orbital rotation
      ringsRef.current.rotation.z += 0.001;
      // X/Y orbital "wobble"
      ringsRef.current.position.x = Math.sin(t * 0.5) * 0.1;
      ringsRef.current.position.y = Math.cos(t * 0.5) * 0.1;
      // Slight tilt oscillation
      ringsRef.current.rotation.x = (Math.PI / 2) + Math.sin(t * 0.3) * 0.05;
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
            <sphereGeometry args={[2, 64, 64]} />
            <MeshDistortMaterial
              color="#9f81b9"
              speed={2}
              distort={0.15}
              roughness={0.2}
              metalness={0.7}
              emissive="#9f81b9"
              emissiveIntensity={0.3}
              transparent
              opacity={1}
            />
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
                color="#c8b7dc"
                transparent
                opacity={0.03}
                side={THREE.BackSide}
              />
            </Sphere>
          </mesh>

          {/* Saturn-like Rings */}
          <group ref={ringsRef} rotation={[Math.PI / 2, 0, 0]}>
            <Ring args={[2.8, 3.8, 64]}>
              <meshStandardMaterial
                color="#9f81b9"
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
                metalness={0.8}
                roughness={0.2}
              />
            </Ring>
            <Ring args={[4.0, 4.2, 64]}>
              <meshStandardMaterial
                color="#c8b7dc"
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </Ring>
            <Ring args={[4.4, 4.5, 64]}>
              <meshStandardMaterial
                color="#9f81b9"
                transparent
                opacity={0.1}
                side={THREE.DoubleSide}
              />
            </Ring>
          </group>
        </group>
      </Float>
    </group>
  );
}
