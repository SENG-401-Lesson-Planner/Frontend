import React from 'react';
import '../app.css';

const LoginButton: React.FC = () => {
    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <div>
            <button
                className="loginbutton text-lg"
                style={{
                    zIndex: 10,
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'relative',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    width: '200px',
                    height: '50px'
                }}
                onClick={handleLoginClick}
            >
                Login
            </button>
        </div>
    );
};

export default LoginButton;
