import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import api from "../../services/Api";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                setUserName(parsed.username || parsed.name || "User");
            } catch (e) {
                setUserName("User");
            }
        } else {
            setUserName("User");
        }
    }, []);

    useEffect(() => {

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/logout/");
        } catch (error) {
            console.log(error);
        }

        sessionStorage.removeItem("access");
        localStorage.removeItem("user");

        dispatch(logout());

        navigate("/login", { replace: true });
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <div className="profile-menu" ref={dropdownRef}>
                    <div
                        className="profile-info-display"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.1)', padding: '5px 15px 5px 5px', borderRadius: '30px' }}
                    >
                        <div className="profile-icon">
                            👤
                        </div>
                        <span className="profile-name" style={{ fontWeight: '500', fontSize: '16px' }}>{userName}</span>
                    </div>
                    {dropdownOpen && (
                        <div className="dropdown-content">
                            <div className="dropdown-item" onClick={handleLogout}>
                                <span className="dropdown-icon">🚪</span> Logout
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <header className="dashboard-header">
                <h1>Welcome, {userName}!</h1>
                <p>What would you like to explore today?</p>
            </header>

            <div className="dashboard-actions">
                <div
                    className="action-card"
                    onClick={() => handleNavigate("/new-match")}
                >
                    <div className="action-icon">✨</div>
                    <h3>New Match</h3>
                    <p>
                        Start a new astrological compatibility reading and discover the
                        stars.
                    </p>
                </div>

                <div className="action-card" onClick={() => handleNavigate("/history")}>
                    <div className="action-icon">📜</div>
                    <h3>Match History</h3>
                    <p>Review your past compatibility readings and deep insights.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
