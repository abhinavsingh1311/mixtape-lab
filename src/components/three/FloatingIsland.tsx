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
}: GroupProps & { onPortalClick: () => void; onLoad: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const glowRef = useRef<THREE.Mesh>();
    const [modelError, setModelError] = useState<Error | null>(null);

    // Proper error handling with type-safe callback
    const { scene } = useGLTF(MODEL_PATH, undefined, undefined, (error) => {
        const message = error instanceof Error ? error.message : 'Model load failed';
        const err = new Error(message);
        console.error('Model load error:', err);
        setModelError(err);
    });

    useEffect(() => {
        if (!scene || modelError) return;

        try {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    // Type-safe material cloning
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map(mat => mat.clone());
                    } else {
                        child.material = child.material.clone();
                    }
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Glow effect setup
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

        } catch (error) {
            const err = error instanceof Error ? error : new Error('Unknown error');
            setModelError(err);
        }

        return () => {
            // Proper resource disposal with type assertions
            scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                }
            });

            if (glowRef.current) {
                glowRef.current.geometry.dispose();
                if ('dispose' in glowRef.current.material)
                    glowRef.current.material.dispose();
            }
        };
    }, [scene, onLoad, modelError]);

    useFrame(({ clock }) => {
        if (modelError || !groupRef.current) return;

        if (glowRef.current) {
            const pulse = Math.sin(clock.elapsedTime * 1.5) * 0.03;
            glowRef.current.scale.setScalar(1.0 + pulse);
            glowRef.current.rotation.y = clock.elapsedTime * 0.15;
        }

        groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.2;
        groupRef.current.rotation.y = clock.elapsedTime * 0.03;
    });

    if (modelError) {
        return (
            <mesh position={[0, -2, 0]} scale={[2, 0.5, 2]}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
        );
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