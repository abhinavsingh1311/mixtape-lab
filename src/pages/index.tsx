import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, Html } from '@react-three/drei';
import {Suspense, useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FloatingIsland from '@/components/three/FloatingIsland';
import { ClosedSpaceScene } from '@/components/three/ClosedSpaceScene';
import { AlienClock } from '@/components/ui/AlienClock';
import gsap from 'gsap';
// Add at the top with other imports
import useSound from 'use-sound';
import { Howler } from 'howler';



// Space fog shader from SpaceIntro
const SpaceFogShader = {
    uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color('#020617') },
        fogColor: { value: new THREE.Color('#0f172a') },
        density: { value: 0.5 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 fogColor;
        uniform float density;
        
        varying vec2 vUv;
        varying vec3 vPosition;

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            float res = mix(
                mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
                mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
            return res*res;
        }

        void main() {
            vec2 uv = vUv * 2.0;
            float t = time * 0.1;
            
            float nebula = 0.0;
            for(float i = 0.0; i < 6.0; i++) {
                float scale = 1.0 - (i / 6.0);
                nebula += noise(uv * scale * 4.0 + t + i) * scale;
            }
            
            vec3 color = mix(baseColor, fogColor, nebula * density);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};

// Moving stars component from SpaceIntro
const MovingStars = () => {
    const { camera } = useThree();
    const pointsRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const starCount = 50000; // Increased star count
        const positions = new Float32Array(starCount * 3);
        const speeds = new Float32Array(starCount); // Add varying speeds

        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 3000;     // Wider spread
            positions[i + 1] = (Math.random() - 0.5) * 3000; // Wider spread
            positions[i + 2] = (Math.random() - 0.5) * 3000; // Wider spread
            speeds[i / 3] = Math.random() * 0.5 + 5.0; // Random speed multiplier
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
        return geo;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.getAttribute('position');
            const speeds = pointsRef.current.geometry.getAttribute('speed');
            const array = positions.array as Float32Array;
            const speedArray = speeds.array as Float32Array;

            for (let i = 0; i < array.length; i += 3) {
                array[i + 2] += delta * 200 * speedArray[i / 3]; // Increased base speed + varying speed
                if (array[i + 2] > camera.position.z + 1500) {
                    array[i + 2] = camera.position.z - 1500;
                }
            }

            positions.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={2.5} // Slightly larger stars
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

// Intro Scene with Messages
const IntroScene = ({ onComplete, currentMessage }: { onComplete: () => void, currentMessage: number }) => {
    const fogRef = useRef<THREE.ShaderMaterial>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { camera } = useThree();
    const messages = [
        "...Eerie Noise>>>>>.....",
        "Wandering through the cosmic void...",
        "Something beckons in the distance...",
        "A mysterious portal appears...",
    ];

    useEffect(() => {
        // Position camera for intro scene
        camera.position.set(0, 0, 1000);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    // Update the IntroScene component's message animation
    useEffect(() => {
        if (messageRef.current) {
            // Reset animation state
            gsap.set(messageRef.current, { opacity: 0, scale: 0.5 });

            // Animate in with delay
            gsap.to(messageRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.3
            });
        }
    }, [currentMessage]);

    useFrame((state) => {
        if (fogRef.current) {
            fogRef.current.uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <group>
            <mesh>
                <boxGeometry args={[2000, 2000, 2000]} />
                <shaderMaterial
                    ref={fogRef}
                    args={[SpaceFogShader]}
                    side={THREE.BackSide}
                />
            </mesh>
            <MovingStars />
            <Html center>
                <div className="relative">
                    {/* Background div */}
                    <div
                        className="absolute inset-0 bg-black/70 backdrop-blur-md rounded-lg"
                        style={{
                            transform: 'scale(1.2)',
                            zIndex: -1
                        }}
                    />
                    <div
                        ref={messageRef}
                        className="text-white text-4xl font-sans text-center px-8 py-4 rounded-lg relative"
                        style={{
                            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
                            opacity: 0
                        }}
                    >
                        {messages[currentMessage]}
                    </div>
                </div>
            </Html>
        </group>
    );
};

export default function Home() {
    const [cameraMode, setCameraMode] = useState<'free' | 'tracking'>('tracking');
    const [showPortalMessage, setShowPortalMessage] = useState(true);
    const [isIslandVisible, setIsIslandVisible] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [currentMessage, setCurrentMessage] = useState(0);
    const router = useRouter();
    const messages = ["...Eerie Noise>>>>>.....","Wandering through the cosmic void...", "Something beckons in the distance...", "A mysterious portal appears..."];
    const [isMuted, setIsMuted] = useState(false);

    const [playAmbient, { stop: stopAmbient }] = useSound('/sounds/ambient-space.mp3', {
        volume: isMuted ? 0 : 0.3,
        loop: true,
        interrupt: true
    });

    const [playPortalHum, { stop: stopPortalHum }] = useSound('/sounds/portal-open.mp3', {
        volume: isMuted ? 0 : 0.4,
        loop: true,
        interrupt: true
    });

    useEffect(() => {
        Howler.volume(isMuted ? 0 : 1);
    }, [isMuted]);

    useEffect(() => {
        if (showIntro) {
            playAmbient();
            let messageInterval: NodeJS.Timeout;
            const timer = setTimeout(() => {
                setCurrentMessage(0);
                messageInterval = setInterval(() => {
                    setCurrentMessage(prev => {
                        if (prev >= messages.length - 1) {
                            clearInterval(messageInterval);
                            setTimeout(() => {
                                setShowIntro(false);
                                setIsIslandVisible(true);
                                playPortalHum();
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
                clearInterval(messageInterval);
            };
        }
    }, [showIntro, messages.length, playAmbient, playPortalHum]); // Add dependencies

// Update cleanup effect
    useEffect(() => {
        return () => {
            stopAmbient();
            stopPortalHum();
        };
    }, [stopAmbient, stopPortalHum]); // Add dependencies

    const handlePortalClick = () => {
        setShowPortalMessage(false);
        setIsIslandVisible(false);
        setTimeout(() => router.push('/solar-system'), 500);
    };

    return (
        <div className="h-screen w-screen relative bg-black">
            {/* Fade transition overlay */}
            <div
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-1000 pointer-events-none
                    ${showIntro ? 'opacity-0' : isIslandVisible ? 'opacity-0' : 'opacity-100'}`}
            />

            {/* Only show AlienClock with island */}
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
                        onClick={() => setCameraMode((prev) => (prev === 'free' ? 'tracking' : 'free'))}
                    >
                        {cameraMode === 'free' ? 'Lock' : 'Free'}
                    </button>
                </div>
            )}

            {/* Intro Scene or Main Scene */}
            <Canvas
                shadows
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.5
                }}
            >
                <color attach="background" args={['#000000']} />
                <Suspense fallback={null}>
                    {showIntro ? (
                        <IntroScene onComplete={() => setShowIntro(false)} currentMessage={currentMessage} />
                    ) : (
                        <>
                            <EffectComposer>
                                <Bloom
                                    intensity={1.5}
                                    radius={0.7}
                                    luminanceThreshold={0.1}
                                    luminanceSmoothing={0.9}
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
                            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                            <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#000000" />

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
                    <PerspectiveCamera makeDefault position={[0, 8, 15]} near={0.1} far={1000} />
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