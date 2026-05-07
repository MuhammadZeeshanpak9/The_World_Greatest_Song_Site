'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll } from 'framer-motion';

export default function BlackStars() {
  const [mounted, setMounted] = useState(false);
  const pointsRef = useRef<THREE.Points>(null!);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const count = 4000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        pos[i * 3] = (Math.random() - 0.5) * 50;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
    }
    return pos;
  }, []);

  const randoms = useMemo(() => {
    const r = new Float32Array(count);
    for (let i = 0; i < count; i++) {
        r[i] = Math.random();
    }
    return r;
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#9f81b9") },
    uScroll: { value: 0 }
  }), []);

  useFrame((state) => {
    if (pointsRef.current) {
        uniforms.uTime.value = state.clock.getElapsedTime();
        uniforms.uScroll.value = scrollYProgress.get();
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={`
          uniform float uTime;
          uniform float uScroll;
          attribute float aRandom;
          varying float vTwinkle;

          void main() {
            vec3 pos = position;
            // Parallax scroll effect
            pos.y += uScroll * 30.0;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            
            // Individual twinkling
            float twinkle = sin(uTime * (1.0 + aRandom * 2.0) + aRandom * 10.0) * 0.5 + 0.5;
            vTwinkle = twinkle;

            gl_PointSize = (0.3 + aRandom * 0.4) * (300.0 / -mvPosition.z) * (0.8 + twinkle * 0.4);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vTwinkle;

          void main() {
            float dist = distance(gl_PointCoord, vec2(0.5));
            if (dist > 0.5) discard;
            
            // Magical Glow: Bright core to indigo fringe
            float strength = pow(1.0 - dist * 2.0, 3.0);
            vec3 finalColor = mix(uColor, vec3(1.0), strength * 0.8);
            
            gl_FragColor = vec4(finalColor, strength * vTwinkle * 1.5);
          }
        `}
      />
    </points>
  );
}
