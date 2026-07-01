import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import api from "../../services/Api";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        if (message) setMessage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(loginStart());
        setLoading(true);

        try {
            const response = await api.post("/login/", formData);

            sessionStorage.setItem("access", response.data.access);
            localStorage.setItem("user", JSON.stringify({ username: response.data.username }));
            dispatch(loginSuccess());

            setMessage({ type: 'success', text: response.data.message || 'Login successful!' });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        } catch (error) {
            let errorMsg = "Login failed.";

            if (error.response) {
                const errors = error.response.data;

                if (errors.email) {
                    errorMsg = errors.email;
                } else if (errors.error) {
                    errorMsg = errors.error;
                }
            }

            dispatch(loginFailure(errorMsg));

            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back</h2>

                {message && (
                    <div className={`form-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                <div className="auth-links">
                    Don't have an account? <Link to="/register">Register here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
