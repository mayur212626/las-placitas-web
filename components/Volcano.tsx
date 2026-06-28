'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';
import { heroProgress } from '@/lib/scroll';

/**
 * Stylized El Salvador volcano (the icon from the Las Placitas crest).
 * All primitives — no asset downloads. Lush green base, rocky cone,
 * glowing crater, drifting steam + ash embers.
 */
export default function Volcano({ lowPerf = false }: { lowPerf?: boolean }) {
  const crater = useRef<THREE.PointLight>(null);
  const smoke = useRef<THREE.Group>(null);

  // gentle terrain bumps around the base
  const hills = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => {
        const a = (i / 7) * Math.PI * 2;
        const r = 3.4 + Math.sin(i * 2.1) * 0.4;
        return {
          pos: [Math.cos(a) * r, -1.55, Math.sin(a) * r] as [number, number, number],
          s: 0.7 + (i % 3) * 0.25,
        };
      }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // eruption ramps up as the hero scrolls away
    const erupt = heroProgress();
    if (crater.current) {
      const base = 14 + erupt * 60;
      crater.current.intensity = base + Math.sin(t * 4) * (5 + erupt * 20) + Math.sin(t * 11) * 2;
    }
    if (smoke.current) {
      smoke.current.rotation.y = t * (0.05 + erupt * 0.4);
      smoke.current.position.y = 2.4 + erupt * 0.6;
      const s = 1 + erupt * 0.6;
      smoke.current.scale.setScalar(s);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* base rubble */}
      {hills.map((h, i) => (
        <mesh key={i} position={h.pos} castShadow scale={h.s}>
          <sphereGeometry args={[0.9, 20, 16]} />
          <meshStandardMaterial color={i % 2 ? '#1a130f' : '#241913'} roughness={1} />
        </mesh>
      ))}

      {/* lower obsidian slope */}
      <mesh position={[0, -0.85, 0]} castShadow receiveShadow>
        <coneGeometry args={[3.0, 1.6, 48]} />
        <meshStandardMaterial color="#160f0b" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* upper rocky cone (truncated) */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.7, 2.35, 2.3, 48]} />
        <meshStandardMaterial color="#1d130d" roughness={0.8} metalness={0.25} />
      </mesh>

      {/* lava streaks (thin emissive boxes down the cone) */}
      {[0.3, 1.9, 3.4, 4.9].map((a, i) => (
        <mesh
          key={i}
          position={[Math.cos(a) * 1.1, 0.4, Math.sin(a) * 1.1]}
          rotation={[0.15, -a, 0.18]}
        >
          <boxGeometry args={[0.08, 1.6, 0.04]} />
          <meshStandardMaterial
            color="#ff5e1a"
            emissive="#ff5a1f"
            emissiveIntensity={2.6}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* crater rim */}
      <mesh position={[0, 1.72, 0]}>
        <torusGeometry args={[0.72, 0.12, 12, 40]} />
        <meshStandardMaterial color="#3a2c25" roughness={1} />
      </mesh>
      {/* crater glow disc */}
      <mesh position={[0, 1.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.66, 32]} />
        <meshStandardMaterial
          color="#ffae3a"
          emissive="#ff4d12"
          emissiveIntensity={3.4}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={crater} position={[0, 2.0, 0]} color="#ff6a1f" intensity={16} distance={9} />

      {/* thin drifting smoke wisp — kept light so the cone stays the star */}
      <group ref={smoke} position={[0, 3.0, 0]}>
        <Cloud seed={2} bounds={[1.3, 1.0, 1.3]} volume={2.2} color="#5a4a42" opacity={0.22} speed={0.3} />
      </group>

      {/* dense ember column erupting from the crater */}
      <Sparkles
        count={lowPerf ? 50 : 90}
        scale={[1.8, 5, 1.8]}
        position={[0, 3.2, 0]}
        size={6}
        speed={1.1}
        color="#ff8a3d"
        opacity={1}
      />
      {/* glowing embers drifting across the field */}
      <Sparkles count={lowPerf ? 30 : 70} scale={[11, 5, 11]} position={[0, 1, 0]} size={3} speed={0.4} color="#ff5e1a" />
    </group>
  );
}
