export const MobileWarning = ({ onContinueAnyway }: { onContinueAnyway: () => void }) => {
    return (
        <div className="sm:hidden fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="text-white text-center max-w-xs">
                <h2 className="text-2xl mb-4">⚠️ Desktop Recommended</h2>
                <p className="mb-6">
                    This experience is optimized for desktop viewing.
                    Mobile performance may vary based on your device.
                </p>
                <button
                    onClick={onContinueAnyway}
                    className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Continue Anyway
                </button>
            </div>
        </div>
    );
};
