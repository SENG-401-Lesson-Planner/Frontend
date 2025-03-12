import React from 'react';
import '../app.css';

const LoginButton: React.FC = () => {
    return (
        <div>
            <button className="loginbutton" style={{ fontFamily: 'Orelega One, cursive' }}>
                Login
            </button>
        </div>
    );
};

export default LoginButton;