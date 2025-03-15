// src/actions/profileActions.js
import axios from 'axios';

// Barcha profillarni olish
export const fetchProfiles = () => async dispatch => {
    dispatch({ type: 'FETCH_PROFILES_REQUEST' });
    try {
        const res = await axios.get('https://nt-devconnector.onrender.com/api/profile');
        dispatch({ type: 'FETCH_PROFILES_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'FETCH_PROFILES_FAILURE', payload: error.response.data });
    }
};

// Bitta profildagi ma'lumotlarni olish (masalan, user id bo'yicha)
export const fetchProfileById = (id) => async dispatch => {
    dispatch({ type: 'FETCH_PROFILE_REQUEST' });
    try {
        const res = await axios.get(`https://nt-devconnector.onrender.com/api/profile/user/${id}`);
        dispatch({ type: 'FETCH_PROFILE_SUCCESS', payload: res.data });
    } catch (error) {
        dispatch({ type: 'FETCH_PROFILE_FAILURE', payload: error.response.data });
    }
};

export const createProfile = (profileData, navigate) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
                // Tokenni HTTP header orqali yuboramiz:
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        };

        const res = await axios.post(
            "https://nt-devconnector.onrender.com/api/profile",
            profileData,
            config
        );

        dispatch({ type: "CREATE_PROFILE_SUCCESS", payload: res.data });
        // Profil muvaffaqiyatli yaratilgach, dashboard yoki boshqa sahifaga o'tkazish mumkin
        navigate("/dashboard");
    } catch (error) {
        console.error("Profile creation error:", error.response.data);
        dispatch({
            type: "CREATE_PROFILE_FAILURE",
            payload: error.response.data,
        });
    }   
} 
