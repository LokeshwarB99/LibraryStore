'use client'
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
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
      const response = await axios.put("/api/addUser", {
        name: username,
        password: password,
      });
      alert(response.data.message);
      const {id} = response.data.user
      window.location.href = `/library/user/${id}`
      // Optionally, you can redirect the user to the login page after successful signup
    } catch (error) {
      console.error("Error creating user:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to create user. Please try again later.");
      }
    }
  };

  return (
    <article className="flex justify-around mt-0">
      <div>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="text-red-600">{errorMessage}</div>}
          <div className="text-center text-3xl pb-3">Signup</div>
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
          <input type="submit" value="Login" />
        </form>
        <div>
          Already have an account? <a href="login">Login here.</a>
        </div>
      </div>
    </article>
  );
};

export default Signup;
