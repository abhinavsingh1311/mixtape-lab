import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useGLTF } from '@react-three/drei';

// Central place to manage model paths
export const MODELS = {
    FLOATING_ISLAND: '/models/float.glb',
    ROOM: '/models/room-optimized.glb'
} as const;

function ModelPreloader() {
    useEffect(() => {
        const preloadModels = async () => {
            try {
                // Preload models
                await Promise.all([
                    useGLTF.preload(MODELS.FLOATING_ISLAND),
                    useGLTF.preload(MODELS.ROOM)
                ]);
            } catch (error) {
                console.error('Model preloading failed:', error);
            }
        };

        preloadModels();

        // Cleanup
        return () => {
            useGLTF.clear;
        };
    }, []);

    return null;
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <ErrorBoundary
            fallback={(error) => (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80">
                    <div className="bg-white p-8 rounded-lg max-w-2xl w-full text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-700">{error.message}</p>
                        <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )}
        >
            <ModelPreloader />
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
        </ErrorBoundary>
    );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });