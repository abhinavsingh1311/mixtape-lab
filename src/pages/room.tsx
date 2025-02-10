import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Suspense, useState } from 'react';
import * as THREE from 'three';
import ModernRoom from '@/components/three/Room';
import DesktopOverlay from '@/components/ui/DesktopOverlay';
import type { ThreeEvent } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { ClosedSpaceScene } from '@/components/three/ClosedSpaceScene';
import { Vector2 } from 'three';


export default function RoomScene() {
    const [isRoomLoaded, setIsRoomLoaded] = useState(false);
    const [isDesktopOpen, setIsDesktopOpen] = useState(false);

    return (
        <div className="h-screen w-screen relative bg-black">
            {!isRoomLoaded && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                    <p className="text-white text-3xl animate-pulse">Loading space...</p>
                </div>
            )}

            <DesktopOverlay
                isOpen={isDesktopOpen}
                onClose={() => setIsDesktopOpen(false)}
            />

            <Canvas
                gl={(canvas) => {
                    const renderer = new THREE.WebGLRenderer({ canvas });
                    renderer.toneMapping = THREE.ACESFilmicToneMapping;
                    renderer.toneMappingExposure = 1.5;
                    renderer.outputColorSpace = THREE.SRGBColorSpace; // Correct replacement
                    return renderer;
                }}
            >

                <color attach="background" args={['#000000']} />

                <Suspense fallback={null}>
                    <EffectComposer>
                        <Bloom
                            intensity={1.5}
                            luminanceThreshold={0.2}
                            luminanceSmoothing={0.9}
                            height={300}
                        />

                        <ChromaticAberration offset={new Vector2(0.0005, 0.0005)} radialModulation={false} modulationOffset={0} />

                    </EffectComposer>

                    <ClosedSpaceScene />

                    <ModernRoom
                        position={[0, -2, 0]}
                        scale={[1, 1, 1]}
                        onLoad={() => setIsRoomLoaded(true)}
                        onClick={(e: ThreeEvent<MouseEvent>) => {
                            e.stopPropagation();
                        }}
                        onDesktopClick={() => setIsDesktopOpen(true)}
                    />

                    <PerspectiveCamera makeDefault position={[10, 10, 10]} />

                    <OrbitControls
                        enableDamping
                        dampingFactor={0.05}
                        minDistance={5}
                        maxDistance={20}
                        maxPolarAngle={Math.PI / 2}
                        target={[0, 0, 0]}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}