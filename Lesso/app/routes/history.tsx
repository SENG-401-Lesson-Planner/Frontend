import React, { useEffect, useState } from 'react';
import LessonPlanHistory from '../components/lesson-plan-history';
import Logo from '~/components/logo';
import PromptButton from '~/components/prompt-button';
import LogoutButton from '~/components/logout-button';

export default function History() {
  const [username, setUsername] = useState<string | null>(null);

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
    window.location.href = '/';
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Logo />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingRight: '10px' }}>
          {username ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="text-white" style={{ fontSize: "1.5rem" }}>{username}</span>
              </div>
            </>
          ) : null}
          <PromptButton />
          {username && <LogoutButton onClick={handleLogout} />}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '60%' }}>
          <LessonPlanHistory />
        </div>
      </div>
    </div>
  );
}
