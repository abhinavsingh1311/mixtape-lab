// src/components/shared/Layout.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode, useEffect } from 'react';
import { spaceGrotesk } from '@/utils/fonts';

interface LayoutProps {
    children: ReactNode;
    color: string;
    title: string;
    description: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, color, title, description }) => {
    useEffect(() => {
        document.body.classList.add('allow-scroll');
        document.body.classList.remove('no-scroll');

        return () => {
            document.body.classList.remove('allow-scroll');
        };
    }, []);

    return (
        <div
            className={`min-h-screen text-white p-4 md:p-8 overflow-auto ${spaceGrotesk.className}`}
            style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, black)` }}
        >
            <nav className="fixed top-4 right-4 z-50 flex gap-2 md:gap-4">
                <Link
                    href="/solar-system"
                    className="px-3 py-2 md:px-4 md:py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors text-sm md:text-base"
                >
                    Back to Solar System
                </Link>
            </nav>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto pt-16 pb-20"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-2 font-starjedi" style={{ color }}>
                    {title}
                </h1>
                <p className="text-gray-400 mb-8">{description}</p>
                {children}
            </motion.div>
        </div>
    );
};
