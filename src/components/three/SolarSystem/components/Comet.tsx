import {useMemo, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Comet: React.FC = () => {
    const cometRef = useRef<THREE.Mesh>(null);
    const trailRef = useRef<THREE.Line>();
    const [trailPoints] = useState(() => new Float32Array(100 * 3));
    const [position] = useState(new THREE.Vector3());
    const [angle, setAngle] = useState(0);

    const trailGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(trailPoints, 3));
        return geometry;
    }, [trailPoints]);

    useFrame((state) => {
        const speed = 0.3;
        setAngle(prev => prev + speed * 0.01);
        position.set(
            Math.cos(angle) * 250,
            Math.sin(angle * 2) * 50,
            Math.sin(angle) * 250
        );

        if (cometRef.current) {
            cometRef.current.position.copy(position);
            cometRef.current.rotation.y += 0.05;
        }

        const positions = trailGeometry.attributes.position.array as Float32Array;
        for (let i = positions.length - 3; i >= 3; i -= 3) {
            positions[i] = positions[i - 3];
            positions[i + 1] = positions[i - 2];
            positions[i + 2] = positions[i - 1];
        }
        positions[0] = position.x;
        positions[1] = position.y;
        positions[2] = position.z;
        trailGeometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            <mesh ref={cometRef}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial
                    color="#aaddff"
                    emissive="#44aaff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <line ref={trailRef as any}>
                <primitive object={trailGeometry} />
                <lineBasicMaterial
                    color="#44aaff"
                    transparent
                    opacity={0.2}
                    linewidth={2}
                />
            </line>
        </group>
    );
};