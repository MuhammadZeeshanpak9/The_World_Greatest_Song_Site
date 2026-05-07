'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, Suspense, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

import { useWindowSize } from '@/hooks/useWindowSize';

function EnergySphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const outerRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
    }
    if (outerRef.current) {
        outerRef.current.rotation.z = t * 0.1;
        outerRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
    }
  });

  return (
    <group>
        <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[1.2, 128, 128]} />
                <MeshDistortMaterial
                color="#9f81b9"
                speed={4}
                distort={0.4}
                roughness={0.1}
                metalness={0.8}
                emissive="#9f81b9"
                emissiveIntensity={1}
                />
            </mesh>
        </Float>

        {/* Outer Energy Shell */}
        <mesh ref={outerRef}>
            <sphereGeometry args={[1.8, 64, 64]} />
            <meshBasicMaterial 
                color="#c8b7dc" 
                transparent 
                opacity={0.05} 
                wireframe
            />
        </mesh>

        <Stars radius={50} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />
    </group>
  );
}

function SceneEffects() {
    const { camera } = useThree();
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        camera.position.z = 5 + Math.sin(t * 0.2) * 0.5;
    });
    return null;
}

export default function WelcomeUniverse() {
  const [mounted, setMounted] = useState(false);
  const words = "WELCOME TO OUR UNIVERSE".split(" ");
  const { isMobile } = useWindowSize();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as any,
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      } as any,
    },
  };

  return (
    <section id="welcome" style={{ height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        width: '100%',
        padding: isMobile ? '0 1rem' : '0 2rem'
      }}>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 900, marginBottom: '2rem', letterSpacing: '-0.05em', lineHeight: 1 }}>
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    style={{ 
                        marginRight: "0.25em", 
                        display: "inline-block",
                        color: index >= 2 ? 'var(--primary-accent)' : 'inherit',
                        textShadow: index >= 2 ? '0 0 50px rgba(159, 129, 185, 0.5)' : 'none'
                    }}
                >
                    {word}
                </motion.span>
            ))}
          </h2>
          <motion.p 
            variants={child}
            style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.4rem', opacity: 0.5, lineHeight: 1.6, fontWeight: 500 }}
          >
             Where frequency architects unite to define the future of mental wellness music. 
             Evolve your sound, transcend your limits.
          </motion.p>
        </motion.div>
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={3} color="#9f81b9" />
            <EnergySphere />
            <SceneEffects />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
