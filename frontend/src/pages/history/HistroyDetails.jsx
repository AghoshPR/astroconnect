import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Reusing MatchResult CSS since the layout is identical
import '../matching/MatchResult.css';

const HistoryDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // In a real app, you would fetch the details for the specific ID.
    // Here we'll just show dummy data representing that specific match.
    const person1Name = "Rahul";
    const person2Name = "Anjali";

    const scores = [
        { name: "Varna", score: 1, outOf: 1 },
        { name: "Vashya", score: 2, outOf: 2 },
        { name: "Tara", score: 3, outOf: 3 },
        { name: "Yoni", score: 4, outOf: 4 },
        { name: "Graha Maitri", score: 5, outOf: 5 },
        { name: "Gana", score: 6, outOf: 6 },
        { name: "Bhakoot", score: 6, outOf: 7 }, // slightly different to show it's historical
        { name: "Nadi", score: 5, outOf: 8 },
    ];

    const totalScore = 32;
    const totalOutOf = 36;
    const verdict = "Excellent Match";

    return (
        <div className="match-result-container">
            <div className="result-card">
                <div className="result-header">
                    <h1>Historical Kundli Report</h1>
                    <p style={{ color: '#a0a0c0', marginBottom: '15px' }}>Record #{id || '1'}</p>
                    <div className="couple-names">
                        <span>{person1Name}</span>
                        <span className="heart-icon">❤️</span>
                        <span>{person2Name}</span>
                    </div>
                </div>

                <div className="scores-grid">
                    {scores.map((item, index) => (
                        <div key={index} className="score-item">
                            <span className="score-name">{item.name}</span>
                            <span className="score-value">{item.score}/{item.outOf}</span>
                        </div>
                    ))}
                </div>

                <div className="total-section">
                    <div className="total-score">Total Score: {totalScore}/{totalOutOf}</div>
                    <div className="verdict-badge" style={{ background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)' }}>
                        {verdict}
                    </div>
                </div>

                <div className="action-buttons">
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => navigate('/history')}
                    >
                        ← Back to History List
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryDetails;
