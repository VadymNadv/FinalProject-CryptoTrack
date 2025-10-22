const DetailRow = ({ label, value }: { label: string, value: string | undefined | null }) => (
    <div className="flex justify-between items-center border-b border-border pb-2">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className={`font-medium text-text text-sm ${!value || value === 'N/A' || value.includes('∞') ? 'text-text-secondary' : ''}`}>
            {value || 'N/A'}
        </span>
    </div>
);
export default DetailRow;