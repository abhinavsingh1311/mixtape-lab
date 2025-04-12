import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT_DESKTOP = 1000;
const PARTICLE_COUNT_MOBILE = 300;
const PARTICLE_COUNT = 1000;

// Define Props interface for the component
interface BackgroundParticlesProps {
    isMobile: boolean;
}

export default function BackgroundParticles({ isMobile }: BackgroundParticlesProps) {
    // Use the correct ref type with proper generics
    const particlesRef = useRef<THREE.Points>(null);

    const particleCount = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;

    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i += 3) {
            pos[i] = (Math.random() - 0.5) * 100;
            pos[i + 1] = (Math.random() - 0.5) * 100;
            pos[i + 2] = (Math.random() - 0.5) * 100;
        }
        return pos;
    }, [particleCount]);

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
                    count={particleCount}
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
