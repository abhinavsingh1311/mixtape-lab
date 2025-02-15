// src/components/intro/IntroScene.tsx
import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import useSound from 'use-sound';
import * as THREE from 'three';
import gsap from 'gsap';

// Scene state types
const SCENE_STATES = {
    WANDERING: 'wandering',
    DISCOVERY: 'discovery',
    PORTAL_REVEAL: 'portal_reveal',
    PORTAL_READY: 'portal_ready'
} as const;

type SceneState = typeof SCENE_STATES[keyof typeof SCENE_STATES];

interface IntroSceneProps {
    onComplete: () => void;
}

// Shader for space fog effect
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

const MovingStars: React.FC = () => {
    const { camera } = useThree();
    const pointsRef = useRef<THREE.Points>(null);

    // Create geometry in useMemo to prevent recreating every render
    const geometry = useMemo(() => {
        const starCount = 2000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2000;     // x
            positions[i + 1] = (Math.random() - 0.5) * 2000; // y
            positions[i + 2] = (Math.random() - 0.5) * 2000; // z
        }

        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.getAttribute('position');
            if (positions) {
                const array = positions.array as Float32Array;

                for (let i = 0; i < array.length; i += 3) {
                    array[i + 2] += delta * 50; // Move along z-axis

                    // Reset position if star goes too far
                    if (array[i + 2] > camera.position.z + 1000) {
                        array[i + 2] = camera.position.z - 1000;
                    }
                }

                positions.needsUpdate = true;
            }
        }
    });

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={2}
                color="#ffffff"
                transparent
                opacity={0.8}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

// Message overlay component
const MessageOverlay: React.FC<{ message: string }> = ({ message }) => {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messageRef.current) {
            gsap.fromTo(messageRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out"
                }
            );
        }
    }, [message]);

    return (
        <Html center>
            <div
                ref={messageRef}
                className="text-white text-2xl font-pluton text-center opacity-0"
                style={{ width: '100vw', pointerEvents: 'none' }}
            >
                {message}
            </div>
        </Html>
    );
};

// Portal component
const Portal: React.FC<{ position: [number, number, number], onClick: () => void }> = ({ position, onClick }) => {
    const portalRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (portalRef.current) {
            gsap.fromTo(portalRef.current.scale,
                { x: 0, y: 0, z: 0 },
                {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                }
            );

            gsap.to(portalRef.current.rotation,
                {
                    y: Math.PI * 2,
                    duration: 10,
                    repeat: -1,
                    ease: "none"
                }
            );
        }

        if (materialRef.current) {
            gsap.to(materialRef.current,
                {
                    emissiveIntensity: 2.5,
                    duration: 1,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                }
            );
        }

        if (glowRef.current) {
            gsap.to(glowRef.current.scale,
                {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    duration: 2,
                    yoyo: true,
                    repeat: -1,
                    ease: "sine.inOut"
                }
            );
        }
    }, []);

    return (
        <group ref={portalRef} position={position} onClick={onClick}>
            {/* Portal ring */}
            <mesh>
                <torusGeometry args={[5, 0.5, 16, 100]} />
                <meshStandardMaterial
                    ref={materialRef}
                    color="#00ffff"
                    emissive="#00ffff"
                    emissiveIntensity={1.5}
                    toneMapped={false}
                />
            </mesh>

            {/* Portal center */}
            <mesh>
                <circleGeometry args={[4.5, 32]} />
                <meshBasicMaterial
                    color="#80ffff"
                    transparent
                    opacity={0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Glow effect */}
            <mesh ref={glowRef}>
                <torusGeometry args={[5.2, 0.6, 16, 100]} />
                <meshBasicMaterial
                    color="#00ffff"
                    transparent
                    opacity={0.2}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
};

// Main IntroScene component
export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete }) => {
    const [sceneState, setSceneState] = useState<SceneState>(SCENE_STATES.WANDERING);
    const { camera } = useThree();
    const fogRef = useRef<THREE.ShaderMaterial>(null);

    const [playAmbient] = useSound('/sounds/ambient-space.mp3', {
        volume: 0.3,
        loop: true,
        interrupt: true //
    });
    const [playDiscovery] = useSound('/sounds/discovery.mp3', {
        volume: 0.5,
        interrupt: true //
    });
    const [playPortal] = useSound('/sounds/portal-open.mp3', {
        volume: 0.4,
        interrupt: true //
    });

    useEffect(() => {
        camera.position.z = 1000;

        const tl = gsap.timeline({
            onComplete: () => setSceneState(SCENE_STATES.DISCOVERY)
        });

        // First timeline - Moving through space and playing discovery sound
        tl.to(camera.position, {
            z: 500,
            duration: 5, // Reduced from 10 to 5 seconds
            ease: "power1.inOut",
            onStart: () => {
                playDiscovery();
            },
            onComplete: () => {
                setTimeout(() => {
                    setSceneState(SCENE_STATES.PORTAL_REVEAL);
                    playPortal();
                }, 1000); // Wait 1 second before playing portal sound
            }
        })
            .to(camera.position, {
                z: 200,
                duration: 3, // Reduced from 5 to 3 seconds
                ease: "power2.inOut",
                onComplete: () => {
                    setSceneState(SCENE_STATES.PORTAL_READY);
                }
            });

        return () => {
            tl.kill();
        };
    }, [camera, playDiscovery, playPortal]);

    useEffect(() => {
        if (sceneState === SCENE_STATES.PORTAL_READY) {
            gsap.to(camera.position, {
                y: '+=0.5',
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });
        }
    }, [sceneState, camera]);

    useFrame((state) => {
        if (fogRef.current) {
            fogRef.current.uniforms.time.value = state.clock.getElapsedTime();
        }
    });

    const getMessage = () => {
        switch (sceneState) {
            case SCENE_STATES.WANDERING:
                return "Wandering through the cosmic void...";
            case SCENE_STATES.DISCOVERY:
                return "Something beckons in the distance...";
            case SCENE_STATES.PORTAL_REVEAL:
                return "A mysterious portal appears...";
            case SCENE_STATES.PORTAL_READY:
                return "Click to enter";
            default:
                return "";
        }
    };

    const handlePortalClick = () => {
        gsap.to(camera.position, {
            z: 50,
            duration: 2,
            ease: "power2.inOut",
            onComplete
        });
    };

    return (
        <group>
            <mesh>
                <boxGeometry args={[100, 100, 100]} />
                <shaderMaterial
                    ref={fogRef}
                    args={[SpaceFogShader]}
                    side={THREE.BackSide}
                />
            </mesh>

            <MovingStars />
            <MessageOverlay message={getMessage()} />

            {sceneState === SCENE_STATES.PORTAL_READY && (
                <Portal
                    position={[0, 0, camera.position.z - 50]}
                    onClick={handlePortalClick}
                />
            )}

            <ambientLight intensity={0.1} />
        </group>
    );
};