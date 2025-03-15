import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="dashboard-container">

            <h2 className="dashboard-title">Dashboard</h2>

            {user ? (
                <p className="greeting-message">Salom, {user.name}! Dashboard sahifasiga xush kelibsiz.</p>

            ) : (
                <p>Ma'lumot topilmadi.</p>
            )}
            <div style={{ marginTop: "1rem" }}>
                <button className="logout-button" onClick={() => dispatch(logoutUser())}>
                    <FaArrowRight /> Chiqish
                </button>

            </div>
            <div className="profiles-link-container">

                <Link className="profiles-link" to="/profiles">Dasturchilar ro'yhati</Link>

            </div>
        </div>
    );
};

export default Dashboard;
