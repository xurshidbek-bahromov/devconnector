import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import { notification } from 'antd'; 

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(formData, navigate));
    };

    if (error) {
        notification.error({
            message: 'Login Error',
            description: error.msg || 'Kirishda xatolik yuz berdi.',
        });
    }

    return (
        <div className="login-container">
            <h2>Kirish</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Parol:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <button className='submit-button    ' type="submit" disabled={loading}>
                    {loading ? 'Yuklanmoqda...' : 'Kirish'}
                </button>
            </form>
            <p>
                Hisobingiz yo'qmi? <Link to="/register">Ro'yxatdan o'tish</Link>
            </p>
        </div>
    );
};

export default Login;

