// src/components/three/SolarSystem.tsx
import { useRef, useMemo, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { Html, useTexture, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

// Extend Three.js components
extend({ OrbitControls });

interface PlanetSystemProps {
    size: number;
    distance: number;
    speed: number;
    name: string;
    link: string;
    texture: string;
    normalMap?: string;
    roughnessMap?: string;
    description?: string;
}

class PlanetSystem {
    size: number;
    distance: number;
    speed: number;
    angle: number;
    name: string;
    link: string;
    texture: string;
    normalMap?: string;
    roughnessMap?: string;
    description: string;

    constructor({ size, distance, speed, name, link, texture, normalMap, roughnessMap, description = '' }: PlanetSystemProps) {
        this.size = size;
        this.distance = distance;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.name = name;
        this.link = link;
        this.texture = texture;
        this.normalMap = normalMap;
        this.roughnessMap = roughnessMap;
        this.description = description;
    }

    update(): { x: number; z: number } {
        this.angle += this.speed;
        return {
            x: Math.cos(this.angle) * this.distance,
            z: Math.sin(this.angle) * this.distance
        };
    }
}
const Sun: React.FC = () => {
    const sunRef = useRef<THREE.Mesh>(null);
    const sunTexture = useTexture('/textures/2k_sun.jpg');

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <group>
            {/* Base sun sphere */}
            <mesh ref={sunRef}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    map={sunTexture}
                    color="#FDB813"
                />
            </mesh>

            {/* Glow effect */}
            <mesh scale={[1.2, 1.2, 1.2]}>
                <sphereGeometry args={[10, 32, 32]} />
                <meshBasicMaterial
                    color="#FDB813"
                    transparent
                    opacity={0.3}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Light source */}
            <pointLight
                intensity={5}
                distance={500}
                decay={1.5}
                color="#ff6600"
            />
        </group>
    );
};

const OrbitLine: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshBasicMaterial
            color="#4a4a4a"
            transparent
            opacity={0.2}
            side={THREE.DoubleSide}
        />
    </mesh>
);

interface PlanetProps {
    planet: PlanetSystem;
    onClick: (route: string, position: Vector3) => void;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [texture, normalMap, roughnessMap] = useTexture([
        planet.texture,
        planet.normalMap || '/textures/2k_moon_normal.jpg',
        planet.roughnessMap || '/textures/2k_moon_normal.jpg'
    ]);

    useFrame(() => {
        const pos = planet.update();
        if (meshRef.current) {
            meshRef.current.position.x = pos.x;
            meshRef.current.position.z = pos.z;
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group>
            <OrbitLine radius={planet.distance} />
            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(planet.link, new Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                }}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[planet.size, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                    metalness={0.4}
                    roughness={0.7}
                    emissive={hovered ? '#ffffff' : '#000000'}
                    emissiveIntensity={hovered ? 0.5 : 0.1}
                />
            </mesh>

            {hovered && meshRef.current && (
                <Html position={[meshRef.current.position.x, planet.size + 3, meshRef.current.position.z]}>
                    <div className="bg-black/75 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                        {planet.name}
                        {planet.description && (
                            <div className="text-xs opacity-75">{planet.description}</div>
                        )}
                    </div>
                </Html>
            )}
        </group>
    );
};

const SolarSystem: React.FC = () => {
    const router = useRouter();
    const { camera } = useThree();
    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const originalPosition = useMemo(() => camera.position.clone(), [camera]);

    const planets = useMemo(() => [
        new PlanetSystem({
            size: 1.5,
            distance: 20,
            speed: 0.001,
            name: 'About Me',
            texture: '/textures/2k_mercury.jpg',
            link: '/about',
            description: 'Learn about my journey'
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 30,
            speed: 0.0008,
            name: 'Projects',
            texture: '/textures/2k_venus_surface.jpg',
            link: '/projects',
            description: 'Explore my work'
        }),
        new PlanetSystem({
            size: 2.5,
            distance: 45,
            speed: 0.0006,
            name: 'Skills',
            texture: '/textures/2k_earth_normal.jpg',
            normalMap: '/textures/2k_earth_normal.jpg',
            roughnessMap: '/textures/2k_earth_normal.jpg',
            link: '/skills',
            description: 'Technical expertise'
        }),
        new PlanetSystem({
            size: 2,
            distance: 60,
            speed: 0.0004,
            name: 'Experience',
            texture: '/textures/2k_mars.jpg',
            link: '/experience',
            description: 'Professional journey'
        }),
        new PlanetSystem({
            size: 4.5,
            distance: 80,
            speed: 0.0003,
            name: 'Contact',
            texture: '/textures/2k_jupiter.jpg',
            link: '/contact',
            description: 'Get in touch'
        }),
        new PlanetSystem({
            size: 4,
            distance: 100,
            speed: 0.0002,
            name: 'Blog',
            texture: '/textures/2k_saturn.jpg',
            link: '/blog',
            description: 'Read my thoughts'
        }),
    ], []);

    useFrame(() => {
        if (targetPosition) {
            camera.position.lerp(
                new Vector3(
                    targetPosition.x * 1.5,
                    targetPosition.y + 10,
                    targetPosition.z * 1.5
                ),
                0.05
            );
        } else {
            camera.position.lerp(originalPosition, 0.05);
        }
    });

    const handlePlanetClick = (route: string, position: Vector3) => {
        if (targetPosition?.equals(position)) {
            setTargetPosition(null);
        } else {
            setTargetPosition(position);
        }
    };

    return (
        <group>
            <Sun />
            {planets.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    onClick={handlePlanetClick}
                />
            ))}
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#404040" />
        </group>
    );
};

export default SolarSystem;