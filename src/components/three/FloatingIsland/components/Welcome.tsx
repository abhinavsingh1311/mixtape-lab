import { Text } from '@react-three/drei';

export const WelcomeText: React.FC = () => (
    <Text
        position={[0, 10, 0]}
        rotation={[0, Math.PI / -7, 0]}
        fontSize={0.6}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        renderOrder={2}
        font="/Starjedi.ttf"
    >
        Welcome!
    </Text>
);
