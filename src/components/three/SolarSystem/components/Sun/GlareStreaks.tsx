import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const GlareStreaks: React.FC = () => {
    const streaksRef = useRef<THREE.Group>(null);

    const streaks = useMemo(() => {
        const streakCount = 8;
        const streakData = [];

        for (let i = 0; i < streakCount; i++) {
            const angle = (Math.PI * 2 * i) / streakCount + Math.random() * 0.5;
            const length = 25 + Math.random() * 15;
            const width = 0.5 + Math.random() * 1.5;

            streakData.push({ angle, length, width });
        }

        return streakData;
    }, []);

    useFrame(({ clock }) => {
        if (streaksRef.current) {
            streaksRef.current.rotation.z = clock.getElapsedTime() * 0.05;
            streaksRef.current.children.forEach((child, i) => {
                const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.2;
                child.scale.setX(scale);
            });
        }
    });

    return (
        <group ref={streaksRef}>
            {streaks.map((streak, i) => (
                <mesh
                    key={i}
                    rotation-z={streak.angle}
                    position-z={-0.1}
                >
                    <planeGeometry args={[streak.length, streak.width]} />
                    <meshBasicMaterial
                        color="#ffaa44"
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
};