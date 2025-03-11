import React from 'react';
import logo from '../assets/logo.png';

const Logo: React.FC = () => {
    return (
        <div>
            <img src={logo} alt="Logo" width={100} height={100} />
        </div>
    );
};

export default Logo;