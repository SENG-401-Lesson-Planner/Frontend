import { useEffect, useState } from 'react';
import SideBoarder from "~/components/side-boarder";
import LoginButton from "~/components/login-button";
import LogoutButton from "~/components/logout-button"; 
import HistoryButton from '~/components/history-button';
import Figure1 from '../assets/backgroundfigurines1.png';
import Figure2 from '../assets/backgroundfigurines2.png';

export default function Home() {
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
        {/* Conditionally render the login button or the username with logout */}
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
      <div>
        <SideBoarder />
      </div>
      <div>
        <img src={Figure2} alt="Background Figurine 2" className="responsive-img img1" />
        <img src={Figure1} alt="Background Figurine 1" className="responsive-img img2" />
      </div>
      <style>{`
        .responsive-img {
          position: absolute;
          width: 30%;
          height: auto;
        }
        .img1 {
          top: 35%;
          left: 55%;
          transform: translate(-50%, -50%);
        }
        .img2 {
          top: 65%;
          left: 75%;
          transform: translate(-50%, -50%);
        }
        @media (max-width: 640px) {
          .responsive-img {
            width: 50%;
          }
          .img1 {
            top: 50%;
            left: 35%;
          }
          .img2 {
            top: 75%;
            left: 65%;
          }
        }
        @media (max-width: 480px) {
          .responsive-img {
            width: 70%;
          }
          .img1 {
            top: 50%;
          }
          .img2 {
            top: 75%;
          }
        }
      `}</style>
    </div>
  );
}
