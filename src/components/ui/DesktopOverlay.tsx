import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface DesktopOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const DesktopOverlay: React.FC<DesktopOverlayProps> = ({ isOpen, onClose }) => {
    const [activeWindow, setActiveWindow] = useState<string>('about');

    if (!isOpen) return null;

    const apps = [
        { id: 'about', title: 'About Me', icon: '👤' },
        { id: 'projects', title: 'Projects', icon: '💻' },
        { id: 'skills', title: 'Skills', icon: '🛠️' },
        { id: 'contact', title: 'Contact', icon: '📧' }
    ] as const;

    const AppWindow: React.FC<{ content: string }> = ({ content }) => {
        switch (content) {
            case 'about':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">About Me</h2>
                        <p>Full-stack developer passionate about creating immersive web experiences.</p>
                    </div>
                );
            case 'projects':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Projects</h2>
                        <ul className="space-y-2">
                            <li>• 3D Interactive Portfolio</li>
                            <li>• [Your Other Projects]</li>
                        </ul>
                    </div>
                );
            case 'skills':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Skills</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="font-bold">Frontend</h3>
                                <p>React, Three.js, Next.js</p>
                            </div>
                            <div>
                                <h3 className="font-bold">Backend</h3>
                                <p>Node.js, Python, SQL</p>
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Contact</h2>
                        <div className="space-y-2">
                            <p>Email: your.email@example.com</p>
                            <p>GitHub: @yourusername</p>
                            <p>LinkedIn: /in/yourprofile</p>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div className="bg-gray-900 w-full max-w-4xl h-3/4 rounded-lg shadow-2xl overflow-hidden text-white">
                {/* Desktop Bar */}
                <div className="bg-gray-800 p-2 flex items-center justify-between">
                    <div className="flex space-x-2">
                        {apps.map((app) => (
                            <button
                                key={app.id}
                                onClick={() => setActiveWindow(app.id)}
                                className={`px-3 py-1 rounded ${activeWindow === app.id ? 'bg-blue-500' : 'hover:bg-gray-700'
                                    }`}
                            >
                                <span className="mr-2">{app.icon}</span>
                                {app.title}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        ✕
                    </button>
                </div>

                {/* Content Area */}
                <div className="h-full overflow-y-auto p-4">
                    <AppWindow content={activeWindow} />
                </div>
            </div>
        </motion.div>
    );
};

export default DesktopOverlay;