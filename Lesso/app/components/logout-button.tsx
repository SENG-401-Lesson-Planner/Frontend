import React from 'react';

const LogoutButton: React.FC = () => {
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Logout
        </button>
    );
};

export default LogoutButton;