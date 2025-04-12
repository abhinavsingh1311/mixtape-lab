import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useEffect, useState } from 'react';

// In _app.tsx
function MyApp({ Component, pageProps }: AppProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Initial check
        checkMobile();

        // Listen for resize events
        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Pass isMobile to all pages
    return (
        <ErrorBoundary fallback={(error) => (
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
        )}>
            <Component {...pageProps} isMobile={isMobile} />
        </ErrorBoundary>
    );
}


export default dynamic(() => Promise.resolve(MyApp), { ssr: false });