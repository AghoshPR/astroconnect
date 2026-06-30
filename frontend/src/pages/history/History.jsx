import React from 'react';
import { useNavigate } from 'react-router-dom';
import './History.css';

const History = () => {
    const navigate = useNavigate();

    // Dummy data for history records
    const historyRecords = [
        {
            id: 1,
            person1: "Rahul",
            person2: "Anjali",
            date: "October 15, 2023",
            score: 32,
            verdict: "Excellent",
            badgeClass: "badge-excellent"
        },
        {
            id: 2,
            person1: "Amit",
            person2: "Priya",
            date: "November 2, 2023",
            score: 25,
            verdict: "Good",
            badgeClass: "badge-good"
        },
        {
            id: 3,
            person1: "Vikram",
            person2: "Sneha",
            date: "December 10, 2023",
            score: 18,
            verdict: "Average",
            badgeClass: "badge-average"
        },
        {
            id: 4,
            person1: "Suresh",
            person2: "Kavita",
            date: "January 5, 2024",
            score: 12,
            verdict: "Not Recommended",
            badgeClass: "badge-not-recommended"
        }
    ];

    return (
        <div className="history-container">
            <div className="history-header">
                <button 
                    className="back-button" 
                    onClick={() => navigate('/dashboard')}
                    style={{ float: 'left', marginBottom: '20px' }}
                >
                    ← Back to Dashboard
                </button>
                <div style={{ clear: 'both' }}></div>
                
                <h1>Match History</h1>
                <p>Review your past compatibility analyses and saved readings.</p>
            </div>

            <div className="history-list">
                {historyRecords.map(record => (
                    <div key={record.id} className="history-card">
                        <div className="history-info">
                            <div className="history-names">
                                {record.person1} <span style={{ color: '#ff6b6b' }}>❤️</span> {record.person2}
                            </div>
                            <div className="history-date">Matched on {record.date}</div>
                            <div className="history-score-wrapper">
                                <span className="history-score">Score: {record.score}/36</span>
                                <span className={`badge ${record.badgeClass}`}>{record.verdict}</span>
                            </div>
                        </div>
                        <div className="history-action">
                            <button 
                                className="btn-details"
                                onClick={() => navigate(`/history/${record.id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
