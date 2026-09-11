"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HyperspeedProps {
  speed?: number;
  count?: number;
  color?: string;
  opacity?: number;
}

function StarTunnel({ speed = 1, count = 400, color = "#eb0028" }: HyperspeedProps) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const p = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Cylindrical distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 5 + Math.random() * 20; // Tunnel radius
      
      pos[i * 3 + 0] = Math.cos(theta) * radius; // x
      pos[i * 3 + 1] = Math.sin(theta) * radius; // y
      pos[i * 3 + 2] = -Math.random() * 200; // z (depth)
      
      p[i] = Math.random(); // Phase for individual variation
    }
    return [pos, p];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      // Move particles towards camera
      positions[i * 3 + 2] += speed * delta * 50;
      
      // Reset if they pass the camera
      if (positions[i * 3 + 2] > 10) {
        positions[i * 3 + 2] = -200;
        
        // Slightly randomise the entrance position again
        const theta = Math.random() * Math.PI * 2;
        const radius = 5 + Math.random() * 20;
        positions[i * 3 + 0] = Math.cos(theta) * radius;
        positions[i * 3 + 1] = Math.sin(theta) * radius;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Slight rotation of the whole tunnel
    pointsRef.current.rotation.z += delta * 0.1 * speed;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color={color} 
        transparent 
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </points>
  );
}

export default function Hyperspeed({ speed = 1, count = 500, color = "#eb0028", opacity = 1 }: HyperspeedProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity }}>
      <Canvas camera={{ position: [0, 0, 0], fov: 90 }} dpr={[1, 2]}>
        {/* We do NOT attach a solid color background here, we want it to be transparent and overlay the main bg */}
        <fog attach="fog" args={["#000000", 10, 150]} />
        <StarTunnel speed={speed} count={count} color={color} />
      </Canvas>
    </div>
  );
}
