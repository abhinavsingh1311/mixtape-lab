// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    return (
        <ErrorBoundary fallback={(error) => (
            <div className="error-screen">
                <h1>Something went wrong</h1>
                <p>{error.message}</p>
            </div>
        )}>
            <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
                <Component {...pageProps} key={router.asPath} />
            </AnimatePresence>
        </ErrorBoundary>
    );
}

export default MyApp;