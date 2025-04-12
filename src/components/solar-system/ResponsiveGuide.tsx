// src/components/solar-system/ResponsiveGuide.tsx
import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

interface ResponsiveGuideProps {
    isMobile: boolean;
}

export const ResponsiveGuide: React.FC<ResponsiveGuideProps> = ({ isMobile }) => {
    const [showGuide, setShowGuide] = useState(!isMobile); // Auto-show on desktop, hidden on mobile

    if (isMobile && !showGuide) {
        // Mobile collapsed state - show just the help button
        return (
            <button
                className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800 rounded-full text-white shadow-lg"
                onClick={() => setShowGuide(true)}
            >
                <HelpCircle size={24} />
            </button>
        );
    }

    return (
        <div className={`fixed ${isMobile ? 'bottom-16 right-4 w-48' : 'bottom-4 right-4'} z-50 bg-black/70 backdrop-blur-sm p-4 rounded-lg text-white shadow-lg`}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Navigation Guide</h2>
                {isMobile && (
                    <button
                        className="text-gray-400 hover:text-white"
                        onClick={() => setShowGuide(false)}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>
            <ul className="space-y-1 text-sm">
                <li>• {isMobile ? 'Tap' : 'Click'} planets to visit</li>
                <li>• {isMobile ? 'Drag' : 'Drag'} to rotate view</li>
                <li>• {isMobile ? 'Pinch' : 'Scroll'} to zoom in/out</li>
                <li>• {isMobile ? 'Tap and hold' : 'Hover'} for info</li>
            </ul>
        </div>
    );
};