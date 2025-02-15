// src/pages/solar-system.tsx
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import ErrorBoundary from '@/components/ErrorBoundary';
import {AlienClock} from "@/components/ui/AlienClock";
import { useSound } from 'use-sound';
import { Howler } from 'howler';

// Define CameraMode type
type CameraMode = 'free' | 'locked';

// Dynamically import the SolarSystem component
const SolarSystem = dynamic(() => import('@/components/three/SolarSystem'), {
    ssr: false
});

function LoadingScreen() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
                <div className="text-2xl mb-4">Loading Solar System</div>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full animate-pulse" />
                </div>
            </div>
        </div>
    );
}

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

    const [playPlanetSound] = useSound(
        '/sounds/transition.mp3',
        {
            volume: 0.4,
            interrupt: true
        }
    );
    // Handle sound on mount/unmount
    useEffect(() => {
        playSpaceAmbient();
        return () => {
            stopSpaceAmbient();
        };
    }, [playSpaceAmbient, stopSpaceAmbient]);

    // Mute control
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
            <LoadingScreen />
            <div className="h-screen w-screen relative bg-black">
                <div className="fixed top-4 right-4 z-50 flex gap-4">
                    <button
                        className="fixed top-20 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                        onClick={() => setCameraMode((prev: CameraMode) => (prev === 'free' ? 'locked' : 'free'))}
                    >
                        {cameraMode === 'free' ? '🔒 Lock Camera' : '🔓 Free Camera'}
                    </button>
                    <Link
                        href="/"
                        className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                        🏠 Home
                    </Link>
                </div>

                <div className="fixed bottom-0 right-4 z-50 bg-black/50 p-4 rounded-lg text-white">
                    <h2 className="text-xl mb-2">Navigation Guide</h2>
                    <ul className="space-y-1">
                        <li>• Click planets to zoom in/out</li>
                        <li>• Drag to rotate view</li>
                        <li>• Scroll to zoom in/out</li>
                        <li>• Hover over planets for info</li>
                    </ul>
                </div>

                <div className="fixed bottom-4 left-4 z-20 text-white">
                    <h1 className="text-2xl mb-2">Abhinav Singh</h1>
                    <div className="text-xl">{<AlienClock/>}</div>
                </div>

                <div className="absolute inset-0">
                    <Canvas
                        camera={{
                            position: [0, 50, 150], // Closer initial position
                            fov: 45,
                            near: 0.1,
                            far: 3000 // Increased for larger zoom out range
                        }}
                    >
                        <Suspense fallback={null}>
                            <Stars
                                radius={500} // Increased star field
                                depth={100}
                                count={10000} // More stars
                                factor={6}
                                saturation={0}
                                fade
                                speed={1}
                            />
                            <SolarSystem
                                cameraMode={cameraMode}
                                setCameraMode={setCameraMode}
                                // onPlanetHover={() => !isMuted && playPlanetSound()}
                            />
                            <OrbitControls
                                enablePan={true}
                                enableZoom={true}
                                minDistance={20} // Closer minimum distance
                                maxDistance={2000} // Further maximum distance
                                minPolarAngle={0} // Allow full vertical rotation
                                maxPolarAngle={Math.PI} // Allow full vertical rotation
                                dampingFactor={0.05}
                                rotateSpeed={0.5}
                                zoomSpeed={1.2} // Increased zoom speed
                            />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Mobile Warning */}
                <div className="sm:hidden fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                    <div className="text-white text-center">
                        <h2 className="text-2xl mb-4">⚠️ Desktop Recommended</h2>
                        <p>
                            This experience is optimized for desktop viewing.
                            For the best experience, please visit on a larger screen.
                        </p>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
}