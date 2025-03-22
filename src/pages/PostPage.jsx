import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
  likePost,
  unlikePost,
} from "../actions/postActions";
import { FaThumbsUp, FaThumbsDown, FaComments, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const PostPage = () => {
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);

  const [newPostText, setNewPostText] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPostText, setEditedPostText] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (newPostText.trim()) {
      dispatch(createPost({ text: newPostText }));
      setNewPostText("");
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId));
  };

  const handleStartEdit = (postId, currentText) => {
    setEditingPostId(postId);
    setEditedPostText(currentText);
  };

  const handleUpdatePost = (postId) => {
    dispatch(updatePost(postId, { text: editedPostText }));
    setEditingPostId(null);
    setEditedPostText("");
  };

  const handleLikePost = (postId) => {
    dispatch(likePost(postId));
  };

  const handleUnlikePost = (postId) => {
    dispatch(unlikePost(postId));
  };

  const handleDiscussion = (postId) => {
    console.log("Discussion for post:", postId);
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error && error.msg) return <p style={{ color: "red" }}>Error: {error.msg}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Posts</h2>
      <Link to="/create-post" style={styles.createPostLink}>Create New Post</Link>

      {user && (
        <form onSubmit={handleCreatePost} style={styles.form}>
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="What do you want to post?"
            style={styles.textarea}
          />
          <button type="submit" style={styles.createButton}>
            <FaPlus style={styles.buttonIcon} /> Create Post
          </button>
        </form>
      )}

      <div style={styles.postList}>
        {posts?.map((post) => (
          <div key={post._id} style={styles.postCard}>
            {editingPostId === post._id ? (
              <>
                <textarea
                  value={editedPostText}
                  onChange={(e) => setEditedPostText(e.target.value)}
                  style={styles.textarea}
                />
                <div style={styles.buttonGroup}>
                  <button style={styles.button} onClick={() => handleUpdatePost(post._id)}>
                    Save
                  </button>
                  <button style={styles.cancelButton} onClick={() => setEditingPostId(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p style={styles.postText}>{post.text}</p>
                {post.user && (
                  <p style={styles.author}>By: {post.user.name}</p>
                )}
                <div style={styles.actionContainer}>
                  <button onClick={() => handleLikePost(post._id)} style={styles.actionButton}>
                    <FaThumbsUp style={styles.icon} /> {post.likes ? post.likes.length : 0}
                  </button>
                  <button onClick={() => handleUnlikePost(post._id)} style={styles.actionButton}>
                    <FaThumbsDown style={styles.icon} />
                  </button>
                  <button onClick={() => handleDiscussion(post._id)} style={styles.actionButton}>
                    <FaComments style={styles.icon} /> Discussion
                  </button>
                </div>
                {user && post.user && post.user._id === user._id && (
                  <div style={styles.ownerActions}>
                    <button onClick={() => handleStartEdit(post._id, post.text)} style={styles.editButton}>
                      <FaEdit style={styles.icon} /> Edit
                    </button>
                    <button onClick={() => handleDeletePost(post._id)} style={styles.deleteButton}>
                      <FaTrashAlt style={styles.icon} /> Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "1rem",
    maxWidth: "800px",
    margin: "0 auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  form: {
    marginBottom: "1.5rem",
  },
  textarea: {
    width: "100%",
    padding: "0.5rem",
    minHeight: "80px",
    resize: "vertical",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  createButton: {
    display: "flex",
    alignItems: "center",
    marginTop: "0.5rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonIcon: {
    marginRight: "0.5rem",
  },
  postList: {
    marginTop: "1rem",
  },
  postCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  postText: {
    fontSize: "1.1rem",
    marginBottom: "0.5rem",
  },
  author: {
    fontSize: "0.9rem",
    color: "#555",
    marginBottom: "0.5rem",
  },
  actionContainer: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "1rem",
    marginBottom: "0.5rem",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.3rem 0.6rem",
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  icon: {
    fontSize: "1rem",
  },
  ownerActions: {
    marginTop: "0.5rem",
    display: "flex",
    gap: "1rem",
  },
  editButton: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  deleteButton: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
  },
  buttonGroup: {
    display: "flex",
    gap: "1rem",
    marginTop: "0.5rem",
  },
  cancelButton: {
    padding: "0.3rem 0.6rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PostPage;
