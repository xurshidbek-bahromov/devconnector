import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, likeComment, dislikeComment } from "../actions/postActions";
import { FaThumbsUp, FaThumbsDown, FaComments } from "react-icons/fa";

const CommentsSection = ({ postId }) => {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.posts);
    const [commentText, setCommentText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            dispatch(addComment(postId, { text: commentText }));
            setCommentText("");
        }
    };

    const handleLike = (commentId) => {
        dispatch(likeComment(postId, commentId));
    };

    const handleDislike = (commentId) => {
        dispatch(dislikeComment(postId, commentId));
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <h3>Sharhlar</h3>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <textarea
                    style={{ width: "100%", padding: "0.5rem" }}
                    placeholder="Sharhlaringizni qoldiring..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                />
                <button type="submit" style={{ marginTop: "0.5rem" }}>
                    Sharh qo'shish
                </button>
            </form>
            <div>
                {post && post.comments && post.comments.map((comment) => (
                    <div
                        key={comment._id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            marginBottom: "0.5rem",
                        }}
                    >
                        <p>{comment.text}</p>
                        <div
                            style={{
                                display: "flex",
                                gap: "1rem",
                                alignItems: "center",
                            }}
                        >
                            <button onClick={() => handleLike(comment._id)}>
                                <FaThumbsUp /> {comment.likes ? comment.likes.length : 0}
                            </button>
                            <button onClick={() => handleDislike(comment._id)}>
                                <FaThumbsDown /> {comment.dislikes ? comment.dislikes.length : 0}
                            </button>
                            <button>
                                <FaComments /> Javob
                            </button>
                        </div>
                        {comment.replies && comment.replies.length > 0 && (
                            <div style={{ marginLeft: "2rem", marginTop: "0.5rem" }}>
                                {comment.replies.map((reply) => (
                                    <div
                                        key={reply._id}
                                        style={{
                                            border: "1px solid #eee",
                                            padding: "0.5rem",
                                            marginBottom: "0.3rem",
                                        }}
                                    >
                                        <p>{reply.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsSection;
