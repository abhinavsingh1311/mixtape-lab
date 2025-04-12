import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import SolarSystem from '@/components/three/SolarSystem';
import { CameraMode } from '@/components/three/SolarSystem/types';

interface SolarSystemSceneProps {
    cameraMode: CameraMode;
    setCameraMode: (mode: CameraMode) => void;
    isMobile: boolean;
}

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
    cameraMode,
    setCameraMode,
    isMobile
}) => {
    // Get camera AND gl (renderer) from useThree
    const { camera, gl } = useThree();

    // In SolarSystemScene.tsx
    useEffect(() => {
        if (isMobile) {
            // Adjust camera for mobile
            camera.position.set(0, 75, 200);

            // Reduce rendering quality for better performance
            gl.setPixelRatio(Math.min(1.5, window.devicePixelRatio));
        } else {
            // Desktop camera position
            camera.position.set(0, 50, 150);
            gl.setPixelRatio(window.devicePixelRatio);
        }

        camera.updateProjectionMatrix();
    }, [camera, isMobile, gl]);

    return (
        <>  <SolarSystem
            cameraMode={cameraMode}
            setCameraMode={setCameraMode}
            isMobile={isMobile}
        />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                minDistance={isMobile ? 50 : 20} // Larger minimum distance for mobile
                maxDistance={2000}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                dampingFactor={0.05}
                rotateSpeed={isMobile ? 0.7 : 0.5} // Increased rotation speed for mobile
                zoomSpeed={1.2}
                // Touch-specific properties
                enableDamping={true}
                touches={{
                    ONE: THREE.TOUCH.ROTATE,
                    TWO: THREE.TOUCH.DOLLY_PAN
                }}
            />
        </>
    );
};
