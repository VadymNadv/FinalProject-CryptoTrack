import { Link } from 'react-router-dom';
import Header from "../common/Header.tsx";

const NotFoundPage = () => {
    return (
        <div className="bg-gray-900 min-h-screen flex flex-col font-sans text-white">
            <Header />
            <main className="flex flex-grow items-center justify-center p-8">
                <div className="text-center bg-gray-800 p-12 rounded-xl shadow-2xl border border-gray-700">
                    <h1 className="text-9xl font-extrabold text-blue-500 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-white mb-8">Сторінку не знайдено</h2>
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Повернутися на головну
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default NotFoundPage;