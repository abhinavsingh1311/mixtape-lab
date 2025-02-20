import * as THREE from 'three';

export const OrbitLine: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial
            color="#4a4a4a"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
        />
    </mesh>
);
