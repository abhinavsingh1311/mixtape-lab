import { useMemo } from 'react';
import * as THREE from 'three';

export const AsteroidBelt: React.FC = () => {
    const asteroids = useMemo(() => {
        const innerRadius = 120;
        const outerRadius = 140;
        const count = 1000;
        const temp = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
            const verticalOffset = (Math.random() - 0.5) * 4;

            temp.push({
                position: [
                    Math.cos(angle) * distance,
                    verticalOffset,
                    Math.sin(angle) * distance
                ],
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ],
                scale: Math.random() * 0.3 + 0.1
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {asteroids.map((asteroid, i) => (
                <mesh
                    key={i}
                    position={asteroid.position as any}
                    rotation={asteroid.rotation as any}
                >
                    <dodecahedronGeometry args={[asteroid.scale]} />
                    <meshStandardMaterial
                        color="#888888"
                        roughness={0.8}
                        metalness={0.2}
                    />
                </mesh>
            ))}
        </group>
    );
};