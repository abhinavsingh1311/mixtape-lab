import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface FloatingIslandProps extends GroupProps {
    onPortalClick: () => void;
    onLoad: () => void;
}

export default function FloatingIsland({ onPortalClick, onLoad, ...props }: FloatingIslandProps) {
    const groupRef = useRef<THREE.Group>(null);
    const portalRef = useRef<THREE.Mesh>(null);
    const hologramRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    // Animation
    useFrame(({ clock }) => {
        if (groupRef.current) {
            // Floating animation
            groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.2;
        }

        if (portalRef.current) {
            // Portal animation
            const glow = Math.sin(clock.elapsedTime * 2) * 0.3 + 1.2; // Increased glow intensity
            (portalRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = glow;
        }

        if (hologramRef.current) {
            // Hologram animation
            hologramRef.current.rotation.y += 0.001;
            const scale = Math.sin(clock.elapsedTime * 0.5) * 0.03 + 1;
            hologramRef.current.scale.set(scale, scale, scale);
            (hologramRef.current.material as THREE.ShaderMaterial).uniforms.time.value = clock.elapsedTime;
        }
    });

    // Enhanced shader for holographic sphere effect
    const hologramShader = {
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color('#00ffff') }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            uniform float time;
            
            void main() {
                vUv = uv;
                vNormal = normal;
                vec4 modelPosition = modelMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * viewMatrix * modelPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 color;
            uniform float time;
            varying vec2 vUv;
            varying vec3 vNormal;
            
            void main() {
                float pulse = sin(time * 1.5) * 0.05 + 0.95;
                float grid = sin(vUv.y * 50.0 + time * 2.0) * 0.05;
                float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
                float alpha = rim * 0.3 + grid;
                alpha *= pulse * 0.2; // Reduced opacity
                gl_FragColor = vec4(color * (pulse + grid), alpha);
            }
        `
    };

    // Function to create a detailed tree
    const Tree = ({ position, scale = 1 }: { position: [number, number, number], scale?: number }) => (
        <group position={position} scale={scale}>
            {/* Trunk with bark texture effect */}
            <mesh castShadow position={[0, 0.4, 0]}>
                <cylinderGeometry args={[0.1, 0.15, 0.8, 8]} />
                <meshStandardMaterial
                    color="#5c4033"
                    roughness={0.9}
                    metalness={0.1}
                    emissive="#2b1810"
                    emissiveIntensity={0.2}
                />
            </mesh>
            {/* Multiple layers of foliage for fuller look */}
            {[0.8, 1.1, 1.4, 1.7].map((height, i) => (
                <mesh key={i} castShadow position={[0, height, 0]}>
                    <coneGeometry args={[0.5 - i * 0.08, 0.6, 8]} />
                    <meshStandardMaterial
                        color={new THREE.Color('#2d5a27').offsetHSL(0, 0, i * 0.04)}
                        emissive="#1a472a"
                        emissiveIntensity={0.2}
                        roughness={0.8}
                    />
                </mesh>
            ))}
        </group>
    );

    return (
        <group ref={groupRef} {...props}>
            {/* Holographic sphere around the island */}
            <mesh
                ref={hologramRef}
                position={[0, 1.5, 0]}
            >
                <sphereGeometry args={[5, 32, 32]} />
                <shaderMaterial
                    {...hologramShader}
                    transparent={true}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Main island base with enhanced materials */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[3, 3.5, 2, 40]} />
                <meshStandardMaterial
                    color="#8b4513"
                    roughness={0.7}
                    metalness={0.3}
                    emissive="#3d200b"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Top soil layer with enhanced materials */}
            <mesh castShadow position={[0, 1, 0]}>
                <cylinderGeometry args={[2.8, 3, 0.5, 32]} />
                <meshStandardMaterial
                    color="#3b7a23"
                    roughness={0.9}
                    metalness={0.1}
                    emissive="#1a472a"
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Scattered rocks */}
            {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 2.5;
                const scale = 0.2 + Math.random() * 0.3;
                return (
                    <mesh
                        key={`rock-${i}`}
                        position={[
                            Math.cos(angle) * radius + Math.random() * 0.5,
                            1.1,
                            Math.sin(angle) * radius + Math.random() * 0.5
                        ]}
                        rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                        scale={scale}
                    >
                        <dodecahedronGeometry args={[1, 1]} />
                        <meshStandardMaterial
                            color={new THREE.Color('#808080').offsetHSL(0, 0, Math.random() * 0.2 - 0.1)}
                            roughness={0.8}
                            metalness={0.2}
                            emissive="#404040"
                            emissiveIntensity={0.1}
                        />
                    </mesh>
                );
            })}

            {/* Enhanced trees */}
            <Tree position={[-1.8, 1, -1.8]} scale={1.2} />
            <Tree position={[2, 1, 1.5]} />
            <Tree position={[0.5, 1, -2]} scale={0.9} />

            {/* Interactive portal with enhanced glow */}
            <group
                position={[0, 2.3, 0]}
                onClick={(e: ThreeEvent<MouseEvent>) => {
                    e.stopPropagation();
                    onPortalClick();
                }}
            >
                <mesh ref={portalRef}>
                    <torusGeometry args={[1, 0.2, 32, 48]} />
                    <meshStandardMaterial
                        color="#00ffff"
                        emissive="#00ffff"
                        emissiveIntensity={1.2}
                        metalness={0.9}
                        roughness={0.2}
                    />
                </mesh>
                <mesh>
                    <circleGeometry args={[0.9, 32]} />
                    <meshStandardMaterial
                        color="#90EE90"
                        emissive="#90EE90"
                        emissiveIntensity={0.8}
                        transparent={true}
                        opacity={0.7}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>

            {/* Welcome text */}
            <Text
                position={[0, 10, 0]}
                rotation={[0, Math.PI / -7, 0]}
                fontSize={0.6}
                color="#00ffff"
                anchorX="center"
                anchorY="middle"
                maxWidth={2}
                renderOrder={2}
            >
                Welcome!
            </Text>
        </group>
    );
}