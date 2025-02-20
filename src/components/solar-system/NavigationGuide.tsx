export const NavigationGuide = () => {
    return (
        <div className="fixed bottom-0 right-4 z-50 bg-black/50 p-4 rounded-lg text-white">
            <h2 className="text-xl mb-2">Navigation Guide</h2>
            <ul className="space-y-1">
                <li>• Click planets to zoom in/out</li>
                <li>• Drag to rotate view</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Hover over planets for info</li>
            </ul>
        </div>
    );
};
