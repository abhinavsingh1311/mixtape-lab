import { AdaptiveFog } from "./AdaptiveFog";
import BackgroundParticles from "./BackgroundParticles";
import InfiniteGrid from "./InfiniteGrid";

export const ClosedSpaceScene = () => {
    return (
        <>
            <AdaptiveFog />
            <InfiniteGrid />
            <BackgroundParticles />
        </>
    );
};

// You can also export as default if you prefer
export default ClosedSpaceScene;