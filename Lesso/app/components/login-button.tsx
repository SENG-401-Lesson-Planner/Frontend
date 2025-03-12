import React from 'react';
import '../app.css';

const LoginButton: React.FC = () => {
    const handleLoginClick = () => {
        window.location.href = '/login';
    };

    return (
        <div>
            <button className="loginbutton" style={{ fontFamily: 'Orelega One, cursive' }} onClick={handleLoginClick}>
                Login
            </button>
        </div>
    );
};

export default LoginButton;