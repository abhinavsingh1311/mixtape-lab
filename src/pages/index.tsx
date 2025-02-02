import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import LabScene from '../components/three/LabScene';

export default function Home() {
    return (
        <div className="h-screen">
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} color="#4f46e5" />
                <OrbitControls />
                <LabScene />
                <Html wrapperClass="overlay">
                    <h1 className="text-cyan-400 font-bold text-4xl">ABHINAV SINGH</h1>
                    <p className="text-white">Full Stack Developer</p>
                </Html>
            </Canvas>
        </div>
    );
}