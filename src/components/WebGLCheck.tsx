// components/WebGLCheck.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function WebGLCheck() {
    const router = useRouter();

    useEffect(() => {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            router.push('/webgl-error');
        }
    }, [router]);

    return null;
}