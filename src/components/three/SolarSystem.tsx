// src/components/three/SolarSystem.tsx
import { useRef, useMemo, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Object3D, Mesh, Group, Vector3, DoubleSide, TextureLoader } from 'three';
import { useRouter } from 'next/router';
import { Text } from '@react-three/drei';

interface PlanetSystemProps {
    size: number;
    distance: number;
    color: string;
    speed: number;
    name: string;
    link: string;
    description: string;
    texture: string;
}

class PlanetSystem {
    size: number;
    distance: number;
    color: string;
    speed: number;
    angle: number;
    name: string;
    link: string;
    description: string;
    texture: string;

    constructor({ size, distance, color, speed, name, link, description, texture }: PlanetSystemProps) {
        this.size = size;
        this.distance = distance;
        this.color = color;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.name = name;
        this.link = link;
        this.description = description;
        this.texture = texture;
    }

    update(): { x: number; z: number } {
        this.angle += this.speed;
        return {
            x: Math.cos(this.angle) * this.distance,
            z: Math.sin(this.angle) * this.distance
        };
    }
}

interface PlanetProps {
    planet: PlanetSystem;
    onClick: (route: string) => void;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
    const meshRef = useRef<Mesh>(null);
    const textRef = useRef<any>(null);
    const [hovered, setHovered] = useState(false);

    const texture = useLoader(TextureLoader, planet.texture);

    useFrame(() => {
        const pos = planet.update();
        if (meshRef.current) {
            meshRef.current.position.x = pos.x;
            meshRef.current.position.z = pos.z;
            meshRef.current.rotation.y += 0.005;
        }
        if (textRef.current) {
            textRef.current.position.x = pos.x;
            textRef.current.position.z = pos.z;
            textRef.current.position.y = planet.size + 2;
            const parentRotation = meshRef.current?.parent instanceof Object3D
                ? meshRef.current.parent.rotation.y
                : 0;
            textRef.current.rotation.y = -parentRotation;
        }
    });

    return (
        <group>
            <mesh
                ref={meshRef}
                onClick={() => onClick(planet.link)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[planet.size, 64, 64]} />
                <meshStandardMaterial
                    map={texture}
                    metalness={0.2}
                    roughness={0.8}
                    emissive={hovered ? planet.color : '#000000'}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                />
            </mesh>
            {hovered && (
                <Text
                    ref={textRef}
                    color="white"
                    fontSize={1.5}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.02}
                    textAlign="center"
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.2}
                    outlineColor="#000000"
                >
                    {planet.name}
                </Text>
            )}
        </group>
    );
};

const SunCorona: React.FC = () => {
    const points = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 1000; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 8 + Math.random() * 4;
            temp.push(
                Math.cos(angle) * radius,
                (Math.random() - 0.5) * 4,
                Math.sin(angle) * radius
            );
        }
        return new Float32Array(temp);
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={points.length / 3}
                    array={points}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.2}
                color="#FDB813"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

const SolarSystem: React.FC = () => {
    const router = useRouter();
    const systemRef = useRef<Group>(null);
    const sunRef = useRef<Mesh>(null);
    const sunTexture = useLoader(TextureLoader, '/textures/2k_sun.jpg');

    const planets = useMemo(() => [
        new PlanetSystem({
            size: 2,
            distance: 20,
            color: '#808080',
            speed: 0.005,
            name: 'About Me',
            link: '/about',
            description: 'Learn about my journey',
            texture: '/textures/2k_mercury.jpg'
        }),
        new PlanetSystem({
            size: 2.5,
            distance: 35,
            color: '#ffd700',
            speed: 0.004,
            name: 'Projects',
            link: '/projects',
            description: 'Explore my work',
            texture: '/textures/2k_venus_surface.jpg'
        }),
        new PlanetSystem({
            size: 3,
            distance: 50,
            color: '#4B67AD',
            speed: 0.003,
            name: 'Skills',
            link: '/skills',
            description: 'Technical expertise',
            texture: '/textures/2k_earth_normal.jpg'
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 65,
            color: '#CF503A',
            speed: 0.002,
            name: 'Experience',
            link: '/experience',
            description: 'Professional journey',
            texture: '/textures/2k_mars.jpg'
        }),
        new PlanetSystem({
            size: 4,
            distance: 85,
            color: '#C88B3A',
            speed: 0.0015,
            name: 'Contact',
            link: '/contact',
            description: 'Get in touch',
            texture: '/textures/2k_jupiter.jpg'
        }),
        new PlanetSystem({
            size: 3.5,
            distance: 105,
            color: '#C4A268',
            speed: 0.001,
            name: 'Blog',
            link: '/blog',
            description: 'Read my thoughts',
            texture: '/textures/2k_saturn.jpg'
        }),
    ], []);

    const handlePlanetClick = (route: string) => {
        router.push(route);
    };

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.0005;
        }
    });

    return (
        <group ref={systemRef}>
            {/* Sun with Corona */}
            <group>
                <mesh ref={sunRef}>
                    <sphereGeometry args={[8, 64, 64]} />
                    <meshStandardMaterial
                        map={sunTexture}
                        emissive="#FDB813"
                        emissiveIntensity={2}
                        metalness={0.1}
                        roughness={0.6}
                    />
                    <pointLight intensity={5} distance={300} decay={1.5} />
                </mesh>
                <SunCorona />
            </group>

            {/* Additional Lighting */}
            <ambientLight intensity={0.5} />
            <hemisphereLight
                intensity={0.8}
                color="#ffffff"
                groundColor="#ffffff"
            />

            {/* Planets */}
            {planets.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    onClick={handlePlanetClick}
                />
            ))}
        </group>
    );
};

export default SolarSystem;