// src/utils/textureLoader.ts
import * as THREE from 'three';

export const loadTexture = (path: string) => {
    const fallbackTexture = new THREE.Texture();
    try {
        const texture = new THREE.TextureLoader().load(path,
            // Success callback
            (loadedTexture) => {
                loadedTexture.colorSpace = THREE.SRGBColorSpace;
            },
            // Progress callback
            undefined,
            // Error callback
            (error) => {
                console.error(`Error loading texture ${path}:`, error);
            }
        );
        return texture;
    } catch (error) {
        console.error(`Failed to load texture ${path}:`, error);
        return fallbackTexture;
    }
};