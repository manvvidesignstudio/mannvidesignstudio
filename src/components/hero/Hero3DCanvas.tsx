import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Minimalist abstract architectural stone sculpture
function ArchitecturalSculpture({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // Slow, serene ambient rotation
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.04;

    // Gentle magnetic mouse response with high damping
    const targetX = (mouse.current.x * Math.PI) / 8;
    const targetY = (mouse.current.y * Math.PI) / 8;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX + state.clock.elapsedTime * 0.08, 0.05);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetY, 0.05);

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08;
      ringRef.current.rotation.x -= delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={[1.8, -0.2, 0]} scale={1.1}>
        {/* Monolithic faceted geometric form */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial
            color="#E8E4DC"
            roughness={0.4}
            metalness={0.15}
            flatShading={true}
          />
        </mesh>

        {/* Delicate architectural wire ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.7, 0.015, 16, 64]} />
          <meshStandardMaterial color="#C8A97E" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

// Check if WebGL is available
function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export const Hero3DCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setHasWebGL(isWebGLAvailable());
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('resize', checkDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Graceful fallback: on small mobile screens or without WebGL, do not mount heavy canvas
  if (!hasWebGL || !isDesktop) {
    return (
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_70%_50%,rgba(200,169,126,0.12),transparent_60%)]" />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Warm luxury ambient & directional lights */}
        <ambientLight intensity={0.8} color="#F5F2EC" />
        <directionalLight position={[4, 5, 3]} intensity={1.4} color="#FFF8EE" />
        <pointLight position={[-3, -2, -2]} intensity={0.6} color="#C8A97E" />

        <ArchitecturalSculpture mouse={mouse} />
      </Canvas>
    </div>
  );
};
