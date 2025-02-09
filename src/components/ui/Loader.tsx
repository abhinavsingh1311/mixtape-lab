// components/ui/Loader.tsx
import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="loading-bar">
                <div style={{ width: `${progress}%` }} />
                <p>{Math.round(progress)}% loaded</p>
            </div>
        </Html>
    );
}