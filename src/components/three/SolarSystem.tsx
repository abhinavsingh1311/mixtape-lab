// src/components/three/SolarSystem.tsx
import { useRef, useMemo, useState, useEffect } from 'react';
import {ThreeEvent, useFrame, useThree} from '@react-three/fiber';
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


const AsteroidBelt: React.FC = () => {
    const asteroids = useMemo(() => {
        const innerRadius = 120; // Mars orbit
        const outerRadius = 140; // Jupiter orbit
        const count = 1000;
        const temp = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            // Random radius between inner and outer bounds
            const distance = innerRadius + Math.random() * (outerRadius - innerRadius);
            // Slightly randomize the vertical position for a more natural look
            const verticalOffset = (Math.random() - 0.5) * 4;

            temp.push({
                position: [
                    Math.cos(angle) * distance,
                    verticalOffset,
                    Math.sin(angle) * distance
                ],
                rotation: [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ],
                scale: Math.random() * 0.3 + 0.1 // Varied sizes between 0.1 and 0.4
            });
        }
        return temp;
    }, []);

    return (
        <group>
            {asteroids.map((asteroid, i) => (
                <mesh
                    key={i}
                    position={asteroid.position as any}
                    rotation={asteroid.rotation as any}
                >
                    <dodecahedronGeometry args={[asteroid.scale]} />
                    <meshStandardMaterial
                        color="#888888"
                        roughness={0.8}
                        metalness={0.2}
                    />
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
                map={ringAlphaMap}
                alphaMap={ringColorMap}
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
    const router = useRouter();
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [textures, setTextures] = useState<{
        map: THREE.Texture;
        bumpMap?: THREE.Texture;
    }>({ map: FALLBACK_TEXTURE });

    const handlePlanetClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        // Navigate to the planet-specific page
        router.push(`/planets/${planet.name.toLowerCase()}`);
        // Also call the original onClick for any camera animations
        onClick(planet.link, new Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));
    };

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
                onClick={handlePlanetClick}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'default';
                }}
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
                                <div className="text-xs text-blue-300">Click to explore</div>
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

