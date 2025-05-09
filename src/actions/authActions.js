import axios from 'axios';

export const loginUser = (credentials, navigate) => async (dispatch) => {
  dispatch({ type: 'AUTH_REQUEST' });
  try {
    const res = await axios.post(
      'https://nt-devconnector.onrender.com/api/auth', 
      credentials,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const { token, user } = res.data;
    localStorage.setItem('token', token); 
    dispatch({ type: 'AUTH_SUCCESS', payload: { token, user } });
    navigate('/dashboard'); 
  } catch (error) {
    console.error("Login error:", error.response?.data);
    dispatch({ type: 'AUTH_FAILURE', payload: error.response?.data });
  }
};

export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_REQUEST" });
  try {
    const res = await axios.post(
      "https://nt-devconnector.onrender.com/api/users",
      {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        status: userData.status,
        company: userData.company,
        skills: userData.skills,
        bio: userData.bio,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const { token, user } = res.data; 
    localStorage.setItem("token", token); 
    dispatch({ type: "AUTH_SUCCESS", payload: { token, user } });
    
    navigate("/dashboard"); 
    return res.data;
  } catch (error) {
    console.error("Registration error detailed:", error.response?.data);
    dispatch({ type: "AUTH_FAILURE", payload: error.response?.data });
    throw error;
  }
};



export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: 'LOGOUT' });
};
