// src/store/authReducer.js
const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_REQUEST':
            return { ...state, loading: true, error: null };
        case 'AUTH_SUCCESS':
            return { ...state, token: action.payload.token, user: action.payload.user, loading: false };
        case 'AUTH_FAILURE':
            return { ...state, error: action.payload, loading: false };
        case 'LOGOUT':
            return { ...state, token: null, user: null };
        default:
            return state;
    }
};

export default authReducer;
