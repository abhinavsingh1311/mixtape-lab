import { useGLTF } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

const MODEL_PATH = '/models/float-optimized.glb';

export default function FloatingIsland({
    onPortalClick,
    onLoad,
    ...props
}: GroupProps & { onPortalClick: () => void; onLoad: () => void }) {
    const groupRef = useRef<THREE.Group>(null);
    const [scene, setScene] = useState<THREE.Group | null>(null);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);

        const loadModel = async () => {
            try {
                const gltf = await loader.loadAsync(MODEL_PATH);

                // Handle materials and shadows
                const materials = new Set<THREE.Material>();
                gltf.scene.traverse((child) => {
                    if (child instanceof THREE.Mesh) {
                        // Enable shadows
                        child.castShadow = true;
                        child.receiveShadow = true;

                        // Track materials for cleanup
                        if (Array.isArray(child.material)) {
                            child.material.forEach(m => materials.add(m.clone()));
                        } else {
                            materials.add(child.material.clone());
                        }
                    }
                });

                setScene(gltf.scene);
                onLoad();

                // Cleanup function
                return () => {
                    materials.forEach(m => m.dispose());
                    gltf.scene.traverse(child => {
                        if (child instanceof THREE.Mesh) {
                            child.geometry.dispose();
                        }
                    });
                };
            } catch (err) {
                console.error('Model load failed:', err);
                setError(err instanceof Error ? err : new Error('Failed to load 3D model'));
            }
        };

        loadModel();
    }, [onLoad]);

    useEffect(() => {
        if (!scene) return;

        const interval = setInterval(() => {
            if (groupRef.current) {
                groupRef.current.rotation.y += 0.005;
                groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
            }
        }, 1000 / 60);

        return () => clearInterval(interval);
    }, [scene]);

    if (error) {
        return (
            <mesh position={[0, -2, 0]} scale={[2, 0.5, 2]}>
                <boxGeometry />
                <meshStandardMaterial color="red" />
            </mesh>
        );
    }

    return scene ? (
        <group ref={groupRef} {...props}>
            <primitive
                object={scene}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    onPortalClick();
                }}
            />
        </group>
    ) : null;
}