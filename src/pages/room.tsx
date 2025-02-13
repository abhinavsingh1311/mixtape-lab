// // pages/room.tsx
// import { Canvas } from '@react-three/fiber';
// import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
// import { Suspense, useState } from 'react';
// import * as THREE from 'three';
// import ModernRoom from '@/components/three/Room';
// import DesktopOverlay from '@/components/ui/DesktopOverlay';
// import type { ThreeEvent } from '@react-three/fiber';
// import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
// import { ClosedSpaceScene } from '@/components/three/ClosedSpaceScene';
//
// export default function RoomScene() {
//     const [isRoomLoaded, setIsRoomLoaded] = useState(false);
//     const [isDesktopOpen, setIsDesktopOpen] = useState(false);
//
//     return (
//         <div className="h-screen w-screen relative bg-black">
//             {/* Loading overlay */}
//             {!isRoomLoaded && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
//                     <div className="text-center">
//                         <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mb-4"></div>
//                         <p className="text-white text-xl">Loading virtual space...</p>
//                     </div>
//                 </div>
//             )}
//
//             {/* Desktop overlay */}
//             <DesktopOverlay
//                 isOpen={isDesktopOpen}
//                 onClose={() => setIsDesktopOpen(false)}
//             />
//
//             {/* Navigation buttons */}
//             <div className="fixed top-4 left-4 z-50">
//                 <button
//                     onClick={() => window.history.back()}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                     Back
//                 </button>
//             </div>
//
//             {/* Main 3D Canvas */}
//             <Canvas
//                 shadows
//                 dpr={[1, 2]} // Dynamic pixel ratio
//                 camera={{ position: [10, 10, 10], fov: 50 }}
//                 gl={{
//                     antialias: true,
//                     toneMapping: THREE.ACESFilmicToneMapping,
//                     toneMappingExposure: 1.5,
//                     outputEncoding: THREE.sRGBEncoding,
//                     shadowMap: {
//                         enabled: true,
//                         type: THREE.PCFSoftShadowMap
//                     }
//                 }}
//             >
//                 {/* Background color */}
//                 <color attach="background" args={['#000000']} />
//
//                 <Suspense fallback={null}>
//                     {/* Post-processing effects */}
//                     <EffectComposer>
//                         <Bloom
//                             intensity={1.5}
//                             luminanceThreshold={0.2}
//                             luminanceSmoothing={0.9}
//                             height={300}
//                         />
//                         <ChromaticAberration
//                             offset={[0.0005, 0.0005]}
//                         />
//                     </EffectComposer>
//
//                     {/* Background scene */}
//                     <ClosedSpaceScene />
//
//                     {/* Main room component */}
//                     <ModernRoom
//                         position={[0, -2, 0]}
//                         scale={[1, 1, 1]}
//                         onLoad={() => {
//                             console.log('Room loaded');
//                             setIsRoomLoaded(true);
//                         }}
//                         onClick={(e: ThreeEvent<MouseEvent>) => {
//                             e.stopPropagation();
//                             console.log('Room clicked at:', e.point);
//                         }}
//                         onDesktopClick={() => {
//                             console.log('Desktop clicked');
//                             setIsDesktopOpen(true);
//                         }}
//                     />
//
//                     {/* Camera setup */}
//                     <PerspectiveCamera
//                         makeDefault
//                         position={[10, 10, 10]}
//                         near={0.1}
//                         far={100}
//                     />
//
//                     {/* Controls */}
//                     <OrbitControls
//                         enableDamping
//                         dampingFactor={0.05}
//                         minDistance={5}
//                         maxDistance={20}
//                         maxPolarAngle={Math.PI / 2}
//                         target={[0, 0, 0]}
//                     />
//
//                     {/* Additional lighting */}
//                     <ambientLight intensity={0.5} />
//                     <pointLight
//                         position={[10, 10, 10]}
//                         intensity={0.5}
//                         castShadow
//                     />
//                 </Suspense>
//
//                 {/* Fog */}
//                 <fog attach="fog" args={['#000000', 10, 50]} />
//             </Canvas>
//         </div>
//     );
// }