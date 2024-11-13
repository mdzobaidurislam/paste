export const Spinner = ({ size }: { size: 'sm' | 'lg' }) => (
    <div className={`animate-spin ${size === 'sm' ? 'w-5 h-5' : 'w-8 h-8'} border-4 border-t-transparent border-blue-500 rounded-full`} />
);
