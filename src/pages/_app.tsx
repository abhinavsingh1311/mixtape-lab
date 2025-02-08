// pages/_app.tsx
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isHomePage = router.pathname === '/';

    return (
        <div className={isHomePage ? 'grid-overlay' : ''}>
            <AnimatePresence mode='wait'>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </div>
    );
}