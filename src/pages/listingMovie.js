import { Box, Typography, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import Add from "../assets/images/add.svg";
import Logout from "../assets/images/logout.svg";
import "./style.scss";
import UsePagination from "../components/pagination";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const ListingMovie = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [movies, setMovies] = useState([]); // State to store movies
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0); // State for total pages

  // Function to fetch movies from the API
  const fetchMovies = async (currentPage) => {
    try {
      const response = await fetch(
        `http://localhost:8000/movies?page=${currentPage}&limit=8`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Set authorization header with token
          },
        }
      );
      const data = await response.json();
      setMovies(data?.movies); // Update movies state
      setTotalPages(data?.totalPages); // Update totalPages state
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  // Fetch movies when the page changes
  useEffect(() => {
    fetchMovies(page);
  }, [page]);

  // Handler for pagination changes
  const handlePageChange = (event, value) => {
    setPage(value); // Update current page
  };

  // Navigate to the create movie page
  const handleAddNewMovie = () => {
    navigate("/create-movie");
  };

  // Navigate to the edit movie page
  const handleEditMovie = (movieId) => {
    navigate(`/edit-movie/${movieId}`);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Remove token from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  // Format publishing year from date string
  const formatYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <Box className="movie-main listing-movie">
      <Box className="movie-wrap">
        <Box className="movie-header">
          <Typography component="h2" variant="h5">
            My movies{" "}
            <img
              style={{ cursor: "pointer" }}
              onClick={handleAddNewMovie}
              src={Add}
              alt="Add Movie"
            />
          </Typography>
          <Typography
            component="h3"
            variant="h5"
            onClick={handleLogout}
            sx={{ cursor: "pointer" }}
          >
            <span>Logout</span> <img src={Logout} alt="Logout" />
          </Typography>
        </Box>
        <Box className="movie-body">
          <Box className="movie-listing">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <Box key={movie._id} className="movie-data">
                  <img
                    src={`http://localhost:8000/${movie.image}`}
                    alt={movie.title}
                    className="movie-image"
                  />
                  <Typography component="h4" variant="h5">
                    {movie?.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography component="h5" variant="h5">
                      {formatYear(movie?.publishing_date)}
                    </Typography>
                    <IconButton onClick={() => handleEditMovie(movie._id)}>
                      <EditIcon sx={{ color: "white", fontSize: "14px" }} />
                    </IconButton>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>No movies found</Typography>
            )}
          </Box>
          <Box className="movie-pagination">
            <UsePagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingMovie;
