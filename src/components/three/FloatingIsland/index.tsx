import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { HologramSphere } from './components/HologramSphere';
import { ScatteredRocks } from "@/components/three/FloatingIsland/components/ScatteredRocks";
import { IslandBase } from "@/components/three/FloatingIsland/components/IslandBase";
import { Portal } from "@/components/three/FloatingIsland/components/Portal";
import { WelcomeText } from "@/components/three/FloatingIsland/components/Welcome";
import { Tree } from "@/components/three/FloatingIsland/components/Tree";


interface FloatingIslandProps {
    position?: [number, number, number] | THREE.Vector3;
    scale?: [number, number, number] | THREE.Vector3 | number;
    rotation?: [number, number, number] | THREE.Euler;
    onPortalClick: () => void;
    onLoad: () => void;
    [key: string]: any;
}

export default function FloatingIsland({ onPortalClick, onLoad, ...props }: FloatingIslandProps) {
    const groupRef = useRef<THREE.Group>(null);

    useEffect(() => {
        onLoad();
    }, [onLoad]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.2;
        }
    });

    return (
        <group ref={groupRef} {...props}>
            <HologramSphere />
            <IslandBase />
            <ScatteredRocks />
            <Tree position={[-1.8, 1, -1.8]} scale={1.2} />
            <Tree position={[2, 1, 1.5]} />
            <Tree position={[0.5, 1, -2]} scale={0.9} />
            <Portal onPortalClick={onPortalClick} />
            <WelcomeText />
        </group>
    );
}
