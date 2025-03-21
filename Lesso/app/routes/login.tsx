import React, { useState, useEffect } from 'react';
import Logo from '../components/logo'; 

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        document.title = 'Login Page';
    }, []);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://api.lesso.help/account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include', 
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Login failed: ${errorText}`);
            }
    
            
            const accessToken = await response.text(); // Read the response as plain text
    
            console.log('Login successful. Access token:', accessToken);
    
            
            localStorage.setItem('accessToken', accessToken);
    
            
            setErrorMessage(''); // Clear any previous error messages
            setSuccessMessage('You have successfully logged in!'); // Set success message
            
            setTimeout(() => {
                window.location.href = '/';
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error during login:', error);
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred.');
            }
        }
    };
    
    

    return (
        <div className="login-page flex items-center justify-center min-h-screen">
            <div className="absolute top-0 w-full flex justify-center sm:left-0 sm:w-auto sm:justify-start m-4">
                <Logo className="w-40 h-40 sm:w-40 sm:h-40 md:w-50 md:h-50" /> 
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
                {successMessage && <p className="mt-4 text-center text-green-500">{successMessage}</p>}
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