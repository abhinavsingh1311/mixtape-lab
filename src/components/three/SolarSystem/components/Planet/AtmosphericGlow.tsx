import * as THREE from 'three'

export const AtmosphericGlow: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
        />
    </mesh>
);