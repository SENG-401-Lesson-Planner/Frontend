import React, { useEffect, useState } from "react";
import PromptForm from "~/components/prompt-form";
import Logo from "~/components/logo";
import LoginButton from "~/components/login-button";
import LogoutButton from "~/components/logout-button";
import HistoryButton from "~/components/history-button";

const PlanPage: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [logoutMessage, setLogoutMessage] = useState<string | null>(null);
  const [responsePrinted, setResponsePrinted] = useState<boolean>(false);

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
    setTimeout(() => setLogoutMessage(null), 3000);
  };

  const handleCreateAnother = () => {
    window.location.reload();
  };

  const handleResponsePrinted = () => {
    setResponsePrinted(true);
  };

  useEffect(() => {
    document.title = "Plan Now!";
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
        {username ? (
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <span className="text-white text-lg sm:text-xl md:text-2xl font-semibold sm:mb-2 md:mb-0">
              {username}
            </span>
            <div className="flex items-center gap-2 sm:gap-3">
              <HistoryButton className="responsive-button" />
              <LogoutButton
                onClick={handleLogout}
                className="responsive-button hover:text-white"
              />
            </div>
          </div>
        ) : (
          <LoginButton className="responsive-button login-button" />
        )}
      </div>
      <div className="absolute top-0 left-0 m-4">
        <Logo className="w-25 h-25 sm:w-30 sm:h-30 md:w-35 md:h-35" />
      </div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-lg">
          <PromptForm onResponsePrinted={handleResponsePrinted} />
        </div>
      </div>

      {/* Create Another Button */}
      {responsePrinted && (
        <div
          className="flex justify-center mt-4"
          style={{
            position: "absolute",
            bottom: "20px",
            width: "100%",
          }}
        >
          <button
            onClick={handleCreateAnother}
            className="responsive-button"
            style={{
              backgroundColor: "white",
              color: "#44264E",
              borderRadius: "5px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              border: "none",
              textAlign: "center",
            }}
          >
            Create Another
          </button>
        </div>
      )}

      <style>{`
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
        }
        @media (max-width: 480px) {
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
        }
        @media (min-width: 768px) {
          .login-button {
            min-width: 150px;
            height: 55px;
            font-size: 18px;
            padding: 12px 24px;
          }
        }
        @media (min-width: 1024px) {
          .login-button {
            min-width: 160px;
            height: 60px;
            font-size: 20px;
            padding: 15px 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default PlanPage;
