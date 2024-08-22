import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Movies from "./pages/listingMovie";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyList from "./pages/emptyList";
import CreateMovie from "./pages/createMovie";
import EditMovie from "./pages/editMovie";

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/movies"
            element={
              <PrivateRoute>
                <Movies />
              </PrivateRoute>
            }
          />
          <Route
            path="/empty-list"
            element={
              <PrivateRoute>
                <EmptyList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-movie"
            element={
              <PrivateRoute>
                <CreateMovie />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-movie/:movieId"
            element={
              <PrivateRoute>
                <EditMovie />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
