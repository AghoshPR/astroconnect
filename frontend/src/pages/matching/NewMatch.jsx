import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewMatch.css';

const NewMatch = () => {
    const navigate = useNavigate();
    const [person1, setPerson1] = useState({
        name: '',
        dob: '',
        tob: '',
        latitude: '',
        longitude: ''
    });

    const [person2, setPerson2] = useState({
        name: '',
        dob: '',
        tob: '',
        latitude: '',
        longitude: ''
    });

    const handlePerson1Change = (e) => {
        setPerson1({ ...person1, [e.target.name]: e.target.value });
    };

    const handlePerson2Change = (e) => {
        setPerson2({ ...person2, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Matching Kundli for:", { person1, person2 });
        // Add API logic here later to perform the actual match
        alert("Kundli Match requested! You can check the console for data.");
    };

    return (
        <div className="new-match-container">
            <button className="back-button" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
            </button>

            <div className="match-header">
                <h1>New Astrological Match</h1>
                <p>Enter the birth details of both individuals to analyze compatibility.</p>
            </div>

            <form className="match-form" onSubmit={handleSubmit}>
                <div className="persons-container">
                    <div className="person-card">
                        <h2>Person 1 Details</h2>
                        <div className="match-form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={person1.name} onChange={handlePerson1Change} required placeholder="Enter name" />
                        </div>
                        <div className="match-form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={person1.dob} onChange={handlePerson1Change} required />
                        </div>
                        <div className="match-form-group">
                            <label>Birth Time</label>
                            <input type="time" name="tob" value={person1.tob} onChange={handlePerson1Change} required />
                        </div>
                        <div className="match-form-group">
                            <label>Latitude</label>
                            <input type="text" name="latitude" value={person1.latitude} onChange={handlePerson1Change} required placeholder="e.g. 28.7041" />
                        </div>
                        <div className="match-form-group">
                            <label>Longitude</label>
                            <input type="text" name="longitude" value={person1.longitude} onChange={handlePerson1Change} required placeholder="e.g. 77.1025" />
                        </div>
                    </div>

                    <div className="person-card">
                        <h2>Person 2 Details</h2>
                        <div className="match-form-group">
                            <label>Name</label>
                            <input type="text" name="name" value={person2.name} onChange={handlePerson2Change} required placeholder="Enter name" />
                        </div>
                        <div className="match-form-group">
                            <label>Date of Birth</label>
                            <input type="date" name="dob" value={person2.dob} onChange={handlePerson2Change} required />
                        </div>
                        <div className="match-form-group">
                            <label>Birth Time</label>
                            <input type="time" name="tob" value={person2.tob} onChange={handlePerson2Change} required />
                        </div>
                        <div className="match-form-group">
                            <label>Latitude</label>
                            <input type="text" name="latitude" value={person2.latitude} onChange={handlePerson2Change} required placeholder="e.g. 34.0522" />
                        </div>
                        <div className="match-form-group">
                            <label>Longitude</label>
                            <input type="text" name="longitude" value={person2.longitude} onChange={handlePerson2Change} required placeholder="e.g. -118.2437" />
                        </div>
                    </div>
                </div>

                <div className="submit-container">
                    <button type="submit" className="match-submit-btn">✨ Match Kundli</button>
                </div>
            </form>
        </div>
    );
};

export default NewMatch;
