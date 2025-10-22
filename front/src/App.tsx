
import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ThemeManager from "@/components/common/ThemeManager.tsx";
import LoadingSpinner from "@/components/loadingSpiner/LoadingSpinner.tsx";
import Footer from "@/components/common/Footer.tsx";
import AppRoutes from "@/config/AppRouters.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <ThemeManager />
                <div className="flex flex-col min-h-screen font-sans">
                    <div className="relative z-10 flex flex-col flex-grow">
                        <div className="flex-grow">
                            <React.Suspense
                                fallback={
                                    <div className="flex justify-center items-center h-screen w-full">
                                        <LoadingSpinner />
                                    </div>
                                }
                            >
                                <AppRoutes />
                            </React.Suspense>
                        </div>
                        <Footer />
                    </div>
                </div>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;