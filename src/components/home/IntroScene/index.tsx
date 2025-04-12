import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { SpaceFogShader } from './SpaceFogShader';
import { MovingStars } from './MovingStars';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface IntroSceneProps {
    onComplete: () => void;
    currentMessage: number;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onComplete, currentMessage }) => {
    const fogRef = useRef<THREE.ShaderMaterial>(null);
    const messageRef = useRef<HTMLDivElement>(null);
    const { camera } = useThree();
    const messages = [
        "...Eerie Noise.....",
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