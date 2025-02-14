import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    color: string;
    title: string;
    description: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, color, title, description }) => (
    <div
        className="min-h-screen text-white p-8"
        style={{ backgroundColor: `color-mix(in srgb, ${color} 10%, black)` }}
    >
        <nav className="fixed top-4 right-4 z-50 flex gap-4">
            <Link
                href="/solar-system"
                className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors"
            >
                Back to Solar System
            </Link>
        </nav>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto pt-16"
        >
            <h1 className="text-4xl font-bold mb-2" style={{ color }}>
                {title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">{description}</p>
            {children}
        </motion.div>
    </div>
);