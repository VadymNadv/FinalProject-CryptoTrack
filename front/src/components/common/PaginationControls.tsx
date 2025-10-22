
import { useCryptoFilterStore } from "@/store/useCryptoFilterStore";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = () => {
    const { page, setPage } = useCryptoFilterStore();

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const buttonStyles = "px-4 py-2 flex items-center gap-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    const activeStyles = "bg-primary-accent text-binance-dark font-bold hover:bg-yellow-400";
    const inactiveStyles = "bg-surface text-text-secondary";

    return (
        <div className="flex justify-center items-center gap-4 my-8">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`${buttonStyles} ${page > 1 ? activeStyles : inactiveStyles}`}
            >
                <ChevronLeft size={18} />
                Назад
            </button>

            <span className="text-lg font-bold text-primary-accent px-4 py-2 rounded-lg
                         bg-surface border border-border"
            >
                {page}
            </span>

            <button
                onClick={handleNext}
                className={`${buttonStyles} ${activeStyles}`}
            >
                Вперед
                <ChevronRight size={18} />
            </button>
        </div>
    );
};

export default PaginationControls;