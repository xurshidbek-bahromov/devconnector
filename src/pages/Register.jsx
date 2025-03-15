import React, { useState } from "react";
import { notification } from 'antd'; 

import { useDispatch } from "react-redux";
import { registerUser } from "../actions/authActions";
import { createProfile } from "../actions/profileActions";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        status: "",
        company: "",
        skills: "",
        bio: "",
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        name,
        email,
        password,
        password2,
        status,
        company,
        skills,
        bio,
    } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            notification.error({
                message: 'Registration Error',
                description: 'Parollar mos emas!',
            });
            return;
        }

        try {
            await dispatch(registerUser({ name, email, password })).catch(err => {
                notification.error({
                    message: 'Registration Error',
                    description: err.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.',
                });
            });

            const profileData = { status, company, skills, bio };
            await dispatch(createProfile(profileData, navigate));
        } catch (error) {
            console.error("Registration/Profile error: ", error);
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Ro'yxatdan o'tish</h2>

            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Ism:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Parol:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Parolni tasdiqlash:</label>
                    <input
                        type="password"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        required
                    />
                </div>

                <hr style={{ margin: "2rem 0" }} />

                <h3>Profil ma'lumotlari</h3>
                <div className="form-group">
                    <label>Status:</label>
                    <input
                        type="text"
                        name="status"
                        value={status}
                        onChange={onChange}
                        placeholder="Masalan, Developer"
                    />
                </div>
                <div className="form-group">
                    <label>Kompaniya:</label>
                    <input
                        type="text"
                        name="company"
                        value={company}
                        onChange={onChange}
                        placeholder="Kompania nomi (ixtiyoriy)"
                    />
                </div>
                <div className="form-group">
                    <label>Ko'nikmalar (skills):</label>
                    <input
                        type="text"
                        name="skills"
                        value={skills}
                        onChange={onChange}
                        placeholder="Komalar bilan ajratib yozing, masalan: HTML,CSS,JavaScript"
                    />
                </div>
                <div className="form-group">
                    <label>Bio:</label>
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={onChange}
                        placeholder="Oʻzingiz haqingizda qisqacha ma'lumot"
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">Ro'yxatdan o'tish</button>

            </form>
            <p className="login-link">
                Allaqachon hisobingiz bormi? <Link to="/login">Kirish</Link>
            </p>
        </div>
    );
};

export default Register;
