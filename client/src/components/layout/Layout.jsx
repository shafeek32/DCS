import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, GitBranch } from 'lucide-react';

const Header = () => (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-lg text-white">
                        <Sparkles size={24} />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                        DecisionCompanion
                    </span>
                </Link>
                <nav className="flex space-x-4">
                    <Link to="/create" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        New Decision
                    </Link>
                </nav>
            </div>
        </div>
    </header>
);

const Footer = () => (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} Decision Companion. Rationality made simple.
            </p>
        </div>
    </footer>
);

export default function Layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Header />
            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
}
