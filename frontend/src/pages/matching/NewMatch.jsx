import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewMatch.css";
import api from "../../services/Api";
import { searchPlaces } from "../../services/placeService";

const NewMatch = () => {
    const navigate = useNavigate();
    const debounceRef = useRef(null);

    const [person1, setPerson1] = useState({
        name: "",
        date_of_birth: "",
        birth_time: "",
        place_of_birth: "",
        latitude: "",
        longitude: "",
    });

    const [person2, setPerson2] = useState({
        name: "",
        date_of_birth: "",
        birth_time: "",
        place_of_birth: "",
        latitude: "",
        longitude: "",
    });

    const [loading, setLoading] = useState(false);

    //   palce suggestions
    const [person1Suggestions, setPerson1Suggestions] = useState([]);
    const [person2Suggestions, setPerson2Suggestions] = useState([]);

    const handlePlaceSearch = (person, value) => {
        // Update the input immediately
        if (person === 1) {
            setPerson1((prev) => ({
                ...prev,
                place_of_birth: value,
            }));
        } else {
            setPerson2((prev) => ({
                ...prev,
                place_of_birth: value,
            }));
        }

        // Don't search until at least 3 characters
        if (value.trim().length < 3) {
            if (person === 1) {
                setPerson1Suggestions([]);
            } else {
                setPerson2Suggestions([]);
            }
            return;
        }

        clearTimeout(debounceRef.current);

        // Wait 400ms after typing stops
        debounceRef.current = setTimeout(async () => {
            const places = await searchPlaces(value);

            if (person === 1) {
                setPerson1Suggestions(places);
            } else {
                setPerson2Suggestions(places);
            }
        }, 400);
    };

    const selectPlace = (person, place) => {
        if (person === 1) {
            setPerson1((prev) => ({
                ...prev,
                place_of_birth: place.display_name,
                latitude: Number(place.lat).toFixed(6),
                longitude: Number(place.lon).toFixed(6),
            }));

            setPerson1Suggestions([]);
        } else {
            setPerson2((prev) => ({
                ...prev,
                place_of_birth: place.display_name,
                latitude: Number(place.lat).toFixed(6),
                longitude: Number(place.lon).toFixed(6),
            }));

            setPerson2Suggestions([]);
        }
    };

    const handleChange = (person, e) => {
        const { name, value } = e.target;

        if (person === 1) {
            setPerson1((prev) => ({
                ...prev,
                [name]: value,
            }));
        } else {
            setPerson2((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await api.post("/match/", {
                person1,
                person2,
            });

            navigate(`/match-result/${response.data.match_id}`);
        } catch (error) {
            console.log(error);
            alert("unable to generate match");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="new-match-container">
            <button className="back-button" onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

            <div className="match-header">
                <h1>New Astrological Match</h1>
                <p>
                    Enter the birth details of both individuals to analyze compatibility.
                </p>
            </div>

            <form className="match-form" onSubmit={handleSubmit}>
                <div className="persons-container">
                    <div className="person-card">
                        <h2>Person 1 Details</h2>
                        <div className="match-form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={person1.name}
                                onChange={(e) => handleChange(1, e)}
                                required
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="match-form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="date_of_birth"
                                value={person1.date_of_birth}
                                onChange={(e) => handleChange(1, e)}
                                required
                            />
                        </div>
                        <div className="match-form-group">
                            <label>Birth Time</label>
                            <input
                                type="time"
                                name="birth_time"
                                value={person1.birth_time}
                                onChange={(e) => handleChange(1, e)}
                                required
                            />
                        </div>

                        <div className="match-form-group">
                            <label>Place of Birth</label>

                            <input
                                type="text"
                                name="place_of_birth"
                                value={person1.place_of_birth}
                                onChange={(e) => handlePlaceSearch(1, e.target.value)}
                                placeholder="Search place"
                                required
                            />

                            {person1Suggestions.length > 0 && (
                                <div className="place-dropdown">
                                    {person1Suggestions.map((place) => (
                                        <div
                                            key={place.place_id}
                                            className="place-item"
                                            onClick={() => selectPlace(1, place)}
                                        >
                                            {place.display_name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="match-form-group">
                            <label>Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={person1.latitude}
                                readOnly
                                placeholder="Auto generated"
                            />
                        </div>
                        <div className="match-form-group">
                            <label>Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={person1.longitude}
                                readOnly
                                placeholder="Auto generated"
                            />
                        </div>
                    </div>

                    <div className="person-card">
                        <h2>Person 2 Details</h2>
                        <div className="match-form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={person2.name}
                                onChange={(e) => handleChange(2, e)}
                                placeholder="Enter name"
                                required
                            />
                        </div>

                        <div className="match-form-group">
                            <label>Date of Birth</label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={person2.date_of_birth}
                                onChange={(e) => handleChange(2, e)}
                                required
                            />
                        </div>

                        <div className="match-form-group">
                            <label>Birth Time</label>

                            <input
                                type="time"
                                name="birth_time"
                                value={person2.birth_time}
                                onChange={(e) => handleChange(2, e)}
                                required
                            />
                        </div>

                        <div className="match-form-group">
                            <label>Place of Birth</label>

                            <input
                                type="text"
                                name="place_of_birth"
                                value={person2.place_of_birth}
                                onChange={(e) => handlePlaceSearch(2, e.target.value)}
                                placeholder="Search place"
                                required
                            />

                            {person2Suggestions.length > 0 && (
                                <div className="place-dropdown">
                                    {person2Suggestions.map((place) => (
                                        <div
                                            key={place.place_id}
                                            className="place-item"
                                            onClick={() => selectPlace(2, place)}
                                        >
                                            {place.display_name}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="match-form-group">
                            <label>Latitude</label>
                            <input
                                type="text"
                                name="latitude"
                                value={person2.latitude}
                                readOnly
                                placeholder="Auto generated"
                            />
                        </div>
                        <div className="match-form-group">
                            <label>Longitude</label>
                            <input
                                type="text"
                                name="longitude"
                                value={person2.longitude}
                                readOnly
                                placeholder="Auto generated"
                            />
                        </div>
                    </div>
                </div>

                <div className="submit-container">
                    <button type="submit" className="match-submit-btn" disabled={loading}>
                        {loading ? "Generating..." : "Match Kundli"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewMatch;
