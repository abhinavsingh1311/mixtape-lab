// src/pages/solar-system.tsx
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';
import { AlienClock } from "@/components/ui/AlienClock";
import { useSound } from 'use-sound';
import { Howler } from 'howler';
import { LoadingScreen } from '@/components/solar-system/LoadingScreen';
import { Stars } from '@react-three/drei';
import type { CameraMode } from '@/components/three/SolarSystem/types';

// Import responsive components
import { SolarSystemScene } from '@/components/solar-system/SolarSystemScene';
import { Navigation } from '@/components/solar-system/Navigation';
import { ResponsiveGuide } from '@/components/solar-system/ResponsiveGuide';
import Script from 'next/script';

export default function SolarSystemPage() {
    const [isMuted, setIsMuted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [cameraMode, setCameraMode] = useState<CameraMode>('locked');

    useEffect(() => {
        // Load saved camera mode when page loads
        const savedMode = localStorage.getItem('cameraMode');
        if (savedMode === 'free' || savedMode === 'locked') {
            setCameraMode(savedMode as CameraMode);
        }
        localStorage.setItem('cameraMode', cameraMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Sound effects
    const [playSpaceAmbient, { stop: stopSpaceAmbient, sound: ambientSound }] = useSound(
        '/sounds/ambient-space.mp3',
        {
            volume: 0.2,
            loop: true,
            interrupt: true
        }
    );

    // Detect mobile device on client side
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Check on initial load
        checkMobile();

        // Check on resize
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Handle sounds - start after user interaction
    useEffect(() => {
        const handleUserInteraction = () => {
            if (ambientSound) {
                playSpaceAmbient();
            }
        };

        // Add listeners for user interaction
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('keydown', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
            stopSpaceAmbient();
        };
    }, [playSpaceAmbient, stopSpaceAmbient, ambientSound]);

    // Handle mute state
    useEffect(() => {
        Howler.volume(isMuted ? 0 : 1);
    }, [isMuted]);

    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-5R3TT33HR4"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-5R3TT33HR4');
                `}
            </Script>
            <ErrorBoundary>
                <div className="h-screen w-screen relative bg-black">
                    <Navigation
                        cameraMode={cameraMode}
                        setCameraMode={setCameraMode}
                        isMuted={isMuted}
                        setIsMuted={setIsMuted}
                        isMobile={isMobile}
                    />
                    <ResponsiveGuide isMobile={isMobile} />
                    <div className={`fixed ${isMobile ? 'bottom-4 left-4 z-20' : 'bottom-4 left-4 z-20'} text-white`}>
                        <a className={`${isMobile ? 'text-xl' : 'text-2xl'} mb-2`} href="https://github.com/abhinavsingh1311" target='_blank'>Abhinav Singh</a>
                        <div className={isMobile ? "scale-75 origin-left" : "text-xl"}>
                            <AlienClock />
                        </div>
                    </div>
                    <div className="absolute inset-0">
                        <Canvas
                            camera={{
                                position: [0, 50, 150],
                                fov: isMobile ? 60 : 45, // Wider field of view on mobile
                                near: 0.1,
                                far: 3000
                            }}
                            dpr={[1, isMobile ? 1.5 : 2]} // Lower resolution on mobile for performance
                        >
                            <Suspense fallback={<LoadingScreen />}>
                                <Stars
                                    radius={500}
                                    depth={100}
                                    count={isMobile ? 5000 : 10000} // Fewer stars on mobile for performance
                                    factor={6}
                                    saturation={0}
                                    fade
                                    speed={1}
                                />
                                <SolarSystemScene
                                    cameraMode={cameraMode}
                                    setCameraMode={setCameraMode}
                                    isMobile={isMobile}
                                />
                            </Suspense>
                        </Canvas>
                    </div>
                </div>
            </ErrorBoundary>
        </>
    );
}