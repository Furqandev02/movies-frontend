import React, { useState } from "react";
import { IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const ImageUpload = () => {
  // State to store the selected image URL
  const [image, setImage] = useState(null);

  // Handler for image file selection
  const handleImageChange = (event) => {
    // Get the first file from the input
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file and update the state
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      {/* Hidden file input for image upload */}
      <input
        accept="image/*" // Accepts image files only
        style={{ display: "none" }} // Hides the input
        id="icon-button-file" // ID for the input, used in label
        type="file" // File input type
        onChange={handleImageChange} // Event handler for file selection
      />
      {/* Label for the file input, using an IconButton to trigger file selection */}
      <label htmlFor="icon-button-file">
        <IconButton color="primary" component="span">
          <PhotoCameraIcon /> {/* Icon for the upload button */}
        </IconButton>
      </label>
      {/* Conditionally render the selected image if one is chosen */}
      {image && (
        <img
          src={image} // Source of the selected image
          alt="Selected" // Alt text for the image
          style={{ marginTop: "16px", maxWidth: "100%", height: "auto" }} // Styling for the image
        />
      )}
    </div>
  );
};

export default ImageUpload;
