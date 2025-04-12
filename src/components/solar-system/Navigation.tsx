import Link from 'next/link';
import { CameraMode } from '@/components/three/SolarSystem/types';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
    cameraMode: CameraMode;
    setCameraMode: (mode: CameraMode) => void;
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
    isMobile: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
    cameraMode,
    setCameraMode,
    isMuted,
    setIsMuted,
    isMobile
}) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Desktop navigation
    if (!isMobile) {
        return (
            <div className="fixed top-4 right-4 z-50 flex gap-4">
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={() => setIsMuted(!isMuted)}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
                <button
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    onClick={() => setCameraMode(cameraMode === 'free' ? 'locked' : 'free')}
                >
                    {cameraMode === 'free' ? '🔒 Lock Camera' : '🔓 Free Camera'}
                </button>
                <Link
                    href="/"
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                >
                    🏠 Home
                </Link>
            </div>
        );
    }

    // Mobile navigation
    // In Navigation.tsx - Mobile navigation section
    return (
        <>
            <button
                className="fixed top-4 right-4 z-50 p-3 bg-gray-800 rounded-full text-white"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {menuOpen && (
                <div className="fixed inset-0 bg-black/80 z-40 flex flex-col items-center justify-center gap-4 p-4">
                    <button
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 w-full max-w-xs"
                        onClick={() => setIsMuted(!isMuted)}
                    >
                        {isMuted ? 'Unmute Sound 🔊' : 'Mute Sound 🔇'}
                    </button>
                    <button
                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 w-full max-w-xs"
                        onClick={() => setCameraMode(cameraMode === 'free' ? 'locked' : 'free')}
                    >
                        {cameraMode === 'free' ? 'Lock Camera' : 'Free Camera'}
                    </button>
                    {/* Add more mobile navigation buttons as needed */}
                    <button
                        className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 w-full max-w-xs"
                        onClick={() => setMenuOpen(false)}
                    >
                        Close Menu
                    </button>
                </div>
            )}
        </>
    );

};
