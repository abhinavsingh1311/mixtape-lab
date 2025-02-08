import { useGLTF } from '@react-three/drei';
import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

interface RoomProps extends GroupProps {
    onLoad: () => void;
    onClick: (event: ThreeEvent<MouseEvent>) => void;
    onDesktopClick: () => void;
}

export default function Room({ onLoad, onClick, onDesktopClick, ...props }: RoomProps) {
    const { scene } = useGLTF('/models/room.glb');
    const [hoveredObject, setHoveredObject] = useState<string | null>(null);

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // Enable interactions for the desktop plane
                if (child.name === 'Plane025' || child.name === 'Plane.025') {
                    child.userData.isDesktop = true;
                    console.log('Found desktop object:', child.name); // Debug log
                }

                child.material = child.material.clone();

                // Add hover effects for desktop
                if (child.userData.isDesktop) {
                    const material = child.material as THREE.MeshStandardMaterial;
                    material.emissive = new THREE.Color(0x444444);
                    material.emissiveIntensity = hoveredObject === child.name ? 2 : 1;
                }

                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        // Center the scene
        const box = new THREE.Box3().setFromObject(scene);
        const center = box.getCenter(new THREE.Vector3());
        scene.position.sub(center);

        onLoad();

        // Debug log to show all object names
        scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                console.log('Scene object:', child.name);
            }
        });
    }, [scene, onLoad, hoveredObject]);

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
            console.log('Desktop clicked!'); // Debug log
            onDesktopClick();
        } else {
            onClick(e);
        }
    };

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