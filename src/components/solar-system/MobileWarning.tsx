export const MobileWarning = () => {
    return (
        <div className="sm:hidden fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="text-white text-center">
                <h2 className="text-2xl mb-4">⚠️ Desktop Recommended</h2>
                <p>
                    This experience is optimized for desktop viewing.
                    For the best experience, please visit on a larger screen.
                </p>
            </div>
        </div>
    );
};