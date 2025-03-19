import React from 'react';

const HistoryButton: React.FC = () => {

    const navigateToHistory = () => {
        console.log('Navigating to /history'); // Debugging log
        window.location.href = '/history';
    };

    return (
        <div>
            <button
                className="history-button text-lg  bg-white text-[#44264E] hover:bg-[#44264E] hover:text-white"
                style={{
                    zIndex: 10,
                    padding: '15px 30px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'relative',
                    border: 'none',
                    width: '200px', 
                    height: '50px',

                }}
                onClick={navigateToHistory}
            >
                All Lesson Plans
            </button>
        </div>
    );
};

export default HistoryButton;