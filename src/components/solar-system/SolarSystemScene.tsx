import {OrbitControls, Stars} from '@react-three/drei';
import SolarSystem from '@/components/three/SolarSystem';
import { CameraMode } from '@/components/three/SolarSystem/types';

interface SolarSystemSceneProps {
    cameraMode: CameraMode;
    setCameraMode: (mode: CameraMode) => void;
}

export const SolarSystemScene: React.FC<SolarSystemSceneProps> = ({
                                                                      cameraMode,
                                                                      setCameraMode
                                                                  }) => {
    return (
        <>
            <Stars
                radius={500}
                depth={100}
                count={10000}
                factor={6}
                saturation={0}
                fade
                speed={1}
            />
            <SolarSystem
                cameraMode={cameraMode}
                setCameraMode={setCameraMode}
            />
            <OrbitControls
                enablePan={true}
                enableZoom={true}
                minDistance={20}
                maxDistance={2000}
                minPolarAngle={0}
                maxPolarAngle={Math.PI}
                dampingFactor={0.05}
                rotateSpeed={0.5}
                zoomSpeed={1.2}
            />
        </>
    );
};
