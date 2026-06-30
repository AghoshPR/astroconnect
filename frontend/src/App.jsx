import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dashboard/Dashboard';
import NewMatch from './pages/matching/NewMatch';
import MatchResult from './pages/matching/MatchResult';
import History from './pages/history/History';
import HistoryDetails from './pages/history/HistroyDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-match" element={<NewMatch />} />
        <Route path="/match-result" element={<MatchResult />} />
        <Route path="/history" element={<History />} />
        <Route path="/history/:id" element={<HistoryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
