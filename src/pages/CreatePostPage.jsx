import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../actions/postActions";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const CreatePostPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newPostText, setNewPostText] = useState("");

    const handleCreatePost = (e) => {
        e.preventDefault();
        if (newPostText.trim()) {
            dispatch(createPost({ text: newPostText }));
            setNewPostText("");
            navigate("/posts"); 
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Create New Post</h2>
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
};

export default CreatePostPage;
