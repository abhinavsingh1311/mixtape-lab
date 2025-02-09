
export default function DesktopOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg max-w-2xl w-full">
                <h2 className="text-2xl font-bold mb-4">Desktop View</h2>
                <p>This is a simulated desktop environment.</p>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}