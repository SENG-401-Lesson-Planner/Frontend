import React from 'react';
import logo from '../assets/logo.png';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {

    const handleClick = () => {
        window.location.href = '/';
    };

    return (
        <div className={className} onClick={handleClick}>
            <img src={logo} alt="Logo" width={150} height={150} />
        </div>
    );
};

export default Logo;