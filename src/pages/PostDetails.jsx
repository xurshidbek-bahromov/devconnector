import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../actions/postActions";       
import { addComment } from "../actions/postActions";     
import { FaPaperPlane } from "react-icons/fa";

const PostDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { post, loading, error } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.auth);

    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            dispatch(addComment(id, { text: commentText }))
                .then(() => setCommentText(""))
                .catch(err => console.error("Error adding comment:", err));
        }
    };

    if (loading) return <div className="loading-spinner"></div>;
    if (error && error.msg) return <p style={{ color: "red" }}>Error: {error.msg}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Post Details</h2>
            <div style={styles.postCard}>
                <p style={styles.postText}>{post.text}</p>
                {post.user && (
                    <p style={styles.author}>By: {post.user.name}</p>
                )}
            </div>
            <hr />
            <h3>Comments</h3>
            {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                    <div key={comment._id} style={styles.commentCard}>
                        <p>{comment.text}</p>
                        {comment.user && (
                            <p style={styles.commentAuthor}>
                                By: {comment.user.name}
                            </p>
                        )}
                    </div>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
            {user && (
                <form onSubmit={handleAddComment} style={styles.commentForm}>
                    <textarea
                        placeholder="Write your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.submitButton}>
                        <FaPaperPlane style={styles.buttonIcon} /> Post Comment
                    </button>
                </form>
            )}
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
    },
    commentCard: {
        border: "1px solid #eee",
        borderRadius: "4px",
        padding: "0.5rem",
        marginBottom: "0.5rem",
        backgroundColor: "#f9f9f9",
    },
    commentAuthor: {
        fontSize: "0.8rem",
        color: "#777",
        marginTop: "0.3rem",
    },
    commentForm: {
        marginTop: "1.5rem",
    },
    textarea: {
        width: "100%",
        padding: "0.5rem",
        minHeight: "80px",
        resize: "vertical",
        borderRadius: "4px",
        border: "1px solid #ccc",
    },
    submitButton: {
        display: "flex",
        alignItems: "center",
        marginTop: "0.5rem",
        padding: "0.5rem 1rem",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    buttonIcon: {
        marginRight: "0.5rem",
    },
};

export default PostDetails;
