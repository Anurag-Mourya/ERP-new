export const handleKeyPress = (ref, callback) => {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            callback();
        }
    };

    ref.current?.addEventListener('keydown', handleKeyDown);

    return () => {
        ref.current?.removeEventListener('keydown', handleKeyDown);
    };
};