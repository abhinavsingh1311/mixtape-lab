import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const configureModel = () => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    return gltfLoader;
};

export const MODELS = {
    FLOATING_ISLAND: '/models/float.glb',
    ROOM: '/models/room-optimized.glb'
} as const;