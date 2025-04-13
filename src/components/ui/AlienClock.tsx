import { useEffect, useState } from 'react';
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

    return result || '0'; // Return '0' for zero value
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

export const AlienClock: React.FC = () => {
    const [time, setTime] = useState(getAlienTime());
    const [showLabels, setShowLabels] = useState(false);

    useEffect(() => {
        // Update time every second
        const interval = setInterval(() => {
            setTime(getAlienTime());
        }, 1000);

        // Clean up
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-16 sm:bottom-auto sm:top-4 left-0 right-0 sm:right-auto z-50 flex items-center justify-center sm:justify-start pointer-events-auto">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-black/70 backdrop-blur-md rounded-lg px-3 py-2 mx-auto sm:ml-4 sm:mr-0 shadow-lg"
                onClick={() => setShowLabels(!showLabels)}
            >
                <div
                    className="flex flex-row items-center gap-3 text-xs sm:text-sm overflow-x-auto"
                    style={{
                        fontFamily: 'Starjedi, monospace',
                        scrollbarWidth: 'none'
                    }}
                >
                    <TimeUnit
                        label="ST"
                        fullName="STELLAR CYCLE"
                        value={time.stellar.toString()}
                        showFullName={showLabels}
                    />
                    <TimeUnit
                        label="OR"
                        fullName="ORBITAL PHASE"
                        value={(time.orbital + 1).toString()}
                        showFullName={showLabels}
                    />
                    <TimeUnit
                        label="RT"
                        fullName="ROTATION"
                        value={time.dozenal.rotation}
                        showFullName={showLabels}
                    />
                    <TimeUnit
                        label="SG"
                        fullName="SEGMENT"
                        value={time.dozenal.segment}
                        showFullName={showLabels}
                    />
                    <TimeUnit
                        label="PL"
                        fullName="PULSE"
                        value={time.dozenal.pulse}
                        pulse={true}
                        showFullName={showLabels}
                    />
                </div>
            </motion.div>
        </div>
    );
};

interface TimeUnitProps {
    label: string;
    fullName: string;
    value: string;
    pulse?: boolean;
    showFullName?: boolean;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ label, fullName, value, pulse = false, showFullName = false }) => (
    <div className="flex flex-col items-center whitespace-nowrap">
        {showFullName && (
            <span className="text-gray-400 text-[0.6rem] mb-1">{fullName}</span>
        )}
        <div className="flex items-center">
            <span className="text-gray-400">{label}:</span>
            {pulse ? (
                <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="ml-1 text-neon-blue"
                    style={{ textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' }}
                >
                    {value}
                </motion.span>
            ) : (
                <span
                    className="ml-1 text-neon-blue"
                    style={{ textShadow: '0 0 5px #00ffff, 0 0 10px #00ffff' }}
                >
                    {value}
                </span>
            )}
        </div>
    </div>
);