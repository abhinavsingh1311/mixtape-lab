import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const MovingStars: React.FC = () => {
    const { camera } = useThree();
    const pointsRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const starCount = 50000;
        const positions = new Float32Array(starCount * 3);
        const speeds = new Float32Array(starCount);

        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 3000;
            positions[i + 1] = (Math.random() - 0.5) * 3000;
            positions[i + 2] = (Math.random() - 0.5) * 3000;
            speeds[i / 3] = Math.random() * 0.5 + 5.0;
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
        return geo;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.getAttribute('position');
            const speeds = pointsRef.current.geometry.getAttribute('speed');
            const array = positions.array as Float32Array;
            const speedArray = speeds.array as Float32Array;

            for (let i = 0; i < array.length; i += 3) {
                array[i + 2] += delta * 200 * speedArray[i / 3];
                if (array[i + 2] > camera.position.z + 1500) {
                    array[i + 2] = camera.position.z - 1500;
                }
            }

            positions.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={2.5}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};
