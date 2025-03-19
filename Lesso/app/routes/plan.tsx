import React, { useEffect, useState } from 'react';
import PromptForm from '~/components/prompt-form';
import Logo from '~/components/logo';
import LoginButton from '~/components/login-button';
import LogoutButton from '~/components/logout-button';
import HistoryButton from '~/components/history-button';

const PlanPage: React.FC = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await fetch('https://api.lesso.help/account/isloggedin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': token,
                        },
                    });

                    if (!response.ok) {
                        throw new Error('User is not logged in');
                    }

                    const loggedInUsername = await response.text();
                    setUsername(loggedInUsername);
                } catch (error) {
                    console.error('Error checking login status:', error);
                }
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setUsername(null);
        setLogoutMessage('You have successfully logged out.');
        setTimeout(() => setLogoutMessage(null), 3000); // Clear message after 3 seconds
    };

    return (
        <div>
            {logoutMessage && (
                <div style={{ 
                    position: "absolute", 
                    top: 0, 
                    left: "50%", 
                    transform: "translateX(-50%)", 
                    width: "30%", 
                    backgroundColor: "red", 
                    color: "white", 
                    textAlign: "center", 
                    padding: "10px" 
                }}>
                    {logoutMessage}
                </div>
            )}
            <div style={{ position: "absolute", top: 10, right: 10 }}>
                {username ? (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="text-white" style={{ fontSize: "1.5rem" }}>{username}</span>
                        <HistoryButton />
                        <LogoutButton onClick={handleLogout} />
                    </div>
                ) : (
                    <LoginButton />
                )}
            </div>
            <div className="absolute top-0 left-0 m-4">
                <Logo />
            </div>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full max-w-lg">
                    <PromptForm />
                </div>
            </div>
        </div>
    );
};

export default PlanPage;