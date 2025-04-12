import { MoonData, PlanetSystemProps } from "@/components/three/SolarSystem/types";

export class PlanetSystem {
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