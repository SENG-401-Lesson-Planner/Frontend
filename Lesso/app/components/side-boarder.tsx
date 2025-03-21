import React from 'react';
import Logo from "./logo";

const SideBoarder: React.FC = () => {
    const handleGetStarted = () => {
        window.location.href = '/plan';
    };

    return (
        <div className="fixed left-0 top-0 h-full w-full sm:w-1/3 flex flex-col items-center p-4 sm:p-6 shadow-xl text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="flex flex-col sm:flex-row items-center mt-4">
                <h1 className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold sm:mr-4">Lesso</h1>
                <Logo className="w-32 h-32 sm:w-36 sm:h-36 md:h-35 md:w-35 lg:w-50 lg:h-50" />
            </div>
            <p className="mt-2 text-base sm:text-lg md:text-2xl lg:text-5xl text-center">Smarter & Faster Planning with AI-Powered Prompts.</p>
            <button 
                onClick={handleGetStarted} 
                className="mt-6 sm:mt-10 px-6 py-3 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-white text-[#44264E] font-semibold text-lg sm:text-xl md:text-2xl rounded-lg shadow-md hover:bg-gray-200"
            >
                Get Started
            </button>
            <style>{`
                @media (max-width: 640px) {
                    div {
                        background-color: transparent !important;
                    }
                }
                @media (max-width: 768px) {
                    h1 {
                        font-size: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default SideBoarder;