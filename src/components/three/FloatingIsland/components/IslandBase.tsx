export const IslandBase: React.FC = () => (
    <>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
            <cylinderGeometry args={[3, 3.5, 2, 40]} />
            <meshStandardMaterial
                color="#8b4513"
                roughness={0.7}
                metalness={0.3}
                emissive="#3d200b"
                emissiveIntensity={2}
            />
        </mesh>
        <mesh castShadow position={[0, 1, 0]}>
            <cylinderGeometry args={[2.8, 3, 0.5, 32]} />
            <meshStandardMaterial
                color="#3b7a23"
                roughness={0.9}
                metalness={0.1}
                emissive="#1a472a"
                emissiveIntensity={2}
            />
        </mesh>
    </>
);