// src/components/three/SolarSystem.tsx
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRouter } from 'next/router';
import { Html, useTexture, OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

// Set color management
THREE.ColorManagement.enabled = true;

// Fallback texture
const FALLBACK_TEXTURE = new THREE.TextureLoader().load('/textures/fallback.jpg');

interface MoonData {
    texture: string;
    size?: number;
    distance?: number;
    speed?: number;
}

interface PlanetSystemProps {
    size: number;
    distance: number;
    speed: number;
    name: string;
    link: string;
    texture: string;
    bumpMap?: string;
    description?: string;
    moons?: MoonData[];
}

class PlanetSystem {
    size: number;
    distance: number;
    speed: number;
    angle: number;
    name: string;
    link: string;
    texture: string;
    bumpMap?: string;
    description: string;
    moons?: MoonData[];

    constructor({
                    size,
                    distance,
                    speed,
                    name,
                    link,
                    texture,
                    bumpMap,
                    description = '',
                    moons = []
                }: PlanetSystemProps) {
        this.size = size;
        this.distance = distance;
        this.speed = speed;
        this.angle = Math.random() * Math.PI * 2;
        this.name = name;
        this.link = link;
        this.texture = texture;
        this.bumpMap = bumpMap;
        this.description = description;
        this.moons = moons;
    }

    update(): { x: number; z: number } {
        this.angle += this.speed;
        return {
            x: Math.cos(this.angle) * this.distance,
            z: Math.sin(this.angle) * this.distance
        };
    }
}

const Moon: React.FC<MoonData & { parentSize: number }> = ({
                                                               parentSize,
                                                               texture,
                                                               size = parentSize * 0.2,
                                                               distance = parentSize * 2,
                                                               speed = 0.02
                                                           }) => {
    const moonRef = useRef<THREE.Mesh>(null);
    const [moonTexture, setMoonTexture] = useState<THREE.Texture>(FALLBACK_TEXTURE);
    const [angle, setAngle] = useState(Math.random() * Math.PI * 2);

    useEffect(() => {
        new THREE.TextureLoader().load(
            `/textures/moon/${texture}`,
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
                setMoonTexture(loadedTexture);
            },
            undefined,
            (error) => {
                console.error('Failed to load moon texture:', error);
                setMoonTexture(FALLBACK_TEXTURE);
            }
        );
    }, [texture]);

    useFrame(() => {
        setAngle((prev) => prev + speed);
        if (moonRef.current) {
            moonRef.current.position.x = Math.cos(angle) * distance;
            moonRef.current.position.z = Math.sin(angle) * distance;
            moonRef.current.rotation.y += 0.001;
        }
    });

    return (
        <mesh ref={moonRef} position={[distance, 0, 0]}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial
                map={moonTexture}
                metalness={0.2}
                roughness={0.7}
            />
        </mesh>
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

const PlanetGlow: React.FC<{ radius: number; color: string }> = ({ radius, color }) => (
    <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
            color={color}
            transparent
            opacity={0.3}
            emissive={color}
            emissiveIntensity={0.5}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
        />
    </mesh>
);
const AtmosphericGlow: React.FC<{ radius: number }> = ({ radius }) => (
    <mesh scale={[1.1, 1.1, 1.1]}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
        />
    </mesh>
);


const AsteroidBelt: React.FC<{ radius: number; width: number; count: number }> = ({ radius, width, count }) => {
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = radius + (Math.random() - 0.5) * width;
            temp.push({
                position: [
                    Math.cos(angle) * distance,
                    (Math.random() - 0.5) * 2,
                    Math.sin(angle) * distance
                ],
                scale: Math.random() * 0.1 + 0.05
            });
        }
        return temp;
    }, [radius, width, count]);

    return (
        <group>
            {asteroids.map((asteroid, i) => (
                <mesh key={i} position={asteroid.position as any}>
                    <sphereGeometry args={[asteroid.scale, 8, 8]} />
                    <meshStandardMaterial color="#888888" roughness={0.8} />
                </mesh>
            ))}
        </group>
    );
};

