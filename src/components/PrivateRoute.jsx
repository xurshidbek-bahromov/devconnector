// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const auth = useSelector((state) => state.auth);
  
  // Agar foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, login sahifasiga yo'naltiramiz
  if (!auth || !auth.token) {
    return <Navigate to='/login' />;
  }
  if (!token) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default PrivateRoute;
