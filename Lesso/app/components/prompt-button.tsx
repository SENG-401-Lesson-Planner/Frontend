import React from 'react';

const PromptButton: React.FC = () => {

    const navigateToPlan = () => {
        window.location.href = '/plan';
    };

    return (
        <div>
            <button
                className="create-lesson-plan-button text-lg bg-white text-[#44264E] hover:bg-[#44264E] hover:text-white"
                style={{
                    zIndex: 10,
                    padding: '10px 20px', 
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'relative',
                    border: 'none',
                    width: '200px', 
                    height: '50px', 
                    
                }}
                onClick={navigateToPlan}
            >
                Create Another
            </button>
        </div>
    );
};

export default PromptButton;