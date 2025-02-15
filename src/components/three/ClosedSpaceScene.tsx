import { AdaptiveFog } from "./BackgroundElements/AdaptiveFog";
import BackgroundParticles from "./BackgroundElements/BackgroundParticles";
import InfiniteGrid from "./BackgroundElements/InfiniteGrid";

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