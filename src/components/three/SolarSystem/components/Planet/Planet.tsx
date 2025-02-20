import { useRef, useState, useEffect } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
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
    const [playHoverSound] = useSound('/sounds/transition.mp3',
        {
            volume: 0.1,
            interrupt: true,
            loop: false,
        })
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [textures, setTextures] = useState<{
        map: THREE.Texture;
        bumpMap?: THREE.Texture;
    }>({ map: new THREE.TextureLoader().load('/images/fallback.png') });

    const handlePlanetClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        playClickSound();
        onClick(planet.link, new THREE.Vector3(meshRef.current!.position.x, 0, meshRef.current!.position.z));
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
                        <Text
                            position={[0, planet.size + 3 + (index * 1.5), 0]}
                            fontSize={0.8}
                            color="white"
                            anchorX="center"
                            anchorY="middle"
                            rotation={[0, Math.PI, 0]}
                        >
                            {planet.name}
                        </Text>
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