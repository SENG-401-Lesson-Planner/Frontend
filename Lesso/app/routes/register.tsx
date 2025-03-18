import React, { useState } from 'react';
import Logo from '../components/logo'; 

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }
        setErrorMessage('');
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="register-page flex items-center justify-center min-h-screen">
            <div className="absolute top-0 left-0 m-4">
                <Logo /> 
            </div>
            <div className="p-8 rounded shadow-md w-full max-w-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <h1 className="text-2xl text-white font-bold mb-6">Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-white">Username:</label>
                        <input
                            type="username"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#44264E] focus:border-[#44264E] sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-white">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#44264E] focus:border-[#44264E] sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#44264E] focus:border-[#44264E] sm:text-sm"
                        />
                        {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
                    </div>
                    <button type="submit" className="w-full bg-white text-[#44264E] py-2 px-4 rounded-md hover:bg-[#44264E] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#44264E]">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;