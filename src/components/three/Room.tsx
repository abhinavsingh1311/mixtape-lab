import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text, useTexture } from '@react-three/drei';

interface RoomProps extends GroupProps {
    onLoad: () => void;
    onClick: (event: ThreeEvent<MouseEvent>) => void;
    onDesktopClick: () => void;
}

export default function ModernRoom({ onLoad, onClick, onDesktopClick, ...props }: RoomProps) {
    const groupRef = useRef<THREE.Group>(null);
    const spotlightRef = useRef<THREE.SpotLight>(null);
    const wallArtTexture = useTexture(`images/new-living-room-image.png`);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    useFrame(({ clock }) => {
        if (spotlightRef.current) {
            const intensity = 3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
            spotlightRef.current.intensity = intensity;
        }
    });

    return (
        <group ref={groupRef} {...props} rotation={[0, Math.PI / 3.5, 0]}>
            {/* Room structure */}
            <group position={[0, 0, 0]}>
                {/* Floor */}
                <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.1, 0]}>
                    <planeGeometry args={[12, 12]} />
                    <meshStandardMaterial
                        color="#e5e5e5"
                        metalness={0.3}
                        roughness={0.15}
                        emissive="#ffffff"
                        emissiveIntensity={0.1}
                    />
                </mesh>

                {/* Walls */}
                <mesh receiveShadow position={[0, 5, -6]} rotation={[0, 0, 0]}>
                    <planeGeometry args={[12, 10]} />
                    <meshStandardMaterial color="#f8f9fa" metalness={0.1} roughness={0.15} />
                </mesh>
                <mesh receiveShadow position={[-6, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[12, 10]} />
                    <meshStandardMaterial color="#f8f9fa" metalness={0.1} roughness={0.15} />
                </mesh>
                <mesh receiveShadow position={[6, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[12, 10]} />
                    <meshStandardMaterial color="#f8f9fa" metalness={0.1} roughness={0.15} />
                </mesh>

                {/* Wall Art Frame (Centered on back wall) */}
                <group position={[0, 4.5, -5.95]}>
                    <mesh>
                        <boxGeometry args={[5, 3.5, 0.2]} />
                        <meshStandardMaterial color="#ffffff" metalness={0.3} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0, 0.11]}>
                        <planeGeometry args={[4.8, 3.3]} />
                        <meshStandardMaterial
                            map={wallArtTexture}
                            emissiveMap={wallArtTexture}
                            emissiveIntensity={0.8}
                        />
                    </mesh>
                </group>

                {/* Modern L-shaped Desk (Right wall) */}
                <group position={[4.5, 1, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[5, 0.1, 2.5]} />
                        <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.1} />
                    </mesh>
                    {[[-1.1, -1.2], [1.1, -1.2], [-1.1, 1.2], [1.1, 1.2]].map(([x, z], i) => (
                        <mesh key={i} castShadow position={[x, -0.4, z]}>
                            <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
                            <meshStandardMaterial color="#e5e5e5" metalness={0.6} />
                        </mesh>
                    ))}
                </group>

                {/* Modern Sofa (Left side facing center) */}
                <group position={[-4.5, 0.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[4, 0.6, 1.8]} />
                        <meshStandardMaterial color="#0B2447" metalness={0.2} roughness={0.4} />
                    </mesh>
                    <mesh castShadow position={[0, 0.9, -0.8]}>
                        <boxGeometry args={[4, 1.8, 0.2]} />
                        <meshStandardMaterial color="#0B2447" />
                    </mesh>
                    {[-1.9, 1.9].map((x) => (
                        <mesh key={x} castShadow position={[x, 0.6, 0]}>
                            <boxGeometry args={[0.2, 1.2, 1.8]} />
                            <meshStandardMaterial color="#0B2447" />
                        </mesh>
                    ))}
                </group>

                {/* Coffee Table (Centered in front of sofa) */}
                <group position={[-3, 0.3, 4]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[1, 1, 0.1, 32]} />
                        <meshStandardMaterial color="#ffffff" metalness={0.7} />
                    </mesh>
                    <mesh position={[0, -0.4, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.8, 16]} />
                        <meshStandardMaterial color="#e5e5e5" />
                    </mesh>
                </group>

                {/* Desktop Setup (On desk) */}
                <group position={[4.5, 1.7, 0]} onClick={onDesktopClick}>
                    <mesh castShadow position={[0, 0.9, 0]} rotation={[0, -Math.PI / 2, 0]}>
                        <boxGeometry args={[1.8, 1, 0.05]} />
                        <meshStandardMaterial color="#2C3333" metalness={0.9} />
                    </mesh>
                    <mesh castShadow position={[0, 0.3, 0]}>
                        <boxGeometry args={[0.2, 0.6, 0.2]} />
                        <meshStandardMaterial color="#2C3333" />
                    </mesh>
                    <mesh castShadow position={[0.6, 0.1, 0]} rotation={[0.1, 0, 0]}>
                        <boxGeometry args={[1, 0.02, 0.4]} />
                        <meshStandardMaterial color="#2C3333" />
                    </mesh>
                </group>

                {/* Plant (Front-right corner) */}
                <group position={[-3, 0.7, 4]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.25, 0.2, 0.5, 16]} />
                        <meshStandardMaterial color="#4a4e69" />
                    </mesh>
                    {[0, Math.PI / 2, Math.PI, -Math.PI / 2].map((rot, i) => (
                        <mesh key={i} position={[0, 0.5, 0]} rotation={[0, rot, 0]}>
                            <sphereGeometry args={[0.4, 8, 8]} />
                            <meshStandardMaterial color="#2a9d8f" />
                        </mesh>
                    ))}
                </group>

                {/* Decorative Rug (Centered in seating area) */}
                <mesh receiveShadow position={[-3, 0.01, 4]} rotation-x={-Math.PI / 2}>
                    <circleGeometry args={[2, 32]} />
                    <meshStandardMaterial color="#f4a261" roughness={0.7} />
                </mesh>
            </group>

            {/* Enhanced Lighting */}
            <spotLight
                ref={spotlightRef}
                position={[2, 8, 3]}
                angle={Math.PI / 3}
                penumbra={1}
                intensity={4}
                castShadow
                color="#ffffff"
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 5, 3]} intensity={2} color="#ffd6ff" />
            <pointLight position={[5, 5, 4]} intensity={2} color="#c8ffd4" />
            <ambientLight intensity={1.2} color="#ffffff" />
            {/* <rectAreaLight
                position={[0, 5, -6]}
                width={12}
                height={8}
                intensity={3}
                color="#ffffff"
                rotation={[0, 0, 0]}
            /> */}

            {/* Decorative Text */}
            <Text
                position={[0, 4.5, -5.8]}
                rotation={[0, 0, 0]}
                color="#2a9d8f"
                fontSize={0.4}
                anchorX="center"
                anchorY="middle"
            >
                Work in progress!!
            </Text>
        </group>
    );
}