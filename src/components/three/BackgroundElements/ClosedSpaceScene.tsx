import { AdaptiveFog } from "./AdaptiveFog";
import BackgroundParticles from "./BackgroundParticles";
import InfiniteGrid from "./InfiniteGrid";
import { useEffect, useState } from 'react';

export const ClosedSpaceScene = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768); // Common breakpoint for mobile
        };

        // Check on initial render
        checkMobile();

        // Add listener for window resize
        window.addEventListener('resize', checkMobile);

        // Clean up
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <AdaptiveFog />
            <InfiniteGrid />
            <BackgroundParticles isMobile={isMobile} />
        </>
    );
};

export default ClosedSpaceScene;
