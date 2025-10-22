// src/config/AppRoutes.tsx

import { Routes, Route } from 'react-router-dom';
import HomePage from "@/screens/main/HomePage.tsx";
import CryptoPage from "@/screens/crypto/CryptoPage.tsx";
import NotFoundPage from "@/components/notFoundPage/NotFoundPage.tsx";
import FAQPage from "@/screens/info/FAQpage.tsx";
import PortfolioPage from "@/screens/portfolio/PortfolioPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/coin/:id" element={<CryptoPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRoutes;