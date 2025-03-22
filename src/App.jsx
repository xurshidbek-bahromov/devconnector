import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import Dashboard from "./pages/Dashboard";
import Profiles from "./pages/Profiles";
import ProfileDetails from "./pages/ProfileDetails";
import PrivateRoute from "./components/PrivateRoute";
import CreatePostPage from "./pages/CreatePostPage"; // Import CreatePostPage
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profiles" element={<Profiles />} />
      <Route path="/profile/:id" element={<ProfileDetails />} />
      <Route path="/create-post" element={<CreatePostPage />} />
      <Route
        path="/posts"
        element={
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
