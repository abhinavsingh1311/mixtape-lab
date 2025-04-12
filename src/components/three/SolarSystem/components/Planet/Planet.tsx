import { useRef, useState, useEffect } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { PlanetProps as ImportedPlanetProps } from '../../types';
import { Moon } from '../Moon';
import { OrbitLine } from '../OrbitLine';
import { PlanetGlow } from './PlanetGlow';
import { AtmosphericGlow } from './AtmosphericGlow';
import { SaturnRings } from './SaturnRings';
import useSound from 'use-sound';
import * as THREE from 'three';

// Create an extended interface with a different name
interface ExtendedPlanetProps extends ImportedPlanetProps {
    isMobile: boolean;
}

export const Planet: React.FC<ExtendedPlanetProps> = ({
    planet,
    onClick,
    index,
    isMobile
}) => {
    const [playClickSound] = useSound('/sounds/click.mp3');
    const [playHoverSound] = useSound('/sounds/transition.mp3');
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [textures, setTextures] = useState<{
        map: THREE.Texture;
        bumpMap?: THREE.Texture;
    }>({ map: new THREE.TextureLoader().load('/images/fallback.png') });

    // For mobile, we'll show labels permanently for better visibility
    const showLabel = isMobile || hovered;

    const handlePlanetClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        playClickSound();

        // First click shows info, unless it's already showing
        if (!showInfo) {
            setShowInfo(true);
        }
    };

    const handleInfoClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        playClickSound();

        // Navigate to the planet page
        onClick(planet.link, new THREE.Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));

        // Reset info display
        setShowInfo(false);
    };

    const closeInfo = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowInfo(false);
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
                        }
                    );
                } else {
                    setTextures({ map });
                }
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
                onPointerOver={(e: ThreeEvent<MouseEvent>) => {
                    if (!isMobile) { // Hover effects only on desktop
                        setHovered(true);
                        document.body.style.cursor = 'pointer';
                        playHoverSound();
                    }
                }}
                onPointerOut={() => {
                    if (!isMobile) {
                        setHovered(false);
                        document.body.style.cursor = 'auto';
                    }
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
                        {!showInfo && (
                            <Text
                                position={[0, planet.size + 3 + (index * 1.5), 0]}
                                fontSize={2.5}
                                color="white"
                                anchorX="center"
                                anchorY="middle"
                                rotation={[0.5, Math.PI, 0]}
                            >
                                {planet.name}
                            </Text>
                        )}
                    </>
                )}
                {showInfo && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{planet.name}</h3>
                                <button
                                    onClick={closeInfo}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="mb-4">{planet.description}</div>
                            <button
                                className="block w-full text-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition-colors"
                                onClick={handleInfoClick}
                            >
                                LEARN ABOUT MY {planet.name.toUpperCase()}
                            </button>
                        </div>
                    </Html>
                )}
                {planet.name === 'Saturn' && <SaturnRings planetSize={planet.size} />}
                {planet.name === 'Earth' && <AtmosphericGlow radius={planet.size} />}
                {planet.moons?.map((moon, moonIndex) => (
                    <Moon
                        key={moonIndex}
                        parentSize={planet.size}
                        {...moon}
                    />
                ))}
            </mesh>
        </group>
    );
};
