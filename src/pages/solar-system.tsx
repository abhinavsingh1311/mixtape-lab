// src/pages/solar-system.tsx
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SolarSystem = dynamic(() => import('@/components/three/SolarSystem'), {
    ssr: false,
    loading: () => (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
            <div className="text-white text-center">
                <div className="text-2xl mb-4">Loading Solar System</div>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full animate-pulse" />
                </div>
            </div>
        </div>
    )
});

export default function SolarSystemPage() {
    const [cameraMode, setCameraMode] = useState<'free' | 'locked'>('free');
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-screen relative bg-black">
            {/* Control Panel */}
            <div className="fixed top-0 left-0 right-0 p-4 flex justify-between z-50">
                <div className="bg-black/50 p-4 rounded-lg text-white">
                    <h2 className="text-xl mb-2">Solar System Explorer</h2>
                    <p className="text-sm opacity-75">Click planets to zoom, click again to reset</p>
                </div>
                <div className="flex gap-4">
                    <button
                        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        onClick={() => setCameraMode(m => m === 'free' ? 'locked' : 'free')}
                    >
                        {cameraMode === 'free' ? '🔒 Lock Camera' : '🔓 Free Camera'}
                    </button>
                    <Link href="/" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                        🏠 Home
                    </Link>
                </div>
            </div>

            {/* Canvas */}
            <div className="absolute inset-0">
                <Canvas
                    camera={{
                        position: [0, 150, 300],
                        fov: 45,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <Suspense fallback={null}>
                        <Stars
                            radius={500}
                            depth={150}
                            count={10000}
                            factor={8}
                            fade
                            speed={2}
                        />
                        <SolarSystem />
                        <OrbitControls
                            enabled={cameraMode === 'free'}
                            enablePan={false}
                            enableZoom={true}
                            minDistance={50}
                            maxDistance={500}
                            minPolarAngle={Math.PI / 4}
                            maxPolarAngle={Math.PI / 2}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* Time Display */}
            <div className="fixed bottom-4 left-4 text-white text-xl">
                {currentTime}
            </div>

            {/* Mobile Warning */}
            <div className="sm:hidden fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
                <div className="text-white text-center">
                    <h2 className="text-2xl mb-4">⚠️ Desktop Recommended</h2>
                    <p>For the best experience, please view on a desktop device</p>
                </div>
            </div>
        </div>
    );
}