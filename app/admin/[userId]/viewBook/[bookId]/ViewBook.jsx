"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewBook = ({ bookId, userId }) => {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState({
    name: "",
    author: "",
    subject: "",
    published: "",
  });

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/api/getBookData/${bookId}`);
        setBookDetails(response.data);
        const { name, author, subject, published } = response.data.book;
        setUpdateData({ name, author, subject, published });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(`/api/updateBook/${bookId}`, updateData);
      console.log(response.data.message);
      // Refresh book data after updating
      fetchBookData();
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  const handleDeleteBook = async () => {
    // Ask for confirmation from the user
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    // If user confirms, proceed with deletion
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/deleteBook/${bookId}`);
        console.log(response.data.message);

        // Redirect user after successful deletion
        window.location.href = `/admin/${userId}`;
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!bookDetails) {
    return <p>Error: Unable to fetch book data.</p>;
  }

  const handleBack = () => {
    window.location.href = `/admin/${userId}`;
  };

  return (
    <>
      <article className="mt-0 pt-4">
        <span role="button" className="secondary" onClick={handleBack}>
          back to library
        </span>
        <div className="pb-2"></div>
        <div>
          <h2>Book Details</h2>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>{bookDetails.book.name}</td>
              </tr>
              <tr>
                <td>Author:</td>
                <td>{bookDetails.book.author}</td>
              </tr>
              <tr>
                <td>Subject:</td>
                <td>{bookDetails.book.subject}</td>
              </tr>
              <tr>
                <td>Published:</td>
                <td>{bookDetails.book.published}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>Users who have bookmarked this book</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {bookDetails.book.bookmarkedBy.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2>Update Book Details</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updateData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Author:
            <input
              type="text"
              name="author"
              value={updateData.author}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Subject:
            <input
              type="text"
              name="subject"
              value={updateData.subject}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Published:
            <input
              type="text"
              name="published"
              value={updateData.published}
              onChange={handleInputChange}
            />
          </label>
          <div className="flex justify-between">
            <span role="button" onClick={handleUpdateBook}>
              Update Book
            </span>
            <span
              role="button"
              onClick={handleDeleteBook}
              style={{ background: "red", border: "red" }}
            >
              Delete Book
            </span>
          </div>
        </div>
      </article>
    </>
  );
};

export default ViewBook;
