import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SunCorona } from './SunCorona';

export const Sun: React.FC = () => {
    const sunRef = useRef<THREE.Mesh>(null);
    const [sunTexture, setSunTexture] = useState<THREE.Texture>(new THREE.TextureLoader().load('/images/fallback.png'));

    useEffect(() => {
        new THREE.TextureLoader().load(
            '/textures/sun/2k_sun.jpg',
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                setSunTexture(texture);
            }
        );
    }, []);

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <group>
            <mesh ref={sunRef}>
                <sphereGeometry args={[20, 64, 64]} />
                <meshStandardMaterial
                    map={sunTexture}
                    emissive="#FF4500"
                    emissiveIntensity={2}
                    color="#FDB813"
                />
            </mesh>
            <SunCorona />
            <pointLight intensity={8} distance={1000} decay={1.5} color="#ff6600" />
            <pointLight intensity={4} distance={500} decay={2} color="#ff8833" />
        </group>
    );
};