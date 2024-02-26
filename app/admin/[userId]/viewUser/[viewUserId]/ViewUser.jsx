"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewUser = ({ viewUserId, userId }) => {
  const [userData, setUserData] = useState(null);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/user/${viewUserId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [viewUserId]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`/viewBookmarks/${viewUserId}`);
        setBookmarks(response.data.bookmarks);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, [viewUserId]);

  const handleBackToLibrary = () => {
    window.history.back()
  };

  const handleDeleteAccount = async () => {
    if (window.confirm(`Are you sure you want to ${userData.name}&apos;s account?`)) {
      try {
        const response = await axios.delete(`/api/deleteUser/${viewUserId}`);
        console.log(response.data.message);
        handleBackToLibrary()
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  if (loading || !userData) {
    return <>Loading...</>;
  }

  return (
    <>
      <article className="mb-0 pb-0 mt-0">
      </article>
      <article className="flex justify-around mt-0 pt-0">
        <form action="" className="w-3/5">
          <div className="text-2xl font-semibold text-center">
            Username Details
          </div>
          <br />
          <span>Username:</span>
          <input
            type="text"
            placeholder="Username"
            value={userData.name}
            readOnly
          />
          <br />
          <br />
          <div className="text-2xl font-semibold text-center">
            Password Details
          </div>
          <br />
          <span>Password:</span>
          <input
            type="text"
            placeholder="Password"
            value={userData.password}
            readOnly
          />
          <br />
          <br />
        </form>
      </article>
      <article>
        <button role="button" className="contrast" onClick={handleBackToLibrary}>
        Back to Library
      </button>
      </article>
      
      <article className="flex justify-around mt-0">
        <div className="w-3/5">
          <h2 className="text-2xl font-semibold text-center">
            Bookmarks made by {userData.name}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Subject</th>
                <th>Published</th>
              </tr>
            </thead>
            <tbody>
              {bookmarks.map((bookmark) => (
                <tr key={bookmark.id}>
                  <td>{bookmark.id}</td>
                  <td>{bookmark.name}</td>
                  <td>{bookmark.author}</td>
                  <td>{bookmark.subject}</td>
                  <td>{bookmark.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <article className="flex justify-around mt-0">
        <button
          onClick={handleDeleteAccount}
          className="bg-red-500 inline border-red-500 text-white font-bold py-2 px-4 rounded"
        >
          Delete Account
        </button>
      </article>
    </>
  );
};

export default ViewUser;