const SaturnRings: React.FC<{ planetSize: number }> = ({ planetSize }) => {
    const [ringColorMap, ringAlphaMap] = useTexture([
        '/textures/saturn/saturn_rings.jpg', // Color map
        '/textures/saturn/saturnringpattern.gif' // Transparency map
    ]);


    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planetSize * 1.5, planetSize * 2.5, 64]} />
            <meshStandardMaterial
                map={ringColorMap}
                alphaMap={ringAlphaMap}
                transparent
                side={THREE.DoubleSide}
                opacity={0.85}
                depthWrite={false}
            />
        </mesh>
    );
};

const Comet: React.FC = () => {
    const cometRef = useRef<THREE.Mesh>(null);
    const trailRef = useRef<THREE.Line>();
    const [trailPoints] = useState(() => new Float32Array(100 * 3));
    const [position] = useState(new Vector3());
    const [angle, setAngle] = useState(0);

    // Initialize trail geometry
    const trailGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(trailPoints, 3));
        return geometry;
    }, [trailPoints]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const speed = 0.3;

        // Update comet position on elliptical path
        setAngle(prev => prev + speed * 0.01);
        position.set(
            Math.cos(angle) * 250,
            Math.sin(angle * 2) * 50,
            Math.sin(angle) * 250
        );

        // Update comet mesh
        if (cometRef.current) {
            cometRef.current.position.copy(position);
            cometRef.current.rotation.y += 0.05;
        }

        // Update trail positions
        const positions = trailGeometry.attributes.position.array as Float32Array;
        for (let i = positions.length - 3; i >= 3; i -= 3) {
            positions[i] = positions[i - 3];
            positions[i + 1] = positions[i - 2];
            positions[i + 2] = positions[i - 1];
        }
        positions[0] = position.x;
        positions[1] = position.y;
        positions[2] = position.z;
        trailGeometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            {/* Comet Head */}
            <mesh ref={cometRef}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial
                    color="#aaddff"
                    emissive="#44aaff"
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Comet Tail */}
            <line ref={trailRef as any}>
                <primitive object={trailGeometry} />
                <lineBasicMaterial
                    color="#44aaff"
                    transparent
                    opacity={0.2}
                    linewidth={2}
                />
            </line>
        </group>
    );
};

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [textures, setTextures] = useState<{
        map: THREE.Texture;
        bumpMap?: THREE.Texture;
    }>({ map: FALLBACK_TEXTURE });

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(`/textures/${planet.name.toLowerCase()}/${planet.texture}`,
            (map) => {
                map.colorSpace = THREE.SRGBColorSpace;
                if (planet.bumpMap) {
                    loader.load(`/textures/${planet.name.toLowerCase()}/${planet.bumpMap}`,
                        (bumpMap) => {
                            bumpMap.colorSpace = THREE.SRGBColorSpace;
                            setTextures({ map, bumpMap });
                        },
                        undefined,
                        (error) => {
                            console.error('Failed to load bump map:', error);
                            setTextures({ map });
                        }
                    );
                } else {
                    setTextures({ map });
                }
            },
            undefined,
            (error) => {
                console.error('Failed to load planet texture:', error);
                setTextures({ map: FALLBACK_TEXTURE });
            }
        );
    }, [planet.texture, planet.bumpMap, planet.name]);

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
                    map={textures.map}
                    bumpMap={textures.bumpMap}
                    metalness={0.2}
                    roughness={0.8}
                />

                {hovered && (
                    <>
                        <PlanetGlow radius={planet.size} color="#ffffff" />
                        <Html position={[0, planet.size + 3, 0]}>
                            <div className="bg-black/75 text-white px-3 py-1 rounded text-sm whitespace-nowrap">
                                {planet.name}
                                {planet.description && (
                                    <div className="text-xs opacity-75">{planet.description}</div>
                                )}
                            </div>
                        </Html>
                    </>
                )}

                {planet.name === 'Saturn' && <SaturnRings planetSize={planet.size} />}
                {planet.name === 'Earth' && <AtmosphericGlow radius={planet.size} />}
                {planet.moons?.map((moon, index) => (
                    <Moon
                        key={index}
                        parentSize={planet.size}
                        {...moon}
                    />
                ))}
            </mesh>
        </group>
    );
};

