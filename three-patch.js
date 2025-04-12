// three-patch.js
import * as THREE from 'three';

if (!THREE.BatchedMesh) {
    THREE.BatchedMesh = class BatchedMesh extends THREE.Mesh {
        constructor() {
            super();
            console.warn('Using BatchedMesh polyfill');
        }
    };
}

export default THREE;
