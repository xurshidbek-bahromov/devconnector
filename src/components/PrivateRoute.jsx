// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // auth bo'limidan token yoki isAuthenticated ni oling
  const auth = useSelector((state) => state.auth);
  
  // Agar foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, login sahifasiga yo'naltiramiz
  if (!auth || !auth.token) {
    return <Navigate to='/login' />;
  }
  
  return children;
};

export default PrivateRoute;
