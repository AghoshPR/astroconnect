import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./History.css";
import api from "../../services/Api";

const History = () => {
  const navigate = useNavigate();

  const [historyRecords, setHistoryRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history/");
      setHistoryRecords(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (verdict) => {
    switch (verdict) {
      case "Excellent":
        return "badge-excellent";
      case "Good":
        return "badge-good";
      case "Average":
        return "badge-average";
      default:
        return "badge-not-recommended";
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <button
          className="back-button"
          onClick={() => navigate("/dashboard")}
          style={{ float: "left", marginBottom: "20px" }}
        >
          ← Back to Dashboard
        </button>
        <div style={{ clear: "both" }}></div>

        <h1>Match History</h1>
        <p>Review your past compatibility analyses and saved readings.</p>
      </div>

      <div className="history-list">
        {historyRecords.map((record) => (
          <div key={record.match_id} className="history-card">
            <div className="history-info">
              <div className="history-names">
                {record.person1} <span style={{ color: "#ff6b6b" }}>❤️</span>{" "}
                {record.person2}
              </div>
              <div className="history-date">
                Matched on {new Date(record.created_at).toLocaleDateString()}
              </div>
              <div className="history-score-wrapper">
                <span className="history-score">
                  Score: {record.total_score}/36
                </span>

                <span className={`badge ${getBadgeClass(record.verdict)}`}>
                  {record.verdict}
                </span>
              </div>
            </div>
            <div className="history-action">
              <button
                className="btn-details"
                onClick={() => navigate(`/history/${record.match_id}`)}
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
