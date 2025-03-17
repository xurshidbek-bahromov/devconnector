import React from "react";
import { useSelector } from "react-redux";
import { FaUserAlt, FaSignInAlt, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  // Redux holatidan tokenni olish. (Agar Redux’da auth reducer orqali token saqlanayotgan bo‘lsa.)
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="home-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <span className="logo_itself">DevConnector</span>
          </Link>
        </div>
        <div className="nav">
          <Link to="/profiles">
            <button>
              <FaUserAlt /> Dasturchilar
            </button>
          </Link>
          {token ? (
            // Agar token mavjud bo'lsa – foydalanuvchi login qilgan
            <>
              <Link to="/posts">
                <button>
                  <FaClipboardList /> Posts
                </button>
              </Link>
              <Link to="/dashboard">
                <button>
                  <FaSignInAlt /> Dashboard
                </button>
              </Link>
            </>
          ) : (
            // Token mavjud bo'lmasa – mehmon (foydalanuvchi login qilmagan)
            <>
              <Link to="/register">
                <button>
                  <FaClipboardList /> Ro'yxatdan o'tish
                </button>
              </Link>
              <Link to="/login">
                <button>
                  <FaSignInAlt /> Kirish
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <h1 className="main-title">DevConnector Clone</h1>
      <p className="welcome-message">
        Dasturchilar va texnologiyalar dunyosiga xush kelibsiz!
      </p>
    </div>
  );
};

export default Home;
