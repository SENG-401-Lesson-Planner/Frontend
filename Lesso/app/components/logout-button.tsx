import React from "react";

interface LogoutButtonProps {
  onClick?: () => void;
  className?: string; // Added className prop
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick, className }) => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    if (onClick) {
      onClick();
    } else {
      window.location.href = "/";
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`px-6 py-3 bg-red-500 text-white text-lg rounded hover:bg-red-600 ${
        className || ""
      }`}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
