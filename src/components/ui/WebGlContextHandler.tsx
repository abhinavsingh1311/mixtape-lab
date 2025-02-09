// components/three/WebGLContextHandler.tsx
import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

type WebGLContextEventMap = {
    'webglcontextlost': WebGLContextEvent;
    'webglcontextrestored': WebGLContextEvent;
};

export function WebGLContextHandler() {
    const { gl } = useThree();

    useEffect(() => {
        const canvas = gl.domElement;

        const handleContextLost = (event: WebGLContextEvent) => {
            event.preventDefault();
            console.warn('WebGL context lost. Attempting to restore...');
        };

        const handleContextRestored = () => {
            console.log('WebGL context restored');
            // Safely attempt to restore context
            try {
                const contextAttribs = (gl as THREE.WebGLRenderer).getContext().getContextAttributes();
                (gl as THREE.WebGLRenderer).setPixelRatio(window.devicePixelRatio);
                (gl as THREE.WebGLRenderer).setSize(window.innerWidth, window.innerHeight);
                if (contextAttribs) {
                    (gl as THREE.WebGLRenderer).getContext().getExtension('WEBGL_lose_context');
                }
            } catch (error) {
                console.error('Error restoring WebGL context:', error);
            }
        };

        // Type-safe event listeners
        canvas.addEventListener('webglcontextlost', handleContextLost as EventListener);
        canvas.addEventListener('webglcontextrestored', handleContextRestored as EventListener);

        return () => {
            canvas.removeEventListener('webglcontextlost', handleContextLost as EventListener);
            canvas.removeEventListener('webglcontextrestored', handleContextRestored as EventListener);
        };
    }, [gl]);

    return null;
}