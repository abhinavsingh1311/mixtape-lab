// utils/modelUtils.ts
import { useGLTF } from '@react-three/drei';

export const MODELS = {
    FLOATING_ISLAND: '/models/float.glb',
    ROOM: '/models/room-optimized.glb'
} as const;

export type ModelKey = keyof typeof MODELS;

export async function preloadModel(modelPath: string): Promise<void> {
    try {
        await useGLTF.preload(modelPath);
    } catch (error) {
        console.error(`Error preloading model ${modelPath}:`, error);
        throw error;
    }
}

export function clearModels(): void {
    try {
        useGLTF.clear;
    } catch (error) {
        console.error('Error clearing models:', error);
    }
}

export function waitForModels(modelPaths: string[]): Promise<void[]> {
    return Promise.all(modelPaths.map(path => preloadModel(path)));
}