import React from 'react';
import '../app.css';

const LoginButton: React.FC = () => {
    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <div>
            <button
                className="loginbutton"
                style={{
                    fontFamily: 'Orelega One, cursive',
                    zIndex: 10,
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    position: 'relative',
                    fontSize: '16px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none'
                }}
                onClick={handleLoginClick}
            >
                Login
            </button>
        </div>
    );
};

export default LoginButton;
