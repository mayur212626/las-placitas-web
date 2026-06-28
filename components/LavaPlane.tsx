'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { heroProgress } from '@/lib/scroll';

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // fullscreen quad in clip space, parked at the far plane
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uErupt;
  uniform vec2  uRes;

  // value noise + fbm
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }
  float fbm(vec2 p){
    float v = 0.0, a = 0.5;
    for(int i = 0; i < 5; i++){
      v += a * noise(p);
      p = p * 2.0 + 17.0;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    float asp = uRes.x / max(uRes.y, 1.0);
    vec2 p = vec2((uv.x - 0.5) * asp, uv.y - 0.5) * 3.0;

    float t = uTime * 0.06;
    // domain-warped flow rising upward
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, -t)));
    float n = fbm(p + q * 1.6 + vec2(0.0, t * 1.5));

    // molten color ramp: obsidian -> deep red -> magma -> ember
    vec3 c0 = vec3(0.035, 0.026, 0.024);
    vec3 c1 = vec3(0.32, 0.05, 0.04);
    vec3 c2 = vec3(1.0, 0.30, 0.04);
    vec3 c3 = vec3(1.0, 0.66, 0.18);

    vec3 col = mix(c0, c1, smoothstep(0.22, 0.48, n));
    col = mix(col, c2, smoothstep(0.48, 0.68, n));
    col = mix(col, c3, smoothstep(0.70, 0.88, n));

    // glowing magma veins → bloom catches these
    float cracks = smoothstep(0.80, 0.9, n);
    col += c3 * cracks * (1.1 + uErupt * 1.6);

    // overall brightness, lifts further as the eruption builds
    col *= 1.05 + uErupt * 0.7;

    // saturate
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(lum), col, 1.25);

    // soft radial vignette toward black
    float vig = smoothstep(1.35, 0.3, length(vec2((uv.x - 0.5) * asp, uv.y - 0.5)));
    col *= mix(0.42, 1.0, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function LavaPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { size, viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uErupt: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    []
  );

  useFrame((state) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = state.clock.elapsedTime;
      mat.current.uniforms.uErupt.value = heroProgress();
      mat.current.uniforms.uRes.value.set(
        size.width * viewport.dpr,
        size.height * viewport.dpr
      );
    }
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
