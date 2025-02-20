import Link from 'next/link';
import { CameraMode } from '@/components/three/SolarSystem/types';

interface NavigationProps {
    cameraMode: CameraMode;
    setCameraMode: (mode: CameraMode) => void;
    isMuted: boolean;
    setIsMuted: (muted: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
                                                          cameraMode,
                                                          setCameraMode,
                                                          isMuted,
                                                          setIsMuted
                                                      }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex gap-4">
            <button
                className="fixed top-20 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
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
};
