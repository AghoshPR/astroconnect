import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

// Password validation helper
const validatePassword = (pwd) => {
  const errors = [];
  if (pwd.length < 6) errors.push("minimum 6 characters");
  if (!/[A-Z]/.test(pwd)) errors.push("one uppercase letter");
  if (!/[a-z]/.test(pwd)) errors.push("one lowercase letter");
  if (!/[0-9]/.test(pwd)) errors.push("one digit");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(pwd)) errors.push("one special character");
  return errors;
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: "Passwords do not match." });
      return;
    }

    // Validate password requirements
    const pwdErrors = validatePassword(formData.password);
    if (pwdErrors.length) {
      setMessage({ type: 'error', text: `Password must contain ${pwdErrors.join(', ')}` });
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
      });

      setMessage({ type: 'success', text: response.data.message || 'Account created successfully!' });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response) {
        const errors = error.response.data;

        if (errors.username) {
          setMessage({ type: 'error', text: errors.username });
        } else if (errors.email) {
          setMessage({ type: 'error', text: errors.email });
        } else if (errors.confirm_password) {
          setMessage({ type: 'error', text: errors.confirm_password });
        } else if (errors.error) {
          setMessage({ type: 'error', text: errors.error });
        } else {
          setMessage({ type: 'error', text: "Registration failed." });
        }
      } else {
        setMessage({ type: 'error', text: "Server is not responding." });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        {message && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-links">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
