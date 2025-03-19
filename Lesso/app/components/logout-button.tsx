import React from 'react';

interface LogoutButtonProps {
    onClick?: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        if (onClick) {
            onClick();
        } else {
            window.location.href = '/';
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 text-white text-lg rounded hover:bg-red-600"
            style={{
                width: '200px', 
                height: '50px'  
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;