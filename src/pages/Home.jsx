import React from "react";
import { FaUserAlt, FaSignInAlt, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <span className="logo_itself">DevConnector</span>
          </Link>
        </div>
        <div className ="nav">
          <Link to="/profiles">
            <button>
              <FaUserAlt /> Dasturchilar
            </button>
          </Link>
          <Link to="/register">
            <button>
              <FaClipboardList /> Ro'yxatdan o'tish
            </button>
          </Link>
          <Link to="/login">
            <button >
            <FaSignInAlt /> Kirish 
            </button>
          </Link>
        </div>
      </div>

      <h1 className="main-title">DevConnector Clone</h1>

      <p className="welcome-message">Dasturchilar va texnologiyalar dunyosiga xush kelibsiz!</p>
    </div>
  );
};

export default Home;
