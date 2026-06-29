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

/**
 * Gentle scroll-reactive camera. Pushes in a little and rises slightly toward
 * the glowing crater as you scroll, but never plunges into the cone — the
 * volcano stays framed the whole time so there is never a black void.
 */
function CameraRig() {
  useFrame((state) => {
    const p = heroProgress();
    const cam = state.camera as THREE.PerspectiveCamera;
    // bounded push: z 8 → 6, slight rise, gaze lifts toward the crater
    cam.position.x += (0 - cam.position.x) * 0.06;
    cam.position.y += (1.6 + p * 0.5 - cam.position.y) * 0.06;
    cam.position.z += (8 - p * 2 - cam.position.z) * 0.06;
    cam.lookAt(0, 0.5 + p * 0.7, 0);
    const targetFov = 40 - p * 4;
    if (Math.abs(cam.fov - targetFov) > 0.05) {
      cam.fov += (targetFov - cam.fov) * 0.06;
      cam.updateProjectionMatrix();
    }
  });
  return null;
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
