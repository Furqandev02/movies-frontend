import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./style.scss";
import { useNavigate } from "react-router-dom";

// Create a MUI theme (could be customized if needed)
const theme = createTheme();

// Component to display when the movie list is empty
const EmptyList = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle navigation to the create movie page
  const handleAddMovie = () => {
    navigate("/create-movie"); // Navigate to the create movie page
  };

  return (
    <ThemeProvider theme={theme}> {/* Apply MUI theme to the component */}
      <Box
        className="movie-main signup"
        sx={{
          marginTop: 8, // Add margin to the top
          display: "flex", // Use flexbox for layout
          flexDirection: "column", // Stack items vertically
          alignItems: "center", // Center items horizontally
        }}
      >
        <Box>
          <Typography component="h1" variant="h5" sx={{ marginBottom: "40px" }}>
            Your movie list is empty
          </Typography>
          <Button
            fullWidth // Make button take full width of its container
            variant="contained" // Use contained button style
            sx={{ mt: 3, mb: 2 }} // Add margin top and bottom
            className="primary-btn" // Custom class for additional styling
            onClick={handleAddMovie} // Attach click handler
          >
            Add a new movie
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EmptyList;
