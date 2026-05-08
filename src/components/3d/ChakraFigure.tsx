"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

const CHAKRAS = [
  { name: "Crown", color: "#e6ccff", position: [0, 2.5, 0], size: 0.12 },
  { name: "Third Eye", color: "#9933ff", position: [0, 2.1, 0], size: 0.1 },
  { name: "Throat", color: "#33ccff", position: [0, 1.7, 0], size: 0.1 },
  { name: "Heart", color: "#33ff77", position: [0, 1.2, 0], size: 0.18 },
  { name: "Solar Plexus", color: "#ffff66", position: [0, 0.7, 0], size: 0.14 },
  { name: "Sacral", color: "#ff9933", position: [0, 0.2, 0], size: 0.14 },
  { name: "Root", color: "#ff3333", position: [0, -0.3, 0], size: 0.14 },
];

const NebulaMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#9333ea") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vDistance;
    attribute float size;
    uniform float uTime;
    void main() {
      vUv = uv;
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      float dist = length(position.xyz);
      vDistance = dist;
      
      mvPosition.x += sin(uTime * 0.5 + position.y) * 0.05;
      mvPosition.y += cos(uTime * 0.3 + position.x) * 0.05;
      
      gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(uTime + dist * 5.0) * 0.2);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uTime;
    varying float vDistance;
    void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);
      
      vec3 color = mix(uColor, vec3(1.0), sin(uTime * 0.5 + vDistance) * 0.5 + 0.5);
      gl_FragColor = vec4(color, strength * 0.6);
    }
  `,
};

export default function ChakraFigure() {
  const group = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const nebulaMaterialRef = useRef<any>(null);

  const [particlePositions, particleSizes] = useMemo(() => {
    const count = 6000;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      let x = 0, y = 0, z = 0;
      const part = Math.random();

      if (part < 0.1) { // Head
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const r = Math.pow(Math.random(), 0.5) * 0.35;
        x = r * Math.sin(theta) * Math.cos(phi);
        y = r * Math.sin(theta) * Math.sin(phi) + 2.5;
        z = r * Math.cos(theta);
      } else if (part < 0.4) { // Torso
        const h = Math.random();
        const r = (1.0 - h * 0.5) * 0.6 * Math.pow(Math.random(), 0.5);
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * r;
        y = h * 1.8 + 0.5;
        z = Math.sin(angle) * r * 0.6;
      } else if (part < 0.75) { // Lotus Legs
        const side = Math.random() > 0.5 ? 1 : -1;
        const angle = Math.random() * Math.PI * 2;
        const rX = Math.random() * 1.5;
        const rY = Math.random() * 0.4;
        x = Math.cos(angle) * rX + (0.8 * side);
        y = Math.sin(angle) * rY;
        z = (Math.random() - 0.5) * 0.8;
        if (Math.abs(x) < 0.5) y *= 0.5;
      } else { // Arms
        const side = Math.random() > 0.5 ? 1 : -1;
        const t = Math.random();
        x = THREE.MathUtils.lerp(0.6 * side, 0.8 * side, t);
        y = THREE.MathUtils.lerp(2.0, 0.5, t);
        z = Math.sin(t * Math.PI) * 0.5;
        x += (Math.random() - 0.5) * 0.2;
        y += (Math.random() - 0.5) * 0.2;
      }

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      sizes[i] = Math.random() * 1.5 + 0.5;
    }

    return [positions, sizes];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.015);
    }
    if (nebulaMaterialRef.current) {
      nebulaMaterialRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <group ref={group}>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleSizes.length}
            array={particleSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={nebulaMaterialRef}
          attach="material"
          {...NebulaMaterial}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <Sphere args={[2.5, 64, 64]} scale={[1, 1.4, 1]} position={[0, 1, 0]}>
        <MeshDistortMaterial
          color="#2e1065"
          transparent
          opacity={0.05}
          distort={0.4}
          speed={1.5}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {CHAKRAS.map((chakra, i) => (
        <ChakraPoint key={i} {...chakra} delay={i * 0.5} />
      ))}
    </group>
  );
}

function ChakraPoint({ color, position, size, delay }: any) {
  const mesh = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (mesh.current) {
      const s = 1 + Math.sin(t * 3) * 0.15;
      mesh.current.scale.setScalar(s);
    }
    if (waveRef.current) {
      const s = (t * 2) % 4;
      waveRef.current.scale.setScalar(s * 0.5 + 0.5);
      // @ts-ignore
      waveRef.current.material.opacity = Math.max(0, 1 - s / 4) * 0.3;
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} toneMapped={false} />
      </mesh>
      
      <mesh ref={waveRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size, size + 0.2, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <Sphere args={[size * 4, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.15} toneMapped={false} blending={THREE.AdditiveBlending} />
      </Sphere>
    </group>
  );
}
