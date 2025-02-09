// components/three/Room.tsx
import { useGLTF } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

const MODEL_PATH = '/models/r.glb';

interface RoomProps extends GroupProps {
    onLoad: () => void;
    onClick: (event: ThreeEvent<MouseEvent>) => void;
    onDesktopClick: () => void;
}

export default function Room({ onLoad, onClick, onDesktopClick, ...props }: RoomProps) {
    const [modelError, setModelError] = useState<Error | null>(null);
    const { scene } = useGLTF(MODEL_PATH, undefined, undefined, (e: unknown) => {
        const error = e instanceof Error ? e : new Error(String(e));
        console.error('Error loading model:', error);
        setModelError(error);
    });
    const [hoveredObject, setHoveredObject] = useState<string | null>(null);

    useEffect(() => {
        if (modelError) {
            console.error('Model failed to load:', modelError);
            return;
        }

        try {
            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    if (child.name === 'Plane025' || child.name === 'Plane.025') {
                        child.userData.isDesktop = true;
                    }

                    child.material = child.material.clone();

                    if (child.userData.isDesktop) {
                        const material = child.material as THREE.MeshStandardMaterial;
                        material.emissive = new THREE.Color(0x444444);
                        material.emissiveIntensity = hoveredObject === child.name ? 2 : 1;
                    }

                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            const box = new THREE.Box3().setFromObject(scene);
            const center = box.getCenter(new THREE.Vector3());
            scene.position.sub(center);

            onLoad();
        } catch (e) {
            const error = e instanceof Error ? e : new Error(String(e));
            console.error('Error setting up model:', error);
            setModelError(error);
        }

        // Cleanup function
        return () => {
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
    }, [scene, onLoad, hoveredObject, modelError]);

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        if (e.object.userData.isDesktop) {
            setHoveredObject(e.object.name);
            document.body.style.cursor = 'pointer';
        }
    };

    const handlePointerOut = () => {
        setHoveredObject(null);
        document.body.style.cursor = 'default';
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (e.object.userData.isDesktop) {
            onDesktopClick();
        } else {
            onClick(e);
        }
    };

    if (modelError) {
        return null;
    }

    return (
        <primitive
            object={scene}
            {...props}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
        />
    );
}