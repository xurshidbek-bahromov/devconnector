const initialState = {
    posts: [],       
    post: null,    
    loading: true,
    error: {},
};

export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_POSTS":
            return { ...state, posts: action.payload, loading: false };
        case "CREATE_POST":
            return { ...state, posts: [action.payload, ...state.posts], loading: false };
        case "DELETE_POST":
            return { ...state, posts: state.posts.filter(post => post._id !== action.payload), loading: false };
        case "UPDATE_POST":
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                ),
                post: state.post && state.post._id === action.payload._id ? action.payload : state.post,
                loading: false,
            };
        case "POST_ERROR":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}
