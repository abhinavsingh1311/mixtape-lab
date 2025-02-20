import { GroupProps } from '@react-three/fiber';
import * as THREE from 'three';

interface TreeProps {
    position: [number, number, number];
    scale?: number;
}

export const Tree: React.FC<TreeProps> = ({ position, scale = 1 }) => (
    <group position={position} scale={scale}>
        {/* Trunk with bark texture effect */}
        <mesh castShadow position={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
            <meshStandardMaterial
                color="#5c4033"
                roughness={0.9}
                metalness={0.1}
                emissive="#2b1810"
                emissiveIntensity={0.2}
            />
        </mesh>
        {/* Multiple layers of foliage for fuller look */}
        {[0.8, 1.1, 1.4, 1.7].map((height, i) => (
            <mesh key={i} castShadow position={[0, height, 0]}>
                <coneGeometry args={[0.5 - i * 0.08, 0.6, 8]} />
                <meshStandardMaterial
                    color={new THREE.Color('#2d5a27').offsetHSL(0, 0, i * 0.04)}
                    emissive="#1a472a"
                    emissiveIntensity={0.2}
                    roughness={0.8}
                />
            </mesh>
        ))}
    </group>
);