// src/pages/solar-system.tsx
import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const SolarSystem = dynamic(() => import('@/components/three/SolarSystem'), {
    ssr: false
});

function LoadingScreen() {
    return (
        <Html center>
            <div className="text-white text-center">
                <div className="text-2xl mb-4">Loading Solar System</div>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full animate-pulse" />
                </div>
            </div>
        </Html>
    );
}

export default function SolarSystemPage() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen w-screen relative bg-black">
            <div className="fixed top-4 right-4 z-50">
                <Link
                    href="/"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    🏠 Home
                </Link>
            </div>

            <div className="fixed top-4 left-4 z-50 bg-black/50 p-4 rounded-lg text-white">
                <h2 className="text-xl mb-2">Navigation Guide</h2>
                <ul className="space-y-1">
                    <li>• Click planets to zoom in/out</li>
                    <li>• Drag to rotate view</li>
                    <li>• Scroll to zoom in/out</li>
                    <li>• Hover over planets for info</li>
                </ul>
            </div>

            <div className="fixed bottom-4 left-4 z-50 text-white">
                <h1 className="text-2xl mb-2">Abhinav Singh</h1>
                <div className="text-xl">{currentTime}</div>
            </div>

            <div className="absolute inset-0">
                <Canvas
                    dpr={[1, 2]}
                    camera={{
                        position: [0, 50, 150],
                        fov: 75,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <Suspense fallback={<LoadingScreen />}>
                        <Stars
                            radius={300}
                            depth={100}
                            count={7000}
                            factor={6}
                            saturation={0}
                            fade
                            speed={1}
                        />
                        <SolarSystem />
                        <OrbitControls
                            enablePan={true}
                            enableZoom={true}
                            enableRotate={true}
                            minDistance={30}
                            maxDistance={400}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI}
                            dampingFactor={0.05}
                            rotateSpeed={0.5}
                            zoomSpeed={0.8}
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
    );
}