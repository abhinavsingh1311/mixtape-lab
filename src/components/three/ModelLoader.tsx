// components/three/ModelLoader.tsx
import { useGLTF } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { GroupProps } from '@react-three/fiber';

// Pre-load models
useGLTF.preload('@/models/f.glb');
useGLTF.preload('@/models/r.glb');

interface ModelLoaderProps extends GroupProps {
    modelPath: string;
    onLoad?: () => void;
    onError?: (error: Error) => void;
}

type GLTFResult = GLTF & {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.Material>;
}

export function ModelLoader({
    modelPath,
    onLoad,
    onError,
    ...props
}: ModelLoaderProps) {
    const { scene } = useGLTF(modelPath) as GLTFResult;

    useEffect(() => {
        try {
            // Clone materials to avoid sharing
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map(mat => mat.clone());
                    } else {
                        child.material = child.material.clone();
                    }

                    // Enable shadows
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            // Center the model
            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            onLoad?.();
        } catch (error) {
            console.error(`Error processing model ${modelPath}:`, error);
            onError?.(error instanceof Error ? error : new Error(String(error)));
        }

        // Cleanup
        return () => {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (Array.isArray(child.material)) {
                        child.material.forEach(mat => mat.dispose());
                    } else {
                        child.material.dispose();
                    }
                    child.geometry.dispose();
                }
            });
        };
    }, [scene, modelPath, onLoad, onError]);

    return (
        <Suspense fallback={null}>
            <primitive object={scene} {...props} />
        </Suspense>
    );
}