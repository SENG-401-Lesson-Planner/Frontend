import { useEffect, useState } from "react";
import SideBoarder from "~/components/side-boarder";
import LoginButton from "~/components/login-button";
import LogoutButton from "~/components/logout-button";
import HistoryButton from "~/components/history-button";
import Figure1 from "../assets/backgroundfigurines1.png";
import Figure2 from "../assets/backgroundfigurines2.png";

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await fetch(
            "https://api.lesso.help/account/isloggedin",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authentication: token,
              },
            }
          );

          if (!response.ok) {
            throw new Error("User is not logged in");
          }

          const loggedInUsername = await response.text();
          setUsername(loggedInUsername);
        } catch (error) {
          console.error("Error checking login status:", error);
        }
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUsername(null);
    setLogoutMessage("You have successfully logged out.");
    setTimeout(() => setLogoutMessage(null), 3000); // Clear message after 3 seconds
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div>
      {logoutMessage && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "30%",
            backgroundColor: "red",
            color: "white",
            textAlign: "center",
            padding: "10px",
          }}
        >
          {logoutMessage}
        </div>
      )}

      <div
        className="absolute top-0 right-0 p-4 flex flex-col items-end gap-2 sm:gap-3"
        style={{ zIndex: 10 }}
      >
        {/* Conditionally render the login button or the username with logout */}
        {username ? (
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="text-white text-lg sm:text-xl md:text-2xl font-semibold sm:mb-2 md:mb-0">
              {username}
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <HistoryButton className="responsive-button" />
              <LogoutButton
                onClick={handleLogout}
                className="responsive-button"
              />
            </div>
          </div>
        ) : (
          <LoginButton className="responsive-button login-button" />
        )}
      </div>

      <div>
        <SideBoarder />
      </div>
      <div>
        <img
          src={Figure2}
          alt="Background Figurine 2"
          className="responsive-img img1"
        />
        <img
          src={Figure1}
          alt="Background Figurine 1"
          className="responsive-img img2"
        />
      </div>

      <style>{`
        .responsive-img {
          position: fixed;
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
        .responsive-button {
          width: auto;
          min-width: 90px;
          height: 40px;
          padding: 5px 10px;
          font-size: 14px;
        }
        .login-button {
          transition: all 0.3s ease;
        }
        @media (max-width: 640px) {
          .responsive-img {
            width: 40%;
          }
          .img1 {
            top: 55%;
            left: 35%;
          }
          .img2 {
            top: 80%;
            left: 65%;
          }
          .responsive-button {
            min-width: 80px;
            height: 35px;
            font-size: 12px;
          }
          .login-button {
            min-width: 120px;
            height: 50px;
            font-size: 16px;
            padding: 10px 20px;
          }
          .absolute {
            top: 20px; 
          }
        }
        @media (max-width: 480px) {
          .responsive-img {
            width: 45%;
          }
          .img1 {
            top: 55%;
          }
          .img2 {
            top: 80%;
          }
          .responsive-button {
            min-width: 70px;
            height: 30px;
            font-size: 14px;
          }
          .login-button {
            min-width: 140px;
            height: 45px;
            font-size: 18px;
            padding: 12px 24px;
          }
          .absolute {
            top: 25px; 
          }
        }
        @media (min-width: 768px) {
          /* Make the Login Button bigger on medium screens */
          .login-button {
            min-width: 150px;
            height: 55px;
            font-size: 18px;
            padding: 12px 24px;
          }
        }
        @media (min-width: 1024px) {
          /* Make the Login Button even bigger on large screens */
          .login-button {
            min-width: 160px;
            height: 60px;
            font-size: 20px;
            padding: 15px 30px;
          }
        }
        @media (max-height: 780px) {
          .img1 {
            top: 55%; 
          }
          .img2 {
            top: 75%; 
          }
        }
      `}</style>
    </div>
  );
}
