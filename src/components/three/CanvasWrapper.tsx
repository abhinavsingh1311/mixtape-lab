// components/three/CanvasWrapper.tsx
import { Canvas, Props as CanvasProps, RootState } from '@react-three/fiber';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { WebGLContextHandler } from '../ui/WebGlContextHandler';
import { ReactNode } from 'react';
import * as THREE from 'three';

interface CanvasWrapperProps extends Omit<CanvasProps, 'children'> {
    children: ReactNode;
}

export function CanvasWrapper({ children, ...props }: CanvasWrapperProps) {
    return (
        <ErrorBoundary
            fallback={(error: Error) => (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-white text-center p-4">
                        <h2 className="text-xl mb-2">3D Scene Failed to Load</h2>
                        <p>{error.message}</p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 rounded"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )}
        >
            <Canvas
                {...props}
                onCreated={(state: RootState) => {
                    const { gl } = state;

                    // Set up initial WebGL state
                    gl.setClearColor('#000000', 0);
                    gl.setPixelRatio(window.devicePixelRatio);

                    // Enable shadows if needed
                    gl.shadowMap.enabled = true;
                    gl.shadowMap.type = THREE.PCFSoftShadowMap;

                    // Call the original onCreated if provided
                    if (props.onCreated) {
                        props.onCreated(state);
                    }
                }}
            >
                <WebGLContextHandler />
                {children}
            </Canvas>
        </ErrorBoundary>
    );
}