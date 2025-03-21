import React from 'react';
import '../app.css';

interface LoginButtonProps {
    className?: string;
}

const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <button
            className={`loginbutton text-lg ${className || ''}`}
            style={{
                zIndex: 10,
                borderRadius: '5px',
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onClick={handleLoginClick}
        >
            Login
        </button>
    );
};

export default LoginButton;
