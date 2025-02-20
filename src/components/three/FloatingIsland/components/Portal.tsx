import {ThreeEvent, useFrame} from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface PortalProps {
    onPortalClick: () => void;
}

export const Portal: React.FC<PortalProps> = ({ onPortalClick }) => {
    const portalRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (portalRef.current) {
            const glow = Math.sin(clock.elapsedTime * 2) * 0.3 + 1.2;
            (portalRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
        }
    });

    return (
        <group
            position={[0, 2.3, 0]}
            onClick={(e: ThreeEvent<MouseEvent>) => {
                e.stopPropagation();
                onPortalClick();
            }}
        >
            <mesh ref={portalRef}>
                <torusGeometry args={[1, 0.2, 32, 48]} />
                <meshStandardMaterial
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={1.2}
                    metalness={0.9}
                    roughness={0.2}
                />
            </mesh>
            <mesh>
                <circleGeometry args={[0.9, 32]} />
                <meshStandardMaterial
                    color="#90EE90"
                    emissive="#90EE90"
                    emissiveIntensity={0.8}
                    transparent={true}
                    opacity={0.7}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};