const Sun: React.FC = () => {
    const sunRef = useRef<THREE.Mesh>(null);
    const [sunTexture, setSunTexture] = useState<THREE.Texture>(FALLBACK_TEXTURE);

    useEffect(() => {
        new THREE.TextureLoader().load(
            '/textures/sun/2k_sun.jpg',
            (texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                setSunTexture(texture);
            },
            undefined,
            (error) => {
                console.error('Failed to load sun texture:', error);
                setSunTexture(FALLBACK_TEXTURE);
            }
        );
    }, []);

    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <group>
            <mesh ref={sunRef}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    map={sunTexture}
                    color="#FDB813"
                />
            </mesh>

            <pointLight
                intensity={5}
                distance={500}
                decay={1.5}
                color="#ff6600"
            />
        </group>
    );
};


interface SolarSystemProps {
    cameraMode: 'free' | 'locked';
    setCameraMode: (mode: 'free' | 'locked') => void;
}


const SolarSystem: React.FC<SolarSystemProps> = ({ cameraMode, setCameraMode }) => {
    const router = useRouter();
    const { camera } = useThree();
    const [targetPosition, setTargetPosition] = useState<Vector3 | null>(null);
    // const [cameraMode, setCameraMode] = useState<'free' | 'locked'>('free');
    const originalPosition = useMemo(() => camera.position.clone(), [camera]);

    const planets = useMemo(() => [
        new PlanetSystem({
            size: 1.5,
            distance: 20,
            speed: 0.001,
            name: 'Mercury',
            texture: '2k_mercury.jpg',
            bumpMap: 'mercurybump.jpg',
            link: '/mercury',
            description: 'Learn about my journey'
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 30,
            speed: 0.0008,
            name: 'Venus',
            texture: '2k_venus_surface.jpg',
            bumpMap: 'venusbump.jpg',
            link: '/venus',
            description: 'Explore my work'
        }),
        new PlanetSystem({
            size: 2.5,
            distance: 45,
            speed: 0.0006,
            name: 'Earth',
            texture: 'earthmap1k.jpg',
            bumpMap: 'earthbump1k.jpg',
            link: '/earth',
            description: 'Technical expertise',
            moons: [{
                texture: '2k_moon_normal.jpg'
            }]
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 60,
            speed: 0.0004,
            name: 'Mars',
            texture: '2k_mars.jpg',
            bumpMap: 'marsbump1k.jpg',
            link: '/mars',
            description: 'Professional journey'
        }),
        new PlanetSystem({
            size: 4.5,
            distance: 120,
            speed: 0.0003,
            name: 'Jupiter',
            texture: '2k_jupiter.jpg',
            link: '/jupiter',
            description: 'Contact me'
        }),
        new PlanetSystem({
            size: 4,
            distance: 200, // Increased distance for Saturn
            speed: 0.0002,
            name: 'Saturn',
            texture: '2k_saturn.jpg',
            link: '/saturn',
            description: 'Read my thoughts'
        })
    ], []);

    useFrame(() => {
        if (cameraMode === 'locked' && targetPosition) {
            camera.position.lerp(
                new Vector3(
                    targetPosition.x * 2.5,
                    targetPosition.y + 25,
                    targetPosition.z * 1.5
                ),
                0.05
            );
        } else if (cameraMode === 'free') {
            camera.position.lerp(originalPosition, 0.05);
        }
    });

    const handlePlanetClick = (route: string, position: Vector3) => {
        if (cameraMode === 'locked') {
            setCameraMode('free');
            setTargetPosition(null);
        } else {
            setCameraMode('locked');
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

            <AsteroidBelt radius={70} width={10} count={500} /> {/* Asteroid belt between Mars and Jupiter */}
            <Comet />
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#404040" />
        </group>
    );
};

export default SolarSystem;