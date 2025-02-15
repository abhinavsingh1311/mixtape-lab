// components/three/AutoTrackingSystem.tsx
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function AutoTrackingSystem() {
    const { camera } = useThree();
    const target = useRef(new THREE.Vector3());
    const mouse = useRef({ x: 0, y: 0 });

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        target.current.x = mouse.current.x * 5 + Math.sin(time * 0.5) * 0.5;
        target.current.y = mouse.current.y * 2 + Math.cos(time * 0.3) * 0.3 + 3;
        target.current.z = 10 + Math.sin(time * 0.2) * 2;

        camera.position.lerp(target.current, 0.05);
        camera.lookAt(0, 1, 0);
    });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouse.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 2,
                y: (e.clientY / window.innerHeight - 0.5) * 2,
            };
        };

        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return null;
}

export default  AutoTrackingSystem ;

