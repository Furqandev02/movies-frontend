import React, { useState, useEffect } from "react";
import Drop from "../assets/images/drop.svg";
import "./style.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, Button, Typography } from "@mui/material";

// Component for editing an existing movie
const EditMovie = () => {
  // State variables to manage form inputs and image preview
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Get movie ID from URL parameters
  const { movieId } = useParams();
  const navigate = useNavigate();

  // Fetch movie details for editing when component mounts or movieId changes
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/movies/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
            },
          }
        );
        const movie = response.data;
        setTitle(movie?.title);
        setPublishingYear(movie?.publishing_date);
        setDescription(movie?.description);
        setImagePreview(`http://localhost:8000/${movie.image}`); // Set image preview URL
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Error fetching movie details.");
      }
    };

    fetchMovie();
  }, [movieId]);

  // Handle image file upload and set preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file); // Save the file object to `image`
        setImagePreview(reader.result); // Save the base64 string to `imagePreview` for preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Basic validation to check if all fields are filled out
    if (!title || !publishingYear || !description) {
      toast.error("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishing_date", publishingYear);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // Include image if provided
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/movies/${movieId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
          },
        }
      );

      if (response.status === 200) {
        toast.success("Movie updated successfully!"); // Show success message
        navigate("/movies"); // Navigate to the movies page
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      toast.error("There was an error updating the movie. Please try again."); // Show error message
    }
  };

  return (
    <Box className="movie-main create-movie" sx={{ padding: "10rem 0rem" }}>
      <Box className="movie-wrap">
        <Box className="movie-header">
          <Typography component="h2" variant="h5">
            Edit Information
          </Typography>
        </Box>
        <Box className="movie-body">
          <Box
            className="form-wrap"
            sx={{
              display: "flex !important",
              justifyContent: "flex-start",
              alignItems: "center",
              // Apply these styles on screens 991px and below
              "@media (max-width: 991px)": {
                flexDirection: "column",
                gap: "30px",
                justifyContent: "center",
                alignItems: "center",
              },
            }}
          >
            <Box className="img-wrap" sx={{ cursor: "pointer" }}>
              {imagePreview ? (
                // Display image preview if an image is selected
                <img
                  style={{
                    width: "473px",
                    height: "504px",
                    objectFit: "cover",
                  }}
                  src={imagePreview}
                  alt="Uploaded"
                />
              ) : (
                <Box className="uploader">
                  <label htmlFor="imageUpload">
                    <Box className="uploader-data" sx={{ cursor: "pointer" }}>
                      <img src={Drop} alt="Upload" />
                      <span> Upload an image here</span>
                    </Box>
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    onChange={handleImageUpload}
                    style={{ display: "none" }} // Hide the file input
                  />
                </Box>
              )}
            </Box>
            <Box className="data-wrap">
              <Box className="input-wrap">
                <input
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} // Update title state
                />
                <input
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} // Update description state
                />
                <input
                  className="year-field"
                  placeholder="Publishing Year"
                  value={publishingYear}
                  onChange={(e) => setPublishingYear(e.target.value)} // Update publishingYear state
                />
              </Box>
              <Box className="btn-wrap">
                <Button
                  className="secondary-btn"
                  onClick={() => navigate("/movies")} // Navigate to movies page on cancel
                >
                  Cancel
                </Button>
                <Button className="primary-btn" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditMovie;
