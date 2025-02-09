import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function ModelPreloader() {
    useEffect(() => {
        const loader = new GLTFLoader();
        const loadModels = async () => {
            try {
                await Promise.all([
                    loader.loadAsync('/models/f.glb'),
                    loader.loadAsync('/models/r.glb')
                ]);
            } catch (error) {
                console.error('Model preloading failed:', error);
            }
        };
        loadModels();
    }, []);

    return null;
}

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <>
            <ModelPreloader />
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
        </>
    );
}

export default dynamic(() => Promise.resolve(MyApp), { ssr: false });