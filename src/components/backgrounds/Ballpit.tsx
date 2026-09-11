"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Environment, Lightformer } from "@react-three/drei";

interface BallpitProps {
  count?: number;
  color?: string;
  opacity?: number;
}

function FloatingSpheres({ count = 100, color = "#eb0028" }: { count?: number, color?: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { viewport, mouse } = useThree();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 0.5 + Math.random() * 1.5;
      const speed = 0.005 + Math.random() * 0.01;
      
      // Distribute spheres across the viewport
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 20 - 10;
      
      temp.push({ t, factor, speed, x, y, z, randomRot: Math.random() * Math.PI });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    
    // Smooth mouse target
    const targetX = (mouse.x * viewport.width) / 10;
    const targetY = (mouse.y * viewport.height) / 10;

    particles.forEach((particle, i) => {
      let { t } = particle;
      const { factor, speed, x, y, z } = particle;
      t = particle.t += speed;
      
      // Floating math
      const currentX = x + Math.cos(t) * factor;
      const currentY = y + Math.sin(t) * factor;
      
      // Slight parallax towards mouse
      dummy.position.set(
        currentX + targetX * (z + 20) * 0.01,
        currentY + targetY * (z + 20) * 0.01,
        z
      );
      
      // Rotation
      dummy.rotation.set(t, t, particle.randomRot);
      
      // Scale pulsing slightly
      const s = 1 + Math.sin(t * 2) * 0.1;
      dummy.scale.set(s, s, s);
      
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} receiveShadow castShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.8}
        envMapIntensity={2}
      />
    </instancedMesh>
  );
}

export default function Ballpit({ count = 60, color = "#eb0028", opacity = 1 }: BallpitProps) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ opacity }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 50 }} dpr={[1, 2]}>
        {/* Cinematic lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2} intensity={2} color={color} />
        <directionalLight position={[-20, -20, -10]} intensity={1} color="#ffffff" />
        
        <FloatingSpheres count={count} color={color} />
        
        {/* Studio environment for metallic reflections */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, -0.3, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
            <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
}
