import { useRef, useState, useEffect } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import { PlanetProps } from '../../types';
import { Moon } from '../Moon';
import { OrbitLine } from '../OrbitLine';
import { PlanetGlow } from './PlanetGlow';
import { AtmosphericGlow } from './AtmosphericGlow';
import { SaturnRings } from './SaturnRings';
import useSound from 'use-sound';
import * as THREE from 'three';

export const Planet: React.FC<PlanetProps> = ({ planet, onClick, index }) => {
    const [playClickSound] = useSound('/sounds/click.mp3');
    const [playHoverSound] = useSound('/sounds/transition.mp3');
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [textures, setTextures] = useState<{
        map: THREE.Texture;
        bumpMap?: THREE.Texture;
    }>({ map: new THREE.TextureLoader().load('/images/fallback.png') });

    const handlePlanetClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        if (planet.name !== "xx") {
            setShowOptions(!showOptions);
        } else {
            playClickSound();
            onClick(planet.link, new THREE.Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));
        }
    };

    const handleOptionClick = (option: 'view' | 'download' | 'navigate') => (e: React.MouseEvent) => {
        e.stopPropagation();
        playClickSound();

        switch (option) {
            case 'view':
                window.open('/resume.pdf', '_blank');
                break;
            case 'download':
                const link = document.createElement('a');
                link.href = '/resume.pdf';
                link.download = 'AbhinavSingh_Resume.pdf';
                link.click();
                break;
            case 'navigate':
                onClick(planet.link, new THREE.Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));
                break;
        }
        setShowOptions(false);
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
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                    playHoverSound();
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
                        {!showOptions && (
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

                {showOptions && planet.name === 'Mercury' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
                {showOptions && planet.name === 'Venus' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
                {showOptions && planet.name === 'Earth' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
                {showOptions && planet.name === 'Mars' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
                {showOptions && planet.name === 'Jupiter' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
                {planet.name === 'Saturn' && <SaturnRings planetSize={planet.size} />}
                {showOptions && planet.name === 'Saturn' && (
                    <Html position={[0, planet.size + 2, 0]}>
                        <div className="bg-black/80 p-4 rounded-lg backdrop-blur-sm text-white min-w-[200px]">
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-white/20 rounded transition-colors"
                                onClick={handleOptionClick('navigate')}
                            >
                                {planet.description}
                            </button>
                        </div>
                    </Html>
                )}
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