import React, { useState } from 'react';
import Logo from '../components/logo'; 

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5173/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // If login is successful, get the access token from the response
            const data = await response.json();
            const accessToken = data.access_token;

            console.log('Login successful. Access token:', accessToken);

            // Save the access token to localStorage
            localStorage.setItem('accessToken', accessToken);

            // Redirect the user to a protected page or dashboard
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('An error occurred during login');
        }
    };

    return (
        <div className="login-page flex items-center justify-center min-h-screen">
            <div className="absolute top-0 left-0 m-4">
                <Logo /> 
            </div>
            <div className="p-8 rounded shadow-md w-full max-w-md" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <h1 className="text-2xl text-white font-bold mb-6">Login</h1>
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
                    <div className="mb-6">
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
                    <button type="submit" className="w-full bg-white text-[#44264E] py-2 px-4 rounded-md hover:bg-[#44264E] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#44264E]">
                        Login
                    </button>
                </form>
                {errorMessage && <p className="mt-4 text-center text-red-500">{errorMessage}</p>}
                <div className="mt-4 text-center">
                    <a href="/register" className="text-sm text-white hover:underline">
                        Don't have an account? Register Here
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;