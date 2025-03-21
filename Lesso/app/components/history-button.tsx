import React from "react";

interface HistoryButtonProps {
  className?: string;
}

const HistoryButton: React.FC<HistoryButtonProps> = ({ className }) => {
  const navigateToHistory = () => {
    console.log("Navigating to /history"); // Debugging log
    window.location.href = "/history";
  };

  return (
    <div>
      <button
        className={`history-button text-lg bg-white rounded text-[#44264E] hover:bg-[#44264E] hover:text-white ${className}`}
        id="history-button"
        onClick={navigateToHistory}
        type="button"
      >
        All Lesson Plans
      </button>
    </div>
  );
};

export default HistoryButton;
