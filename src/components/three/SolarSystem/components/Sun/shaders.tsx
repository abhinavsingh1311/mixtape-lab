import * as THREE from 'three';

export const coronaShader = {
    uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color("#ff6600") }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            float turbulence = abs(
                sin(vUv.x * 10.0 + time) +
                sin(vUv.y * 15.0 + time * 0.8) +
                sin((vUv.x + vUv.y) * 8.0 + time * 1.2)
            ) * 0.3;
            
            float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
            float alpha = fresnel * (0.8 - turbulence * 0.5);
            
            vec3 finalColor = mix(color, vec3(1.0, 0.8, 0.4), turbulence);
            gl_FragColor = vec4(finalColor, alpha * 0.6);
        }
    `
};