"use client"
import React from "react";

const LandingPage = () => {
  const handleLogin = () => {
    window.location.href = "/login";
  };

  const handleSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <article className="flex flex-col items-center justify-center h-screen mt-0 pt-0">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Library Store</h1>
      <p className="text-lg mb-6">
        Explore a world of books at your fingertips!
      </p>
      <div className="space-x-4">
        <span
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </span>
        <span
          
          onClick={handleSignup}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Signup
        </span>
      </div>
    </article>
  );
};

export default LandingPage;
