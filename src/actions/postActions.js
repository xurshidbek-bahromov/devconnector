import axios from "axios";


export const getPosts = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token mavjud emas!");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const res = await axios.get("https://nt-devconnector.onrender.com/api/posts", config);
    dispatch({ type: "GET_POSTS", payload: res.data });
  } catch (error) {
    console.error("Error fetching posts:", error.response?.data || error.message);
    dispatch({ type: "POST_ERROR", payload: error.response?.data || error.message });
  }
};


export const createPost = (postData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const res = await axios.post("https://nt-devconnector.onrender.com/api/posts", postData, config);
    dispatch({ type: "CREATE_POST", payload: res.data });
  } catch (error) {
    console.error("Error creating post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};


export const deletePost = (postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    await axios.delete(`https://nt-devconnector.onrender.com/api/posts/${postId}`, config);
    dispatch({ type: "DELETE_POST", payload: postId });
  } catch (error) {
    console.error("Error deleting post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};


export const updatePost = (postId, postData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };
    const res = await axios.put(`https://nt-devconnector.onrender.com/api/posts/${postId}`, postData, config);
    dispatch({ type: "UPDATE_POST", payload: res.data });
  } catch (error) {
    console.error("Error updating post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};


export const likePost = (postId) => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const res = await axios.put(`https://nt-devconnector.onrender.com/api/posts/like/${postId}`, {}, config);
    dispatch({ type: "UPDATE_POST", payload: res.data });
  } catch (error) {

    if (error.response && error.response.data.msg === "Post already liked") {

      const { posts } = getState().posts;
      const post = posts.find((p) => p._id === postId);
      if (post) {
        const updatedLikes = post.likes.length + 1;
  
        const updatedPost = { ...post, likes: [...post.likes, { user: "dummy" }] };
        dispatch({ type: "UPDATE_POST", payload: updatedPost });
      }
    } else {
      console.error("Error liking post:", error.response?.data);
      dispatch({ type: "POST_ERROR", payload: error.response?.data });
    }
  }
};



export const unlikePost = (postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const res = await axios.put(`https://nt-devconnector.onrender.com/api/posts/unlike/${postId}`, {}, config);
    dispatch({ type: "UPDATE_POST", payload: res.data });
  } catch (error) {
    console.error("Error unliking post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};



export const dislikePost = (postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const res = await axios.put(`https://nt-devconnector.onrender.com/api/posts/dislike/${postId}`, {}, config);
    dispatch({ type: "UPDATE_POST", payload: res.data });
  } catch (error) {
    console.error("Error disliking post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};


export const undislikePost = (postId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    const res = await axios.put(`https://nt-devconnector.onrender.com/api/posts/undislike/${postId}`, {}, config);
    dispatch({ type: "UPDATE_POST", payload: res.data });
  } catch (error) {
    console.error("Error undisliking post:", error.response?.data);
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
  }
};
