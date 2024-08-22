import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./style.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme();

function SignUp() {
  // State variables for email, password, error, and success status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Navigate to the login page
  const handleOpenLogin = () => {
    window.location.href = "/login";
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Payload for signup API request
    const payload = {
      email,
      password,
    };

    try {
      // Make POST request to signup endpoint
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Successful signup
        toast.success("Signup Successfully!");

        const data = await response.json();
        console.log("Signup successful:", data);
        setSuccess(true);
        setError(null);
        window.location.href = "/login"; 
      } else {
        // Handle errors from server
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        toast.error(errorData.message || "Signup failed. Please try again.");
        setError(errorData.message || "Signup failed. Please try again.");
        setSuccess(false);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error during signup:", error);
      setError("An unexpected error occurred. Please try again.");
      setSuccess(false);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="movie-main signup"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "350px" }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <input
              required
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
            <input
              required
              id="password"
              name="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              style={{ marginBottom: "50px" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ marginTop: "30px", mb: 2 }}
              className="primary-btn"
            >
              Sign Up
            </Button>
            <Typography sx={{ marginTop: "20px", color: "#fff" }}>
              Already a member?{" "}
              <span
                onClick={handleOpenLogin}
                style={{
                  cursor: "pointer",
                  color: "#2bd17e",
                  textDecoration: "underline",
                }}
              >
                Login
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default SignUp;
