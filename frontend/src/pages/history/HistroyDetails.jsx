import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Api";
import "../matching/MatchResult.css";

const HistoryDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistoryDetails();
  }, [id]);

  const fetchHistoryDetails = async () => {
    try {
      const response = await api.get(`/history/${id}/`);
      setResult(response.data);
    } catch (error) {
      console.log(error);
      alert("unable to fetech");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!result) {
    return <h2>No Match Found</h2>;
  }



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



  return (
    <div className="match-result-container">
      <div className="result-card">
        <div className="result-header">
          <h1>Historical Kundli Report</h1>
          <p style={{ color: "#a0a0c0", marginBottom: "15px" }}>
            Record #{result.match_id}
          </p>
          <div className="couple-names">
            <span>{result.person1}</span>
            <span className="heart-icon">❤️</span>
            <span>{result.person2}</span>
          </div>
        </div>

        <div className="scores-grid">
           {scores.map((item) => (
            <div key={item.name} className="score-item">
              <span className="score-name">{item.name}</span>

              <span className="score-value">
                {item.score}/{item.outOf}
              </span>
            </div>
          ))}
        </div>

        <div className="total-section">
          <div className="total-score">
            Total Score: {result.total_score}/36
          </div>
          <div
            className="verdict-badge"
            style={{
              background: "linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)",
            }}
          >
            {result.verdict}
          </div>
        </div>

        <div className="action-buttons">
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/history")}
          >
            ← Back to History List
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryDetails;
