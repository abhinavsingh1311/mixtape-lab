// components/three/SolarSystem/components/Moon.tsx
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MoonData } from '../types';

interface MoonProps extends MoonData {
    parentSize: number;
}

export const Moon: React.FC<MoonProps> = ({
                                              parentSize,
                                              texture,
                                              size = parentSize * 0.2,
                                              distance = parentSize * 2,
                                              speed = 0.02
                                          }) => {
    const moonRef = useRef<THREE.Mesh>(null);
    const [moonTexture, setMoonTexture] = useState<THREE.Texture>(new THREE.TextureLoader().load('/images/fallback.png'));
    const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

    useEffect(() => {
        new THREE.TextureLoader().load(
            `/textures/moon/${texture}`,
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                setMoonTexture(loadedTexture);
            }
        );
    }, [texture]);

    useFrame(() => {
        setAngle((prev) => prev + speed);
        if (moonRef.current) {
            moonRef.current.position.x = Math.cos(angle) * distance;
            moonRef.current.position.z = Math.sin(angle) * distance;
            moonRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={moonRef} position={[distance, 0, 0]}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
                map={moonTexture}
                metalness={0.2}
                roughness={0.7}
            />
        </mesh>
    );
};