import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { coronaShader } from './shaders';
import { GlareStreaks } from './GlareStreaks';

export const SunCorona: React.FC = () => {
    const coronaRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.time.value = clock.getElapsedTime();
        }
    });

    return (
        <group>
            <mesh ref={coronaRef} scale={[1.3, 1.3, 1.3]}>
                <sphereGeometry args={[20, 64, 64]} />
                <shaderMaterial
                    ref={materialRef}
                    args={[coronaShader]}
                    transparent
                    depthWrite={false}
                    side={THREE.BackSide}
                />
            </mesh>
            <GlareStreaks />
        </group>
    );
};
