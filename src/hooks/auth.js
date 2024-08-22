import { useState, useEffect } from "react";

// Custom hook for managing authentication state
export const useAuth = () => {
  // State to store the user object with the token
  const [user, setUser] = useState(null);

  // Effect to check for a token in local storage on component mount
  useEffect(() => {
    // Retrieve the access token from local storage
    const token = localStorage.getItem("accessToken");
    console.log("token1", token); // Log token for debugging

    // If a token exists, update the user state with the token
    if (token) {
      console.log("token2", token); // Log token for debugging
      setUser({ token }); // Set the user state with the token
    }
  }, []); // Empty dependency array means this effect runs once on mount

  // Return the user state to be used in components
  return { user };
};
