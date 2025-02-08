import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT = 1000;

export default function BackgroundParticles() {
    const particlesRef = useRef<THREE.Points<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 100;
            pos[i + 1] = (Math.random() - 0.5) * 100;
            pos[i + 2] = (Math.random() - 0.5) * 100;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
        }
    });

    return (
        <points ref={particlesRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={PARTICLE_COUNT}
                    itemSize={3}
                    array={positions}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color={0x6699ff}
                transparent
                opacity={0.15}
                sizeAttenuation
                fog={false}
            />
        </points>
    );
}