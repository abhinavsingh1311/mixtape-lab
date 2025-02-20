import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AlienClock } from "@/components/ui/AlienClock";
import { useSound } from 'use-sound';
import { Howler } from 'howler';
import { LoadingScreen } from '@/components/solar-system/LoadingScreen';
import { Navigation } from '@/components/solar-system/Navigation';
import { NavigationGuide } from '@/components/solar-system/NavigationGuide';
import { MobileWarning } from '@/components/solar-system/MobileWarning';
import { SolarSystemScene } from '@/components/solar-system/SolarSystemScene';
import type { CameraMode } from '@/components/three/SolarSystem/types';

export default function SolarSystemPage() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [cameraMode, setCameraMode] = useState<CameraMode>('free');
    const [isMuted, setIsMuted] = useState(false);

    const [playSpaceAmbient, { stop: stopSpaceAmbient }] = useSound(
        '/sounds/ambient-space.mp3',
        {
            volume: 0.2,
            loop: true,
            interrupt: true
        }
    );

    useEffect(() => {
        playSpaceAmbient();
        return () => {
            stopSpaceAmbient();
        };
    }, [playSpaceAmbient, stopSpaceAmbient]);

    useEffect(() => {
        Howler.volume(isMuted ? 0 : 1);
    }, [isMuted]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <ErrorBoundary>
            <div className="h-screen w-screen relative bg-black">
                <Navigation
                    cameraMode={cameraMode}
                    setCameraMode={setCameraMode}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                />

                <NavigationGuide />

                <div className="fixed bottom-4 left-4 z-20 text-white">
                    <h1 className="text-2xl mb-2">Abhinav Singh</h1>
                    <div className="text-xl">
                        <AlienClock />
                    </div>
                </div>

                <div className="absolute inset-0">
                    <Canvas
                        camera={{
                            position: [0, 50, 150],
                            fov: 45,
                            near: 0.1,
                            far: 3000
                        }}
                    >
                        <Suspense fallback={<LoadingScreen />}>
                            <SolarSystemScene
                                cameraMode={cameraMode}
                                setCameraMode={setCameraMode}
                            />
                        </Suspense>
                    </Canvas>
                </div>

                <MobileWarning />
            </div>
        </ErrorBoundary>
    );
}