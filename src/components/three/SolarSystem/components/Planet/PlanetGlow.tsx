import * as THREE from "three"

export const PlanetGlow: React.FC<{ radius: number; color: string }> = ({ radius, color }) => (
    <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            emissive={color}
            emissiveIntensity={0.5}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
        />
    </mesh>
);
