// src/components/three/SolarSystem.tsx
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Object3D, Mesh, Group, Vector3, DoubleSide, RingGeometry } from 'three';
import { useRouter } from 'next/router';
import { Text, useTexture } from '@react-three/drei';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';

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

const PlanetGlow: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.3}
            emissive="#ffffff"
            emissiveIntensity={0.5}
            blending={THREE.AdditiveBlending}
            side={DoubleSide}
        />
    </mesh>
);

const OrbitLine: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius + 0.1, 64]} />
        <meshStandardMaterial
            color="#4a4a4a"
            transparent
            opacity={0.2}
            side={DoubleSide}
        />
    </mesh>
);

interface PlanetProps {
    planet: PlanetSystem;
    onClick: (route: string, position: Vector3) => void;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
    const meshRef = useRef<Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [texture, normalMap, roughnessMap] = useTexture([
        planet.texture,
        planet.normalMap || '/images/textures/2k_moon_normal.jpg',
        planet.roughnessMap || '/images/textures/2k_moon_normal.jpg'
    ]);

    useFrame(() => {
        const pos = planet.update();
        if (meshRef.current) {
            meshRef.current.position.x = pos.x;
            meshRef.current.position.z = pos.z;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group>
            <OrbitLine radius={planet.distance} />

            <mesh
                ref={meshRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(planet.link, meshRef.current!.position);
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

            {hovered && (
                <>
                    <PlanetGlow radius={planet.size} />
                    <Text
                        position={[meshRef.current!.position.x, planet.size + 3, meshRef.current!.position.z]}
                        color="white"
                        fontSize={1.5}
                        anchorX="center"
                        anchorY="bottom"
                        outlineWidth={0.2}
                        outlineColor="#000000"
                    >
                        {planet.name}
                    </Text>
                </>
            )}
        </group>
    );
};

const SolarSystem: React.FC = () => {
    const router = useRouter();
    const { camera, controls } = useThree();
    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    const [originalPosition] = useState(() => camera.position.clone());
    const [originalTarget] = useState(() => (controls as OrbitControls).target.clone());

    const planets = useMemo(() => [
        new PlanetSystem({
            size: 1.5,
            distance: 20,
            speed: 0.02,
            name: 'Mercury',
            texture: '/images/textures/2k_mercury.jpg',
            link: '/mercury'
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 30,
            speed: 0.015,
            name: 'Venus',
            texture: '/images/textures/2k_venus_surface.jpg',
            link: '/venus'
        }),
        new PlanetSystem({
            size: 2.5,
            distance: 45,
            speed: 0.01,
            name: 'Earth',
            texture: '/images/textures/2k_earth_normal.jpg',
            normalMap: '/images/textures/2k_earth_normal.jpg',
            roughnessMap: '/images/textures/2k_earth_normal.jpg',
            link: '/earth'
        }),
        new PlanetSystem({
            size: 2,
            distance: 60,
            speed: 0.008,
            name: 'Mars',
            texture: '/images/textures/2k_mars.jpg',
            link: '/mars'
        }),
        new PlanetSystem({
            size: 4.5,
            distance: 80,
            speed: 0.005,
            name: 'Jupiter',
            texture: '/images/textures/2k_jupiter.jpg',
            link: '/jupiter'
        }),
        new PlanetSystem({
            size: 4,
            distance: 100,
            speed: 0.003,
            name: 'Saturn',
            texture: '/images/textures/2k_saturn.jpg',
            link: '/saturn'
        }),
    ], []);

    useFrame(({ clock }) => {
        if (targetPosition) {
            // Smooth camera transition to target
            camera.position.lerp(
                new Vector3(
                    targetPosition.x * 0.8,
                    targetPosition.y + 20,
                    targetPosition.z * 0.8
                ),
                0.1
            );
            (controls as OrbitControls).target.lerp(targetPosition, 0.1);
        } else {
            // Return to original position
            camera.position.lerp(originalPosition, 0.1);
            (controls as OrbitControls).target.lerp(originalTarget, 0.1);
        }
    });

    const handlePlanetClick = (route: string, position: Vector3) => {
        if (targetPosition?.equals(position)) {
            // Clicking same planet again resets view
            setTargetPosition(null);
        } else {
            setTargetPosition(new Vector3(position.x, 0, position.z));
        }
    };

    return (
        <group>
            {/* Sun */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshStandardMaterial
                    color="#FDB813"
                    emissive="#FDB813"
                    emissiveIntensity={2}
                    metalness={0.1}
                    roughness={0.6}
                />
                <pointLight
                    intensity={5}
                    distance={500}
                    decay={1.5}
                    color="#ff6600"
                />
            </mesh>

            {/* Planets */}
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