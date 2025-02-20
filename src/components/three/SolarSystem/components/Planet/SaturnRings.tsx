import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const SaturnRings: React.FC<{ planetSize: number }> = ({ planetSize }) => {
    const [ringColorMap, ringAlphaMap] = useTexture([
        '/textures/saturn/saturn_rings.jpg',
        '/textures/saturn/saturnringpattern.gif'
    ]);

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planetSize * 1.5, planetSize * 2.5, 64]} />
            <meshStandardMaterial
                map={ringAlphaMap}
                alphaMap={ringColorMap}
                transparent
                side={THREE.DoubleSide}
                opacity={0.85}
                depthWrite={false}
            />
        </mesh>
    );
};
