import { Html } from '@react-three/drei';

export const LoadingScreen = () => {
    return (
        <Html center>
            <div className="text-white text-center">
                <div className="text-2xl mb-4">Loading Portal!</div>
                <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-full animate-pulse" />
                </div>
            </div>
        </Html>
    );
};