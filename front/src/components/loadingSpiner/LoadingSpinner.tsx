const LoadingSpinner = () => {
    return (
        <div
            style={{ borderColor: 'var(--color-primary-accent)', borderTopColor: 'transparent' }}
            className="w-8 h-8 border-4 rounded-full animate-spin"
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Завантаження...</span>
        </div>
    );
};

export default LoadingSpinner;