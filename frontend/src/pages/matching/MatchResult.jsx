import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./MatchResult.css";
import api from "../../services/Api";

const MatchResult = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [result,setResult]=useState(null)
  const [loading,setLoading]=useState(true)

  const fetchResult = async()=>{
    try{
        const response = await api.get(`/history/${id}/`)
        setResult(response.data)
    }catch(error){
        console.log(error);
        alert("uable to read")
        
    }finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchResult();
  }, []);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (!result) {
    return null;
  }

  const person1Name = result.person1;
  const person2Name = result.person2;

  const scores = [
    { name: "Varna", score: result.varna, outOf: 1 },
    { name: "Vashya", score: result.vashya, outOf: 2 },
    { name: "Tara", score: result.tara, outOf: 3 },
    { name: "Yoni", score: result.yoni, outOf: 4 },
    { name: "Graha Maitri", score: result.graha_maitri, outOf: 5 },
    { name: "Gana", score: result.gana, outOf: 6 },
    { name: "Bhakoot", score: result.bhakoot, outOf: 7 },
    { name: "Nadi", score: result.nadi, outOf: 8 },
  ];

  const totalScore = result.total_score;
  const totalOutOf = 36;
  const verdict = result.verdict;

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
              <span className="score-value">
                {item.score}/{item.outOf}
              </span>
            </div>
          ))}
        </div>

        <div className="total-section">
          <div className="total-score">
            Total Score: {totalScore}/{totalOutOf}
          </div>
          <div className="verdict-badge">{verdict}</div>
        </div>

        <div className="action-buttons">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/history")}
          >
            View Match History
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchResult;
