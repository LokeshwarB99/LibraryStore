"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = ({ userId }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`);
        setNewUsername(response.data.name);
        setNewPassword(response.data.password);
        setConfirmPassword(response.data.password);
        setUserDataLoaded(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleUpdateChanges = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      if (!newUsername || !newPassword) {
        return;
      }
      const response = await axios.put(`/api/updateUser/${userId}`, {
        name: newUsername,
        password: newPassword,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error("Error updating user:", error);
      setErrorMessage("Failed to update user details. Please try again later.");
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const response = await axios.delete(`/api/deleteUser/${userId}`);
        setSuccessMessage(response.data.message);
      } catch (error) {
        console.error("Error deleting user:", error);
        setErrorMessage(
          "Failed to delete user account. Please try again later."
        );
      }
    }
  };

  const handleBackToLibrary = () => {
    window.location.href=`/library/user/${userId}`
  }

  if (!userDataLoaded) {
    return <>Loading</>
  }

  return (
    <>
      <article className="mb-0 pb-0">
        <span role="button" className="secondary" onClick={handleBackToLibrary}>
          back to library
        </span>
      </article>
      <article className="flex justify-around mt-0 pt-0">
        {userDataLoaded && (
          <form action="" className="w-3/5">
            {successMessage && (
              <div className="text-green-600">{successMessage}</div>
            )}
            {errorMessage && <div className="text-red-600">{errorMessage}</div>}

            <div className="text-2xl font-semibold text-center">
              Username Details
            </div>
            <br />
            <span>Change Username</span>
            <input
              type="text"
              placeholder="New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <br />
            <br />
            <br />
            <div className="text-2xl font-semibold text-center">
              Password Details
            </div>
            <br />
            <div>Change Password</div>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span>Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <br />
            <div className="flex justify-between">
              <span role="button" onClick={handleUpdateChanges}>
                Update Changes
              </span>
              <span
                style={{ background: "red", border: "red" }}
                role="button"
                onClick={handleDeleteAccount}
              >
                Delete Account
              </span>
            </div>
          </form>
        )}
      </article>
    </>
  );
};

export default Profile;
