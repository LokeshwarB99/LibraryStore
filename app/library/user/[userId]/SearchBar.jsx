"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const Searchbar = ({ userId }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [excludeSubjects, setExcludeSubjects] = useState("");
  const [currUserData, setCurrUserData] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Fetch data once on component mount
  useEffect(() => {
    fetchDatas();
  }, []);

  // Fetch user data and bookmarks when userId changes
  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchBookmarks();
      setUserDataLoaded(true);
    }
  }, [userId]);

  // Fetch books data
  const fetchDatas = async () => {
    try {
      const response = await axios.get("/api/fetchBooks");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      setCurrUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch bookmarks data
  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`/api/viewBookmarks/${userId}`);
      setBookmarks(response.data.bookmarks);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  // Handle bookmark addition
  const handleBookmark = async (id) => {
    try {
      await axios.put(`/api/addBookmark/${userId}/${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  // Handle bookmark removal
  const handleRemoveBookmark = async (id) => {
    try {
      await axios.delete(`/api/deleteBookmark/${userId}/${id}`);
      fetchBookmarks();
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  // Handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Handle search category change
  const handleSearchCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  // Handle sort order change
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Handle excluded subjects change
  const handleExcludeSubjectsChange = (event) => {
    setExcludeSubjects(event.target.value);
  };

  // Filter and sort data based on search term, category, and sort order
  const filteredData = data
    .filter((item) => {
      if (searchTerm === "") return true;
      const searchTermLower = searchTerm.toLowerCase();
      if (
        searchCategory === "name" &&
        item.name.toLowerCase().includes(searchTermLower)
      ) {
        return true;
      }
      if (
        searchCategory === "author" &&
        item.author.toLowerCase().includes(searchTermLower)
      ) {
        return true;
      }
      if (
        searchCategory === "subject" &&
        item.subject.toLowerCase().includes(searchTermLower)
      ) {
        return true;
      }
      return false;
    })
    .filter((item) => {
      if (!excludeSubjects || excludeSubjects.trim() === "") return true;
      const subjectsToExclude = excludeSubjects
        .toLowerCase()
        .split(",")
        .map((subject) => subject.trim().toLowerCase());
      if (!item.subject) return true;
      const itemSubjects = item.subject
        .split(",")
        .map((subject) => subject.trim().toLowerCase());
      return itemSubjects.every(
        (itemSubject) => !subjectsToExclude.includes(itemSubject)
      );
    })
    .sort((a, b) => {
      const dateA = new Date(a.published);
      const dateB = new Date(b.published);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  // Paginate data
  const indexOfLastBook = currentPage * 10;
  const indexOfFirstBook = indexOfLastBook - 10;
  const currentBooks = filteredData.slice(indexOfFirstBook, indexOfLastBook);

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / 10); i++) {
    pageNumbers.push(i);
  }

  // Handle page click
  const handleClick = (number) => {
    setCurrentPage(number);
  };

  const handleLogout = () => {
    window.location.href = '/login'
  }

  const handleSettings = () => {
    window.location.href = `/profile/${userId}`;
  };

  if (!userDataLoaded) {
    return <>Loading</>;
  }
  if (currUserData === null) {
    return<>User doesnot exist</>
  }


  return (
    <article className="mt-0 pt-3">
      <div className="mb-5 flex justify-between items-center">
        <span className="text-xl font-semibold b-2">
          Welcome back {currUserData.name} 😊
        </span>
        <span>
          <span role="button" className="contrast" onClick={handleLogout}>
            Logout
          </span>
          <span className="pr-1"></span>
          <span role="button" className="outline contrast" onClick={handleSettings}>
            Settings
          </span>
        </span>
      </div>
      <div>
        <div>Search by</div>
        <select value={searchCategory} onChange={handleSearchCategoryChange}>
          <option value="name">Name</option>
          <option value="author">Author</option>
          <option value="subject">Subject</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>Date sort by</div>
        <select value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div>Exclude Subjects (comma-separated)</div>
      <input
        type="text"
        placeholder="Enter subjects to exclude..."
        value={excludeSubjects}
        onChange={handleExcludeSubjectsChange}
      />
      <span>Total Books found: {filteredData.length}</span>
      <>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Published</th>
              <th>Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.author}</td>
                <td>{item.subject}</td>
                <td>{item.published}</td>
                <td>
                  <button onClick={() => handleBookmark(item.id)}>
                    Bookmark
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {pageNumbers.map((number) => (
            <span key={number}>
              <span
                role="button"
                style={{
                  margin: "3px",
                  background: currentPage === number ? "green" : "",
                  border: currentPage === number ? "green" : "",
                }}
                onClick={() => handleClick(number)}
              >
                {number}
              </span>
            </span>
          ))}
        </div>
      </>
      <>
        <h2>Your Bookmarks</h2>
        <ul>
          {bookmarks.length === 0 && "No bookmarks found..."}
          {bookmarks &&
            bookmarks.map((item) => (
              <li
                key={item.id}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  {item.name} by {item.author} - {item.subject}
                </span>
                <span
                  style={{ background: "red", border: "red" }}
                  role="button"
                  onClick={() => handleRemoveBookmark(item.id)}
                >
                  Remove
                </span>
              </li>
            ))}
        </ul>
      </>
    </article>
  );
};

export default Searchbar;
