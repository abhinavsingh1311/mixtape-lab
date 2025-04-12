import { Vector3 } from 'three';
import { PlanetSystem } from "@/components/three/SolarSystem/models/PlanetSystem";

export interface MoonData {
    texture: string;
    size?: number;
    distance?: number;
    speed?: number;
}

export interface PlanetSystemProps {
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

export interface PlanetProps {
    planet: PlanetSystem;
    onClick: (route: string, position: Vector3) => void;
    index: number;
}

export type CameraMode = 'free' | 'locked';