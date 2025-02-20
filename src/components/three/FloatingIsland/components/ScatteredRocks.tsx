import * as THREE from "three"

interface ScatteredRocksProps {
    count?: number;
    radius?: number;
}

export const ScatteredRocks: React.FC<ScatteredRocksProps> = ({ count = 8, radius = 2.5 }) => (
    <>
        {[...Array(count)].map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const scale = 0.2 + Math.random() * 0.3;
            return (
                <mesh
                    key={`rock-${i}`}
                    position={[
                        Math.cos(angle) * radius + Math.random() * 0.5,
                        1.1,
                        Math.sin(angle) * radius + Math.random() * 0.5
                    ]}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                    scale={scale}
                >
                    <dodecahedronGeometry args={[1, 1]} />
                    <meshStandardMaterial
                        color={new THREE.Color('#808080').offsetHSL(0, 0, Math.random() * 0.2 - 0.1)}
                        roughness={0.8}
                        metalness={0.2}
                        emissive="#404040"
                        emissiveIntensity={0.1}
                    />
                </mesh>
            );
        })}
    </>
);
