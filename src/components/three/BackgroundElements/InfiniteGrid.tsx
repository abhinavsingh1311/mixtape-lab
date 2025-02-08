import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform vec3 gridColor;
uniform float fadeDistance;

float grid(vec2 uv, float zoom) {
  vec2 grid = fract(uv * zoom);
  grid = abs(grid - 0.5);
  float axis = min(grid.x, grid.y);
  return smoothstep(0.05, 0.02, axis);
}

void main() {
  float depth = clamp(1.0 - gl_FragCoord.z / fadeDistance, 0.0, 1.0);
  float grid1 = grid(vUv, 2.0) * 0.4;
  float grid2 = grid(vUv, 0.5) * 0.2;
  float alpha = (grid1 + grid2) * depth;
  
  gl_FragColor = vec4(gridColor, alpha * 0.6);
}
`;

export default function InfiniteGrid() {
    const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ camera }) => {
        if (meshRef.current) {
            meshRef.current.quaternion.copy(camera.quaternion);
        }
    });

    return (
        <mesh ref={meshRef} rotation-x={-Math.PI / 2} position={[0, -0.1, 0]}>
            <planeGeometry args={[100, 100, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    gridColor: { value: new THREE.Color(0x444444) },
                    fadeDistance: { value: 35 }
                }}
                transparent
                depthWrite={false}
            />
        </mesh>
    );
}