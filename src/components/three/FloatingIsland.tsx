// components/three/FloatingIsland.tsx
import { useGLTF } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function FloatingIsland({ onPortalClick, onLoad, ...props }: GroupProps & { onPortalClick: () => void; onLoad: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>();
    const { scene } = useGLTF('/models/float.glb');
    useEffect(() => {
        // Notify parent when loaded
        onLoad();
    }, [onLoad]);

    // Initialize scene and glow
    useEffect(() => {
        // Scene setup
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = child.material.clone();
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Glow setup
        const geometry = new THREE.SphereGeometry(3.5, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x00ffff,
            emissive: 0x90EE90,
            emissiveIntensity: 1.0,
            transparent: true,
            opacity: 0.15,
            side: THREE.DoubleSide
        });

        glowRef.current = new THREE.Mesh(geometry, material);
        glowRef.current.position.set(0, 2.3, 0);
        groupRef.current?.add(glowRef.current);

        return () => {
            if (glowRef.current) {
                groupRef.current?.remove(glowRef.current);
            }
        };
    }, [scene]);

    // Animation frames
    useFrame(({ clock }) => {
        if (glowRef.current) {
            const pulse = Math.sin(clock.elapsedTime * 1.5) * 0.03;
            glowRef.current.scale.setScalar(1.0 + pulse);
            glowRef.current.rotation.y = clock.elapsedTime * 0.15;
        }
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.2;
            groupRef.current.rotation.y = clock.elapsedTime * 0.03;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            <primitive
                object={scene}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    onPortalClick();
                }}
            />
        </group>
    );
}