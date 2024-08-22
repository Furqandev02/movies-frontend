import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./style.scss";
import apiClient from "../apiClient";
import { toast } from "react-toastify";

const theme = createTheme();

function Login() {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [rememberMe, setRememberMe] = useState(false); // State for 'Remember me' checkbox
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(""); // State for error messages

  // Handle changes in 'Remember me' checkbox
  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
    if (event.target.checked) {
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({ email, password }) // Store email and password in localStorage
      );
    } else {
      localStorage.removeItem("userCredentials"); // Remove credentials from localStorage
    }
  };

  // Load stored credentials on component mount
  useEffect(() => {
    const storedCredentials = localStorage.getItem("userCredentials");
    if (storedCredentials) {
      const { email, password } = JSON.parse(storedCredentials);
      setEmail(email);
      setPassword(password);
    }
  }, []);

  // Navigate to signup page
  const handleOpenSignup = () => {
    window.location.href = "/signup";
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true
    setError(""); // Clear any existing errors
    try {
      const response = await apiClient.post("/users/login", {
        email,
        password,
      });
      toast.success("Login Successfully"); // Display success toast message
      localStorage.setItem("accessToken", response?.data?.token); // Store token in localStorage
      setLoading(false); // Set loading state to false
      window.location.href = "/movies"; // Redirect to movies page
    } catch (err) {
      toast.error("Login failed. Please check your credentials."); // Display error toast message
    } finally {
      setLoading(false); // Ensure loading state is reset
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
            Login
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
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
            />
            <FormControlLabel
              sx={{
                padding: "0px",
                margin: "0px",
              }}
              className="checkbox-wrap"
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="primary-btn"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            <Typography sx={{ marginTop: "20px", color: "#fff" }}>
              Not a member?{" "}
              <span
                onClick={handleOpenSignup}
                style={{
                  cursor: "pointer",
                  color: "#2bd17e",
                  textDecoration: "underline",
                }}
              >
                Signup
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Login;
