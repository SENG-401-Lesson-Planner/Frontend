import React from 'react';
import Logo from "./logo";

const SideBoarder: React.FC = () => {
    return (
        <div className="fixed left-0 top-0 h-full w-full sm:w-1/3 flex flex-col items-center p-4 sm:p-6 shadow-xl text-white" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="flex flex-col sm:flex-row items-center mt-4">
                <h1 className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold sm:mr-4">Lesso</h1>
                <Logo className="w-24 h-24 sm:w-24 sm:h-24" />
            </div>
            <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl text-center">Smarter & Faster Scheduling with AI-Powered Prompts.</p>
            <button className="mt-6 sm:mt-10 px-4 py-2 sm:px-6 sm:py-3 bg-white text-[#44264E] font-semibold rounded-lg shadow-md hover:bg-gray-200">Get Started</button>
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