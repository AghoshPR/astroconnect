import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUserName(JSON.parse(storedUser).name || 'Explorer');
            } catch (e) {
                setUserName('Explorer');
            }
        } else {
            setUserName('Explorer'); // Default fallback
        }
    }, []);

    useEffect(() => {
        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
     
        localStorage.removeItem('token');
        localStorage.removeItem('user');
     
        navigate('/login');
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    // Get the first letter of the user's name for the avatar
    const avatarLetter = userName ? userName.charAt(0).toUpperCase() : 'E';

    return (
        <div className="dashboard-container">
            <div className="top-nav">
                <div className="profile-menu" ref={dropdownRef}>
                    <div 
                        className="profile-icon" 
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {avatarLetter}
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
                    onClick={() => handleNavigate('/new-match')}
                >
                    <div className="action-icon">✨</div>
                    <h3>New Match</h3>
                    <p>Start a new astrological compatibility reading and discover the stars.</p>
                </div>

                <div 
                    className="action-card"
                    onClick={() => handleNavigate('/history')}
                >
                    <div className="action-icon">📜</div>
                    <h3>Match History</h3>
                    <p>Review your past compatibility readings and deep insights.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
