import React, { useEffect, useState } from "react";
import LessonPlanHistory from "../components/lesson-plan-history";
import Logo from "~/components/logo";
import PromptButton from "~/components/prompt-button";
import LogoutButton from "~/components/logout-button";

export default function History() {
  const [username, setUsername] = useState<string | null>(null);

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

  useEffect(() => {
    document.title = "Plan History";
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUsername(null);
    window.location.href = "/";
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <Logo className="w-25 h-25 sm:w-24 sm:h-24 md:w-32 md:h-32 flex-shrink-0" />

        {/* User Info and Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto">
          {username && (
            <span
              className="text-white sm:text-lg"
              style={{ fontSize: "1.3rem" }}
            >
              {username}
            </span>
          )}
          <div className="flex items-center gap-2 sm:gap-3">
            <PromptButton className="w-auto min-w-[110px] h-12 px-4 py-2 text-sm sm:text-lg md:text-xl" />
            {username && (
              <LogoutButton
                onClick={handleLogout}
                className="w-auto min-w-[110px] h-12 px-4 py-2 text-sm sm:text-lg md:text-xl"
              />
            )}
          </div>
        </div>
      </div>

      {/* Lesson Plan History */}
      <div className="flex justify-center mt-6">
        <div className="w-full sm:w-4/5 md:w-3/5">
          <LessonPlanHistory />
        </div>
      </div>
    </div>
  );
}
