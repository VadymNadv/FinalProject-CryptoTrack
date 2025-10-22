import Header from '@/components/common/Header';
import FilterForm from '@/components/forms/FilterForm';
import CryptoList from '@/components/crypto/CryptoList';
import PaginationControls from '@/components/common/PaginationControls';
import AnimatedBackground from '@/components/common/AnimatedBackground';
import MarketOverview from '@/screens/main/components/MarketOverview.tsx';
import GettingStarted from '@/screens/main/components/GettingStarted.tsx';

export default function HomePage() {
    return (
        <div className="relative min-h-screen font-sans">
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <main className="max-w-7xl mx-auto p-4 md:p-6">
                    <h1
                        className="text-4xl md:text-5xl font-extrabold text-center my-8 text-transparent bg-clip-text"
                        style={{ backgroundImage: 'linear-gradient(to right, var(--color-primary-accent), #FFC700)' }}
                    >
                        Cryptocurrency
                    </h1>
                    <div className="mt-12">
                        <GettingStarted />
                    </div>

                    <MarketOverview />
                    <FilterForm />
                    <div className="mt-8">
                        <CryptoList />
                        <PaginationControls />
                    </div>
                </main>
            </div>
        </div>
    );
}