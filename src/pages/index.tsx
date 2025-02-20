import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useRouter } from 'next/router';
import useSound from 'use-sound';
import * as THREE from 'three';
import FloatingIsland from '@/components/three/FloatingIsland';
import { ClosedSpaceScene } from '@/components/three/BackgroundElements/ClosedSpaceScene';
import { AlienClock } from '@/components/ui/AlienClock';
import {IntroScene} from '@/components/home/IntroScene';
import { AutoTrackingSystem } from '@/components/home/AutoTracking';
import { LoadingScreen } from '@/components/home/LoadingScreen';
import { SoundController } from '@/components/home/SoundController';

export default function Home() {
    const [cameraMode, setCameraMode] = useState<'free' | 'tracking'>('tracking');
    const [showPortalMessage, setShowPortalMessage] = useState(true);
    const [isIslandVisible, setIsIslandVisible] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [ambientStarted, setAmbientStarted] = useState(false);
    const router = useRouter();

    const [playAmbient, { stop: stopAmbient }] = useSound('/sounds/ambient-space.mp3', {
        volume: 0.3,
        loop: true,
        interrupt: true
    });

    const [playPortalHum] = useSound('/sounds/portal-open.mp3', {
        volume: 0.2,
        loop: true,
        interrupt: true
    });

    useEffect(() => {
        // Start ambient sound immediately
        if (!ambientStarted) {
            playAmbient();
            setAmbientStarted(true);
        }

        if (showIntro) {
            let messageInterval: NodeJS.Timeout;
            const timer = setTimeout(() => {
                messageInterval = setInterval(() => {
                    setCurrentMessage(prev => {
                        if (prev >= 3) {
                            clearInterval(messageInterval);
                            setTimeout(() => {
                                setShowIntro(false);
                                setIsIslandVisible(true);
                                stopAmbient();
                            }, 1500);
                            return prev;
                        }
                        return prev + 1;
                    });
                }, 3000);
            }, 100);

            return () => {
                clearTimeout(timer);
                if (messageInterval) clearInterval(messageInterval);
            };
        }
    }, [showIntro, ambientStarted, playAmbient]);

    const handlePortalClick = () => {
        setShowPortalMessage(false);
        setIsIslandVisible(false);
        stopAmbient();
        setTimeout(() => router.push('/solar-system'), 500);
    };

    const startAmbient = () => {
        if (!ambientStarted) {
            playAmbient();
            setAmbientStarted(true);
        }
    };

    return (
        <div className="h-screen w-screen relative bg-black">
            <div
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 pointer-events-none
                ${showIntro ? 'opacity-0' : isIslandVisible ? 'opacity-0' : 'opacity-100'}`}
            />

            {isIslandVisible && <AlienClock />}

            {isIslandVisible && (
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                    <button
                        className="bg-gray-800 text-white px-4 py-2 font-sans rounded-lg hover:bg-gray-700"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                    <button
                        className="bg-gray-800 text-white px-4 py-2 font-sans rounded-lg hover:bg-gray-700"
                        onClick={() => setCameraMode(prev => prev === 'free' ? 'tracking' : 'free')}
                    >
                        {cameraMode === 'free' ? 'Lock' : 'Free'}
                    </button>
                </div>
            )}

            <SoundController
                isMuted={isMuted}
                showIntro={showIntro}
                isIslandVisible={isIslandVisible}
                stopAmbient={stopAmbient}
                playPortalHum={playPortalHum}
                ambientStarted={ambientStarted}
                playAmbient={startAmbient}
            />

            <Canvas
                shadows
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.5
                }}
            >
                <color attach="background" args={['#000000']} />
                <Suspense fallback={<LoadingScreen />}>
                    {showIntro ? (
                        <IntroScene
                            onComplete={() => setShowIntro(false)}
                            currentMessage={currentMessage}
                        />
                    ) : (
                        <>
                            <EffectComposer>
                                <Bloom
                                    blendFunction={BlendFunction.ADD}
                                    mipmapBlur
                                    luminanceSmoothing={0}
                                    intensity={1.5}
                                />
                            </EffectComposer>

                            <ClosedSpaceScene />
                            {isIslandVisible && (
                                <FloatingIsland
                                    position={[0, -2, 0]}
                                    scale={[0.5, 0.5, 0.5]}
                                    onPortalClick={handlePortalClick}
                                    onLoad={() => console.log('Island loaded')}
                                />
                            )}

                            <ambientLight intensity={0.5} />
                            <pointLight
                                position={[10, 10, 10]}
                                intensity={1}
                                castShadow
                            />
                            <hemisphereLight
                                intensity={0.3}
                                color="#ffffff"
                                groundColor="#000000"
                            />

                            {cameraMode === 'free' ? (
                                <OrbitControls
                                    enableDamping
                                    dampingFactor={0.05}
                                    minDistance={8}
                                    maxDistance={25}
                                    maxPolarAngle={Math.PI / 2 - 0.1}
                                />
                            ) : (
                                <AutoTrackingSystem />
                            )}
                        </>
                    )}
                    <PerspectiveCamera
                        makeDefault
                        position={[0, 8, 15]}
                        near={0.1}
                        far={1000}
                    />
                </Suspense>
            </Canvas>

            {showPortalMessage && isIslandVisible && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 font-sans text-white text-center text-lg bg-black/50 p-4 rounded-lg backdrop-blur-sm z-50">
                    Click on the portal to enter!!
                </div>
            )}
        </div>
    );
}