// pages/login/page.jsx
"use client";
import React, { useState } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        if (response.status === 401) {
          setError("Incorrect password");
        } else if (response.status === 404) {
          setError("User not found");
        } else {
          setError(data.error || "An error occurred");
        }
        return; // Stop execution if there's an error
      }

      const { id,role } = await response.json();
      // alert(role)
      if (id !== -1) {
        if (role === 'Customer') {
          window.location.href = `/library/user/${id}`;
        }
        if (role === 'Admin') {
          window.location.href = `/admin/${id}`;
        }
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    }
  };

  return (
    <article className="flex justify-around mt-0">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="text-center text-3xl pb-3">Login</div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <div className="text-red-500">{error}</div>}
          <input type="submit" value="Login" />
        </form>
        <div>
          Don't have an account? <a href="/signup">Signup here.</a>
        </div>
      </div>
    </article>
  );
};

export default Login;
