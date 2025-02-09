// components/three/FloatingIsland.tsx
import { useGLTF } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const MODEL_PATH = '/models/f.glb';

export default function FloatingIsland({
    onPortalClick,
    onLoad,
    ...props
}: GroupProps & {
    onPortalClick: () => void;
    onLoad: () => void
}) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>();
    const [modelError, setModelError] = useState<Error | null>(null);

    // Load the model with proper error typing
    const { scene } = useGLTF(MODEL_PATH, undefined, undefined, (e: unknown) => {
        const error = e instanceof Error ? e : new Error(String(e));
        console.error('Error loading model:', error);
        setModelError(error);
    });

    useEffect(() => {
        if (modelError) {
            console.error('Model failed to load:', modelError);
            return;
        }

        try {
            // Traverse the scene and handle materials
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // Clone material to avoid shared references
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map((mat) => mat.clone());
                    } else {
                        child.material = child.material.clone();
                    }

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Create glow effect
            const geometry = new THREE.SphereGeometry(3.5, 32, 32);
            const material = new THREE.MeshStandardMaterial({
                color: 0x00ffff,
                emissive: 0x90EE90,
                emissiveIntensity: 1.0,
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide,
            });

            glowRef.current = new THREE.Mesh(geometry, material);
            glowRef.current.position.set(0, 2.3, 0);
            groupRef.current?.add(glowRef.current);

            onLoad();
        } catch (e) {
            const error = e instanceof Error ? e : new Error(String(e));
            console.error('Error setting up model:', error);
            setModelError(error);
        }

        // Cleanup function
        return () => {
            if (glowRef.current) {
                groupRef.current?.remove(glowRef.current);
                glowRef.current.geometry.dispose();

                if (Array.isArray(glowRef.current.material)) {
                    glowRef.current.material.forEach((mat) => mat.dispose());
                } else {
                    glowRef.current.material.dispose();
                }
            }

            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach((mat) => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });
        };
    }, [scene, onLoad, modelError]);

    useFrame(({ clock }) => {
        if (modelError) return;

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

    if (modelError) {
        return null;
    }

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