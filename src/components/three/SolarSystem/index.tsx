import { useState, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetSystem } from './models/PlanetSystem';
import { Sun } from './components/Sun/Sun';
import { AsteroidBelt } from './components/AsteroidBelt';
import { Comet } from './components/Comet';
import { Planet } from './components/Planet/Planet';
import { CameraMode } from './types';
import { useRouter } from 'next/router';

interface SolarSystemProps {
    cameraMode: CameraMode;
    setCameraMode: (mode: CameraMode) => void;
    isMobile: boolean;
}

export default function SolarSystem({ cameraMode,
    setCameraMode,
    isMobile }: SolarSystemProps) {
    const { camera } = useThree();
    const router = useRouter();
    const [targetPosition, setTargetPosition] = useState<THREE.Vector3 | null>(null);
    const originalPosition = useMemo(() => camera.position.clone(), [camera]);

    const planets = useMemo(() => [
        new PlanetSystem({
            size: isMobile ? 1.2 : 1.5,
            distance: isMobile ? 30 : 40,
            speed: 0.001,
            name: 'Mercury',
            texture: '2k_mercury.jpg',
            bumpMap: 'mercurybump.jpg',
            link: '/planets/mercury',
            description: 'Learn about my journey'
        }),
        new PlanetSystem({
            size: isMobile ? 1.8 : 2.2,
            distance: isMobile ? 45 : 60,
            speed: 0.0008,
            name: 'Venus',
            texture: '2k_venus_surface.jpg',
            bumpMap: 'venusbump.jpg',
            link: '/planets/venus',
            description: 'Explore my work'
        }),
        new PlanetSystem({
            size: isMobile ? 2.0 : 2.5,
            distance: isMobile ? 65 : 85,
            speed: 0.0006,
            name: 'Earth',
            texture: 'earthmap1k.jpg',
            bumpMap: 'earthbump1k.jpg',
            link: '/planets/earth',
            description: 'Technical expertise',
            moons: [{
                texture: '2k_moon_normal.jpg'
            }]
        }),
        new PlanetSystem({
            size: isMobile ? 1.8 : 2.2,
            distance: isMobile ? 85 : 105,
            speed: 0.0004,
            name: 'Mars',
            texture: '2k_mars.jpg',
            bumpMap: 'marsbump1k.jpg',
            link: '/planets/mars',
            description: 'Professional journey'
        }),
        new PlanetSystem({
            size: isMobile ? 3.5 : 4.5,
            distance: isMobile ? 150 : 200,
            speed: 0.0003,
            name: 'Jupiter',
            texture: 'jupitermap.jpg',
            link: '/planets/jupiter',
            description: 'Contact me'
        }),
        new PlanetSystem({
            size: isMobile ? 3.0 : 4.0,
            distance: isMobile ? 190 : 250,
            speed: 0.0002,
            name: 'Saturn',
            texture: 'saturnmap.jpg',
            link: '/planets/saturn',
            description: 'Read my thoughts'
        })
    ], [isMobile]);

    useFrame(() => {
        if (cameraMode === 'locked' && targetPosition) {
            // Adjust camera movement for mobile vs desktop
            const targetX = targetPosition.x * (isMobile ? 2.0 : 2.5);
            const targetY = targetPosition.y + (isMobile ? 20 : 25);
            const targetZ = targetPosition.z * (isMobile ? 1.2 : 1.5);

            camera.position.lerp(
                new THREE.Vector3(targetX, targetY, targetZ),
                0.05
            );
            camera.lookAt(targetPosition);
        } else if (cameraMode === 'free') {
            camera.position.lerp(originalPosition, 0.05);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
        }
    });

    const handlePlanetClick = (route: string, position: THREE.Vector3) => {
        if (cameraMode === 'locked') {
            setCameraMode('free');
            setTargetPosition(null);
        } else {
            setCameraMode('locked');
            setTargetPosition(position);
            router.push(route);
        }
    };

    return (
        <group>
            <Sun />
            {planets.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    onClick={handlePlanetClick}
                    index={index}
                    isMobile={isMobile}
                />
            ))}
            <AsteroidBelt />
            {!isMobile && <Comet />} {/* Disable comet on mobile for performance */}
            <ambientLight intensity={0.5} />
            <hemisphereLight
                intensity={0.8}
                color="#ffffff"
                groundColor="#404040"
            />
            <pointLight
                position={[0, 50, 0]}
                intensity={1.5}
                castShadow
            />
        </group>
    );
}