// Enhanced Sun component with volumetric corona and glare effects
const SunCorona: React.FC = () => {
    const coronaRef = useRef<THREE.Mesh>(null);
    const glareRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Custom shader for turbulent corona effect
    const coronaShader = {
        uniforms: {
            time: { value: 0 },
            color: { value: new THREE.Color("#ff6600") }
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float time;
            uniform vec3 color;
            varying vec2 vUv;
            varying vec3 vNormal;

            // Simplex noise function
            vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
            vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
            vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

            float snoise(vec3 v) {
                const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

                vec3 i  = floor(v + dot(v, C.yyy));
                vec3 x0 = v - i + dot(i, C.xxx);
                vec3 g = step(x0.yzx, x0.xyz);
                vec3 l = 1.0 - g;
                vec3 i1 = min( g.xyz, l.zxy );
                vec3 i2 = max( g.xyz, l.zxy );
                vec3 x1 = x0 - i1 + C.xxx;
                vec3 x2 = x0 - i2 + C.yyy;
                vec3 x3 = x0 - D.yyy;

                i = mod289(i);
                vec4 p = permute( permute( permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

                float n_ = 0.142857142857;
                vec3 ns = n_ * D.wyz - D.xzx;

                vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

                vec4 x_ = floor(j * ns.z);
                vec4 y_ = floor(j - 7.0 * x_);

                vec4 x = x_ *ns.x + ns.yyyy;
                vec4 y = y_ *ns.x + ns.yyyy;
                vec4 h = 1.0 - abs(x) - abs(y);

                vec4 b0 = vec4( x.xy, y.xy );
                vec4 b1 = vec4( x.zw, y.zw );

                vec4 s0 = floor(b0)*2.0 + 1.0;
                vec4 s1 = floor(b1)*2.0 + 1.0;
                vec4 sh = -step(h, vec4(0.0));

                vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

                vec3 p0 = vec3(a0.xy,h.x);
                vec3 p1 = vec3(a0.zw,h.y);
                vec3 p2 = vec3(a1.xy,h.z);
                vec3 p3 = vec3(a1.zw,h.w);

                vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
                p0 *= norm.x;
                p1 *= norm.y;
                p2 *= norm.z;
                p3 *= norm.w;

                vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                m = m * m;
                return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
            }

            void main() {
                vec3 noise = vec3(
                    snoise(vec3(vUv * 5.0, time * 0.1)),
                    snoise(vec3(vUv * 5.0, time * 0.2 + 100.0)),
                    snoise(vec3(vUv * 5.0, time * 0.3 + 200.0))
                );

                float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
                float turbulence = abs(noise.x + noise.y + noise.z) * 0.3;
                
                vec3 finalColor = mix(color, vec3(1.0, 0.8, 0.4), turbulence);
                float alpha = fresnel * (0.8 - turbulence * 0.5);
                
                gl_FragColor = vec4(finalColor, alpha * 0.6);
            }
        `
    };

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <group>
            {/* Volumetric corona */}
            <mesh ref={coronaRef} scale={[1.3, 1.3, 1.3]}>
                <sphereGeometry args={[20, 64, 64]} />
                <shaderMaterial
                    ref={materialRef}
                    args={[coronaShader]}
                    transparent
                    depthWrite={false}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Random glare streaks */}
            <GlareStreaks />
        </group>
    );
};

// Component for random glare streaks
const GlareStreaks: React.FC = () => {
    const streaksRef = useRef<THREE.Group>(null);

    const streaks = useMemo(() => {
        const streakCount = 8;
        const streakData = [];

        for (let i = 0; i < streakCount; i++) {
            const angle = (Math.PI * 2 * i) / streakCount + Math.random() * 0.5;
            const length = 25 + Math.random() * 15;
            const width = 0.5 + Math.random() * 1.5;

            streakData.push({ angle, length, width });
        }

        return streakData;
    }, []);

    useFrame(({ clock }) => {
        if (streaksRef.current) {
            streaksRef.current.rotation.z = clock.getElapsedTime() * 0.05;
            streaksRef.current.children.forEach((child, i) => {
                const scale = 1 + Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.2;
                child.scale.setX(scale);
            });
        }
    });

    return (
        <group ref={streaksRef}>
            {streaks.map((streak, i) => (
                <mesh
                    key={i}
                    rotation-z={streak.angle}
                    position-z={-0.1}
                >
                    <planeGeometry args={[streak.length, streak.width]} />
                    <meshBasicMaterial
                        color="#ffaa44"
                        transparent
                        opacity={0.4}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Updated Sun component
const Sun: React.FC = () => {
    const sunRef = useRef<THREE.Mesh>(null);
    const [sunTexture, setSunTexture] = useState<THREE.Texture>(FALLBACK_TEXTURE);

    useEffect(() => {
        new THREE.TextureLoader().load(
            '/textures/sun/sunmap.jpg',
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
                <sphereGeometry args={[20, 64, 64]} />
                <meshStandardMaterial
                    map={sunTexture}
                    emissive="#FF4500"
                    emissiveIntensity={2}
                    color="#FDB813"
                />
            </mesh>
            <SunCorona />
            <pointLight intensity={8} distance={1000} decay={1.5} color="#ff6600" />
            <pointLight intensity={4} distance={500} decay={2} color="#ff8833" />
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
            distance: 40,
            speed: 0.001,
            name: 'Mercury',
            texture: '2k_mercury.jpg',
            bumpMap: 'mercurybump.jpg',
            link: '/planets/mercury',
            description: 'Learn about my journey'
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 60,
            speed: 0.0008,
            name: 'Venus',
            texture: '2k_venus_surface.jpg',
            bumpMap: 'venusbump.jpg',
            link: '/planets/venus',
            description: 'Explore my work'
        }),
        new PlanetSystem({
            size: 2.5,
            distance: 85,
            speed: 0.0006,
            name: 'Earth',
            texture: 'earthmap1k.jpg',
            bumpMap: 'earthbump1k.jpg',
            link: '/planets/earth',
            description: 'Technical expertise',
            moons: [{
                texture: '2k_moon_normal.jpg'
            }]
        }),
        new PlanetSystem({
            size: 2.2,
            distance: 105,
            speed: 0.0004,
            name: 'Mars',
            texture: '2k_mars.jpg',
            bumpMap: 'marsbump1k.jpg',
            link: '/planets/mars',
            description: 'Professional journey'
        }),
        new PlanetSystem({
            size: 4.5,
            distance: 200,
            speed: 0.0003,
            name: 'Jupiter',
            texture: 'jupitermap.jpg',
            link: '/planets/jupiter',
            description: 'Contact me'
        }),
        new PlanetSystem({
            size: 4,
            distance: 250, // Increased distance for Saturn
            speed: 0.0002,
            name: 'Saturn',
            texture: 'saturnmap.jpg',
            link: '/planets/saturn',
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

            <AsteroidBelt /> {/* Asteroid belt between Mars and Jupiter */}
            <Comet />
            <ambientLight intensity={0.5} />
            <hemisphereLight intensity={0.8} color="#ffffff" groundColor="#404040" />
        </group>
    );
};

export default SolarSystem;