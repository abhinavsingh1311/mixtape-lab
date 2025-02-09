import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment, Html, useProgress } from '@react-three/drei';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const LazyFloatingIsland = lazy(() => import('@/components/three/FloatingIsland'));

export default function Home() {
    const [cameraMode, setCameraMode] = useState<'free' | 'tracking'>('tracking');
    const [currentTime, setCurrentTime] = useState('');
    const [showPortalMessage, setShowPortalMessage] = useState(true);
    const [isIslandVisible, setIsIslandVisible] = useState(true);
    const [isIslandLoaded, setIsIslandLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePortalClick = () => {
        setShowPortalMessage(false);
        setIsIslandVisible(false);
        setTimeout(() => router.push('/room'), 500);
    };

    return (
        <div className="h-screen w-screen relative">
            {/* UI Elements */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={() => setCameraMode((prev) => (prev === 'free' ? 'tracking' : 'free'))}
                >
                    {cameraMode === 'free' ? 'Lock' : 'Free'}
                </button>
            </div>

            <div className="fixed left-4 bottom-4 z-20 text-white font-bold text-xl">
                <h1 className="text-2xl mb-2">Abhinav Singh</h1>
                <div className="text-xl">{currentTime}</div>
            </div>

            {!isIslandLoaded && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <p className="text-white text-lg">Hang tight!</p>
                </div>
            )}

            {/* Canvas */}
            {isIslandVisible && (
                <Canvas
                    shadows
                    gl={{ toneMapping: THREE.ACESFilmicToneMapping, preserveDrawingBuffer: true }}
                    onCreated={({ gl }) => gl.forceContextRestore()}
                >
                    <EffectComposer>
                        <Bloom intensity={0.4} radius={2.5} luminanceThreshold={0.1} luminanceSmoothing={0.9} />
                    </EffectComposer>

                    <Environment files="/images/venice_sunset_4k.hdr" background backgroundBlurriness={0.5} />

                    <Suspense fallback={<Loader />}>
                        <LazyFloatingIsland
                            position={[0, -2, 0]}
                            scale={[0.5, 0.5, 0.5]}
                            onPortalClick={handlePortalClick}
                            onLoad={() => setIsIslandLoaded(true)}
                        />
                    </Suspense>

                    <ambientLight intensity={1.5} color="#ffffff" />
                    <pointLight position={[0, 15, 5]} intensity={1.0} color="#ffffff" castShadow shadow-mapSize={[4096, 4096]} />
                    <hemisphereLight intensity={0.2} color="#445588" groundColor="#443300" />

                    <PerspectiveCamera makeDefault position={[0, 8, 15]} near={0.1} far={100} />

                    {cameraMode === 'free' ? (
                        <OrbitControls enableDamping dampingFactor={0.05} minDistance={8} maxDistance={25} maxPolarAngle={Math.PI / 2 - 0.1} />
                    ) : (
                        <AutoTrackingSystem />
                    )}
                </Canvas>
            )}

            {showPortalMessage && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center text-lg bg-black/50 p-4 rounded-lg backdrop-blur-sm z-50">
                    Click on the portal to enter my room
                </div>
            )}
        </div>
    );
}

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

function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="loading-bar">
                <div style={{ width: `${progress}%` }} />
                <p>{Math.round(progress)}% loaded</p>
            </div>
        </Html>
    );
}