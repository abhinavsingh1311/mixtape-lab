import { useEffect } from 'react';

export function useDisableBvh() {
    useEffect(() => {
        // Find and disable the BVH component in drei to prevent BatchedMesh errors
        try {
            const dreiModule = require('@react-three/drei');
            if (dreiModule && dreiModule.Bvh) {
                // Replace Bvh with a dummy component that just renders its children
                dreiModule.Bvh = ({ children }) => children;
            }
        } catch (e) {
            console.warn('Could not patch drei Bvh component:', e);
        }
    }, []);
}
