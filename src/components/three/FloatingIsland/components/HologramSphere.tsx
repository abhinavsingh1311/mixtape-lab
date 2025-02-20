import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const hologramShader = {
    uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#00ffff') }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        uniform float time;
        
        void main() {
            vUv = uv;
            vNormal = normal;
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewMatrix * modelPosition;
        }
    `,
    fragmentShader: `
        uniform vec3 color;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
            float pulse = sin(time * 1.5) * 0.05 + 0.95;
            float grid = sin(vUv.y * 50.0 + time * 2.0) * 0.05;
            float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
            float alpha = rim * 0.3 + grid;
            alpha *= pulse * 0.2;
            gl_FragColor = vec4(color * (pulse + grid), alpha);
        }
    `
};

export const HologramSphere: React.FC = () => {
    const hologramRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (hologramRef.current) {
            hologramRef.current.rotation.y += 0.001;
            const scale = Math.sin(clock.elapsedTime * 0.5) * 0.03 + 1;
            hologramRef.current.scale.set(scale, scale, scale);
        }
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.elapsedTime;
        }
    });

    return (
        <mesh ref={hologramRef} position={[0, 1.5, 0]}>
            <sphereGeometry args={[5, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                args={[hologramShader]}
                transparent={true}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
};
