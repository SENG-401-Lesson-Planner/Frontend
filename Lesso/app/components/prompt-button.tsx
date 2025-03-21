import React from "react";

interface PromptButtonProps {
  className?: string;
}

const PromptButton: React.FC<PromptButtonProps> = ({ className }) => {
  const navigateToPlan = () => {
    window.location.href = "/plan";
  };

  return (
    <div>
      <button
        className={`create-lesson-plan-button text-lg rounded bg-white text-[#44264E] hover:bg-[#44264E] hover:text-white ${className}`}
        onClick={navigateToPlan}
      >
        Create Another
      </button>
    </div>
  );
};

export default PromptButton;
