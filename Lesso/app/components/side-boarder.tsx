import React from "react";
import Logo from "./logo";

const SideBoarder: React.FC = () => {
  const handleGetStarted = () => {
    window.location.href = "/plan";
  };

  return (
    <div
      className="fixed left-0 top-0 h-full w-full sm:w-1/3 flex flex-col items-center p-4 sm:p-6 shadow-xl text-white"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
    >
      <div className="w-full h-full flex flex-col items-center p-12 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start sm:mt-4 mt-0 sm:pl-4">
          {/* Lesso Text */}
          <h1 className="hidden sm:block text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mb-4 sm:mr-4">
            Lesso
          </h1>

          {/* Logo */}
          <Logo className="w-32 h-32 sm:w-36 sm:h-36 md:h-35 md:w-35 lg:w-50 lg:h-50 sm:mb-0 mb-6 sm:absolute sm:top-4 sm:left-4 sm:static" />
        </div>
        <p className="mt-20 text-base sm:text-lg md:text-2xl lg:text-3xl text-center">
          Smarter & Faster Planning with AI-Powered Prompts.
        </p>
        <button
          onClick={handleGetStarted}
          className="mt-6 sm:mt-10 px-6 py-3 sm:px-10 sm:py-5 md:px-12 md:py-6 bg-white text-[#44264E] font-semibold text-base sm:text-xl md:text-2xl rounded-lg shadow-md hover:bg-gray-200"
        >
          Get Started
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          div {
            background-color: transparent !important;
          }
          .sm\\:absolute {
            position: absolute;
            left: 10px;
            top: 10px;
            transform: none;
          }
        }
        @media (min-width: 641px) {
          .sm\\:absolute {
            position: static !important;
          }
        }
        @media (max-width: 768px) {
          h1 {
            font-size: 2rem !important;
          }
          .sm\\:absolute {
            position: absolute;
            left: 10px;
            top: 10px;
            transform: none;
          }
          .sm\\:mb-6 {
            margin-bottom: 1.5rem; /* Added space below the logo */
          }
        }
      `}</style>
    </div>
  );
};

export default SideBoarder;
