// src/components/ui/AlienClock.tsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

// Convert decimal to base-12 (dozenal)
const toDozenal = (num: number): string => {
    const digits = '0123456789↊↋';
    let result = '';
    num = Math.floor(num);

    do {
        result = digits[num % 12] + result;
        num = Math.floor(num / 12);
    } while (num > 0);

    return result;
};

// Custom time format for alien representation
const getAlienTime = () => {
    const now = new Date();
    const cycles = {
        stellar: Math.floor((now.getFullYear() - 2000) / 12),
        orbital: now.getMonth(),
        rotation: now.getHours(),
        segment: now.getMinutes(),
        pulse: now.getSeconds()
    };

    return {
        ...cycles,
        dozenal: {
            rotation: toDozenal(cycles.rotation),
            segment: toDozenal(cycles.segment),
            pulse: toDozenal(cycles.pulse)
        }
    };
};

interface GlyphProps {
    value: string;
    pulse?: boolean;
}

const Glyph: React.FC<GlyphProps> = ({ value, pulse }) => (
    <motion.div
        className="relative w-8 h-12 flex items-center justify-center"
        animate={pulse ? {
            opacity: [1, 0.5, 1],
            scale: [1, 1.1, 1]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
    >
        <div className="absolute inset-0 bg-blue-500/20 rounded" />
        <span className="text-2xl font-alien text-blue-300">
            {value}
        </span>
    </motion.div>
);

const OrbitalIndicator: React.FC<{ value: number }> = ({ value }) => {
    const segments = 12;
    const radius = 20;

    return (
        <div className="relative w-12 h-12">
            <svg viewBox="-24 -24 48 48">
                {Array.from({ length: segments }).map((_, i) => {
                    const angle = (i * 2 * Math.PI) / segments;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={1.5}
                            fill={i === value ? '#60A5FA' : '#1E3A8A'}
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export const AlienClock: React.FC = () => {
    const [time, setTime] = useState(getAlienTime());
    const frameRef = useRef<number>();

    useEffect(() => {
        const updateTime = () => {
            setTime(getAlienTime());
            frameRef.current = requestAnimationFrame(updateTime);
        };

        frameRef.current = requestAnimationFrame(updateTime);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-4 left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-4 z-50"
        >
            <div className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-xs text-blue-400 uppercase tracking-wider mb-1">
                        Stellar Cycle
                    </span>
                    <Glyph value={toDozenal(time.stellar)} />
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-xs text-blue-400 uppercase tracking-wider mb-1">
                        Orbital Phase
                    </span>
                    <OrbitalIndicator value={time.orbital} />
                </div>

                <div className="flex gap-1">
                    <Glyph value={time.dozenal.rotation} />
                    <span className="text-blue-500 self-center">:</span>
                    <Glyph value={time.dozenal.segment} />
                    <span className="text-blue-500 self-center">:</span>
                    <Glyph value={time.dozenal.pulse} pulse />
                </div>
            </div>
        </motion.div>
    );
};