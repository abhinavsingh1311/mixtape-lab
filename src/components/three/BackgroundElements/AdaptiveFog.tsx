// components/three/BackgroundElements/AdaptiveFog.tsx
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const AdaptiveFog = () => {
    const { scene } = useThree();

    useEffect(() => {
        const fog = new THREE.FogExp2(0x0a0a0a, 0.025);
        scene.fog = fog;

        return () => {
            scene.fog = null;
        };
    }, [scene]);

    return null;
};