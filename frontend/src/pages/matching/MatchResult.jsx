import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchResult.css';

const MatchResult = () => {
    const navigate = useNavigate();

    // Hardcoded dummy data as requested
    const person1Name = "Person 1";
    const person2Name = "Person 2";

    const scores = [
        { name: "Varna", score: 1, outOf: 1 },
        { name: "Vashya", score: 2, outOf: 2 },
        { name: "Tara", score: 3, outOf: 3 },
        { name: "Yoni", score: 4, outOf: 4 },
        { name: "Graha Maitri", score: 5, outOf: 5 },
        { name: "Gana", score: 6, outOf: 6 },
        { name: "Bhakoot", score: 7, outOf: 7 },
        { name: "Nadi", score: 8, outOf: 8 },
    ];

    const totalScore = 36;
    const totalOutOf = 36;
    const verdict = "Excellent Match";

    return (
        <div className="match-result-container">
            <div className="result-card">
                <div className="result-header">
                    <h1>Kundli Compatibility Result</h1>
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
                    <div className="verdict-badge">{verdict}</div>
                </div>

                <div className="action-buttons">
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => navigate('/dashboard')}
                    >
                        Back to Dashboard
                    </button>
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate('/history')}
                    >
                        View Match History
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MatchResult;
