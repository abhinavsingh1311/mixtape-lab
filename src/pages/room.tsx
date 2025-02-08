import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Environment } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Room from '../components/three/Room';
import DesktopOverlay from '../components/ui/DesktopOverlay';
import type { ThreeEvent } from '@react-three/fiber';

interface CameraControllerProps {
    cameraMode: 'free' | 'locked';
    zoomTarget: THREE.Vector3 | null;
}

function CameraController({ cameraMode, zoomTarget }: CameraControllerProps) {
    useFrame((state, delta) => {
        if (cameraMode === 'locked' && zoomTarget) {
            state.camera.position.lerp(zoomTarget.clone().add(new THREE.Vector3(0, 1, 3)), delta * 2);
            state.camera.lookAt(zoomTarget);
        }
    });
    return null;
}

export default function RoomScene() {
    const [isRoomLoaded, setIsRoomLoaded] = useState(false);
    const [cameraMode, setCameraMode] = useState<'free' | 'locked'>('free');
    const [isDesktopOpen, setIsDesktopOpen] = useState(false);
    const controls = useRef<any>(null);
    const [zoomTarget, setZoomTarget] = useState<THREE.Vector3 | null>(null);

    const handleObjectClick = (event: ThreeEvent<MouseEvent>) => {
        if (cameraMode === 'locked') {
            const box = new THREE.Box3().setFromObject(event.object);
            const center = box.getCenter(new THREE.Vector3());
            setZoomTarget(center);
        }
    };

    const handleDesktopClick = () => {
        setIsDesktopOpen(true);
        setCameraMode('locked');
    };

    return (
        <div className="h-screen w-screen relative">
            {/* Camera Mode Toggle */}
            <div className="fixed top-4 right-4 z-50">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={() => setCameraMode(prev => prev === 'free' ? 'locked' : 'free')}
                >
                    {cameraMode === 'free' ? '🔒 Lock Camera' : '🔓 Free Camera'}
                </button>
            </div>

            {/* Loading Screen */}
            {!isRoomLoaded && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                    <p className="text-white text-3xl animate-pulse">Loading virtual space...</p>
                </div>
            )}

            {/* Desktop Overlay */}
            <DesktopOverlay
                isOpen={isDesktopOpen}
                onClose={() => {
                    setIsDesktopOpen(false);
                    setCameraMode('free');
                }}
            />

            <Canvas shadows camera={{ position: [0, 2, 8], fov: 50 }}>
                <CameraController cameraMode={cameraMode} zoomTarget={zoomTarget} />

                <ambientLight intensity={1.5} />
                <pointLight position={[5, 5, 5]} intensity={1.0} castShadow />

                <OrbitControls
                    ref={controls}
                    enabled={cameraMode === 'free'}
                    enableDamping
                    dampingFactor={0.05}
                    minDistance={3}
                    maxDistance={15}
                    maxPolarAngle={Math.PI / 2}
                />

                <Environment
                    files="/images/moonless_golf_4k.exr"
                    background
                    backgroundBlurriness={0.5}
                />

                <Suspense fallback={null}>
                    <Room
                        position={[0, -4, -5]}
                        scale={[1, 1, 1]}
                        rotation={[0.2, Math.PI / -2, 0.1]}
                        onLoad={() => {
                            setIsRoomLoaded(true);
                            controls.current?.reset();
                        }}
                        onClick={handleObjectClick}
                        onDesktopClick={handleDesktopClick}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}