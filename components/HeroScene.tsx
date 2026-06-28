'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  Float,
  PresentationControls,
  AdaptiveDpr,
} from '@react-three/drei';
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import Volcano from './Volcano';
import LavaPlane from './LavaPlane';
import { heroProgress } from '@/lib/scroll';

// Cinematic camera keyframes: [progress, posX,posY,posZ, lookX,lookY,lookZ, fov]
const KEYS: number[][] = [
  [0.0, 0, 1.6, 8.5, 0, 0.4, 0, 40],
  [0.3, 0, 1.4, 5.5, 0, 0.9, 0, 38],
  [0.55, 0, 2.2, 3.2, 0, 1.7, 0, 34],
  [0.78, 0, 2.7, 1.3, 0, 1.85, 0, 30],
  [1.0, 0, 2.05, 0.1, 0, 1.7, -1.2, 24],
];

function sampleKeys(p: number) {
  let a = KEYS[0];
  let b = KEYS[KEYS.length - 1];
  for (let i = 0; i < KEYS.length - 1; i++) {
    if (p >= KEYS[i][0] && p <= KEYS[i + 1][0]) {
      a = KEYS[i];
      b = KEYS[i + 1];
      break;
    }
  }
  const span = b[0] - a[0] || 1;
  let t = (p - a[0]) / span;
  t = t * t * (3 - 2 * t); // smoothstep
  const out: number[] = [];
  for (let i = 1; i < a.length; i++) out.push(a[i] + (b[i] - a[i]) * t);
  return out; // [px,py,pz, lx,ly,lz, fov]
}

/** Flies the camera into the crater along a cinematic path as the hero scrolls. */
function CameraRig() {
  useFrame((state) => {
    const p = heroProgress();
    const cam = state.camera as THREE.PerspectiveCamera;
    const k = sampleKeys(p);
    cam.position.x += (k[0] - cam.position.x) * 0.08;
    cam.position.y += (k[1] - cam.position.y) * 0.08;
    cam.position.z += (k[2] - cam.position.z) * 0.08;
    cam.lookAt(k[3], k[4], k[5]);
    const targetFov = k[6];
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov += (targetFov - cam.fov) * 0.08;
      cam.updateProjectionMatrix();
    }
    // eruption rumble as we approach the mouth
    if (p > 0.6) {
      const s = (p - 0.6) * 0.22;
      cam.position.x += (Math.random() - 0.5) * s;
      cam.position.y += (Math.random() - 0.5) * s;
    }
  });
  return null;
}

/** Plates that rise out of the lava and bloom in during the crater dive. */
function EmergingDishes() {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const p = heroProgress();
    const e = Math.max(0, Math.min(1, (p - 0.55) / 0.4)); // 0 at p=.55 → 1 at p=.95
    if (group.current) {
      group.current.visible = e > 0.01;
      group.current.scale.setScalar(e);
      group.current.position.y = -0.8 + e * 1.8;
      group.current.rotation.y += 0.01;
    }
  });
  const ring = [0, 1, 2].map((i) => {
    const a = (i / 3) * Math.PI * 2;
    return [Math.cos(a) * 1.5, 0, Math.sin(a) * 1.5] as [number, number, number];
  });
  return (
    <group ref={group} position={[0, -0.8, 0]} visible={false}>
      {ring.map((pos, i) => (
        <group key={i} position={pos}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.46, 0.06, 32]} />
            <meshStandardMaterial color="#f3ede2" roughness={0.5} emissive="#ff5e1a" emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0, 0.07, 0]}>
            <cylinderGeometry args={[0.34, 0.36, 0.12, 24]} />
            <meshStandardMaterial color={['#e7c982', '#7a1f12', '#2f5d36'][i]} roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** A pupusa-style plate that slowly orbits the volcano. */
function OrbitingPlate() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 0.3;
    if (ref.current) {
      ref.current.position.x = Math.cos(t) * 4.2;
      ref.current.position.z = Math.sin(t) * 4.2;
      ref.current.position.y = 1.2 + Math.sin(t * 2) * 0.2;
      ref.current.rotation.y = -t;
    }
  });
  return (
    <group ref={ref}>
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <mesh castShadow>
          <cylinderGeometry args={[0.62, 0.58, 0.07, 40]} />
          <meshStandardMaterial color="#f3ede2" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.07, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.42, 0.12, 32]} />
          <meshStandardMaterial color="#e7c982" roughness={0.8} />
        </mesh>
        <mesh position={[0.12, 0.135, 0.05]}>
          <circleGeometry args={[0.08, 16]} />
          <meshStandardMaterial color="#b9893f" />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[Math.cos(i * 2) * 0.22, 0.15, Math.sin(i * 2) * 0.22]} rotation={[-Math.PI / 2, 0, i]}>
            <planeGeometry args={[0.12, 0.04]} />
            <meshStandardMaterial color="#b6ff2e" side={THREE.DoubleSide} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function HeroScene() {
  const [lowPerf, setLowPerf] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(max-width: 768px)');
    const set = () => setLowPerf(m.matches);
    set();
    m.addEventListener('change', set);
    return () => m.removeEventListener('change', set);
  }, []);

  return (
    <Canvas
      shadows={!lowPerf}
      dpr={lowPerf ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 1.6, 8], fov: 40 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#0a0807']} />
      <fog attach="fog" args={['#0a0807', 16, 30]} />

      {/* animated molten background */}
      <LavaPlane />

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[-6, 8, 4]}
        intensity={1.6}
        color="#ffd6a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[5, 3, 5]} intensity={18} color="#ff5e1a" />
      <pointLight position={[-5, 1, -3]} intensity={14} color="#e11d62" />

      <Suspense fallback={null}>
        <PresentationControls global polar={[-0.15, 0.4]} azimuth={[-0.9, 0.9]} snap>
          <group scale={0.95}>
            <Volcano lowPerf={lowPerf} />
            <OrbitingPlate />
            <EmergingDishes />
          </group>
        </PresentationControls>
        <Environment preset="night" />
      </Suspense>

      {/* glossy obsidian floor — catches the magma light */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.0, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0a0807" roughness={0.35} metalness={0.85} />
      </mesh>
      <ContactShadows position={[0, -1.98, 0]} opacity={0.7} scale={18} blur={3} far={6} />
      <CameraRig />

      {!lowPerf && (
        <EffectComposer>
          <Bloom
            intensity={1.6}
            luminanceThreshold={0.28}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.0009, 0.0012]} radialModulation={false} modulationOffset={0} />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
          <Noise premultiply blendFunction={BlendFunction.OVERLAY} opacity={0.25} />
        </EffectComposer>
      )}

      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
