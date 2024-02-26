// AdminSignup.js
'use client'
import React, { useState } from "react";
import axios from "axios";

const AdminSignup = ({userId}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/addAdmin", {
        name: username,
        password: password,
      });
      alert(response.data.message);
      // Redirect to another page after successful signup
      window.history.back();  // Change the URL as needed
    } catch (error) {
      console.error("Error creating admin user:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to create admin user. Please try again later.");
      }
    }
  };

  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };

  return (
    <article className="flex justify-around mt-0">
      <div>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <div className="text-center text-3xl pb-3">Admin Signup</div>
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

          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Create Admin Account</button>
        </form>
        <div>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>
    </article>
  );
};

export default AdminSignup;
