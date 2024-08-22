import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import Drop from "../assets/images/drop.svg";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component for creating a new movie
const CreateMovie = () => {
  // State variables to manage form inputs and image preview
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Handler for image file upload
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

  // Handler for form submission
  const handleSubmit = async () => {
    // Validate that all fields are filled out
    if (!title || !publishingYear || !description || !image) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    // Create a FormData object to send the form data including the image
    const formData = new FormData();
    formData.append("title", title);
    formData.append("publishing_date", publishingYear);
    formData.append("description", description);
    formData.append("image", image);

    try {
      // Send POST request to create a new movie
      const response = await axios.post(
        "http://localhost:8000/movies",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Include the access token for authorization
          },
        }
      );

      // Show success message and navigate to the movies page if creation is successful
      if (response.status === 201) {
        toast.success("Movie created successfully!");
        navigate("/movies");
      }
    } catch (error) {
      // Handle any errors that occur during submission
      console.error("Error creating movie:", error);
      toast.error("There was an error creating the movie. Please try again.");
    }
  };

  return (
    <Box className="movie-main create-movie" sx={{ padding: "10rem 0rem" }}>
      <Box className="movie-wrap">
        <Box className="movie-header">
          <Typography component="h2" variant="h5">
            Create a new movie
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
              "@media (max-width: 1100px)": {
                flexDirection: "column",
                gap: "30px !important",
                justifyContent: "center !important",
                alignItems: "center !important",
              },
            }}
          >
            {/* Image upload section */}
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
            {/* Form fields */}
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
              {/* Action buttons */}
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

export default CreateMovie;
