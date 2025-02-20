import * as THREE from 'three';

export const SpaceFogShader = {
    uniforms: {
        time: { value: 0 },
        baseColor: { value: new THREE.Color('#020617') },
        fogColor: { value: new THREE.Color('#0f172a') },
        density: { value: 0.5 }
    },
    vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 fogColor;
        uniform float density;
        
        varying vec2 vUv;
        varying vec3 vPosition;

        float rand(vec2 n) { 
            return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
            vec2 ip = floor(p);
            vec2 u = fract(p);
            u = u*u*(3.0-2.0*u);
            float res = mix(
                mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
                mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
            return res*res;
        }

        void main() {
            vec2 uv = vUv * 2.0;
            float t = time * 0.1;
            
            float nebula = 0.0;
            for(float i = 0.0; i < 6.0; i++) {
                float scale = 1.0 - (i / 6.0);
                nebula += noise(uv * scale * 4.0 + t + i) * scale;
            }
            
            vec3 color = mix(baseColor, fogColor, nebula * density);
            gl_FragColor = vec4(color, 1.0);
        }
    `
};