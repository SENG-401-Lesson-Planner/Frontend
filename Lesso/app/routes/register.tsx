import React, { useState, useEffect } from "react";
import Logo from "../components/logo";

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    document.title = "Register Page";
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setErrorMessage("");

    try {
      const response = await fetch("https://api.lesso.help/account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.text();
        setErrorMessage(error);
        return;
      }

      const accessToken = await response.text();
      setSuccessMessage("Registration successful! Redirecting to login...");

      localStorage.setItem("accessToken", accessToken);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("An error occurred during registration");
    }
  };

  return (
    <div className="register-page flex items-center justify-center min-h-screen">
      <div className="absolute top-0 left-0 m-4">
        <Logo className="w-40 h-40 sm:w-40 sm:h-40 md:w-45 md:h-45" />
      </div>
      <div
        className="p-8 rounded shadow-md w-full max-w-md"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <h1 className="text-2xl text-white font-bold mb-6">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#44264E] focus:border-[#44264E] sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              Password:
            </label>
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
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#44264E] focus:border-[#44264E] sm:text-sm"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-white text-[#44264E] py-2 px-4 rounded-md hover:bg-[#44264E] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#44264E]"
          >
            Register
          </button>
        </form>
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
