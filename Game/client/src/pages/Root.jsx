import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { register, deleteUsers } from "../services/userService";
import { addWord } from "../services/gameService";

import { toast } from "react-toastify";
// css
import "../styles/Root.css";

export default function Root() {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    // Start the game
    const startGame = useCallback(async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Enter a username first!");  // Set error message if name is empty
            return;
        }

        try {
            const res = await register(name);
            if (typeof res === "string") {
                alert(res); // Use `res` instead of `result` which doesn't exist
            } else {
                navigate('/game', { state: { id: res.msg } });
            }
        } catch (error) {
            console.error("Error during form submission:", error);
            toast.error("An error occurred while submitting the form.");
        }
    }, [name, navigate]);

    // Load additional words (only runs once on mount)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await addWord();
            } catch (error) {
                console.error("Error during adding words:", error);
                alert("An error occurred while adding words");
            }
        };

        const clearUsers = async () => {
            try {
                const res = await deleteUsers();
            } catch (error) {
                console.error("Error during deleting users:", error);
                alert("An error occurred while deleting users");
            }
        }

        clearUsers();
        fetchData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="homepage-container">
            {/* Main Homepage Image */}
            <div className="homepage-image-container">
                <img
                    src="/images/homepage.png"
                    alt="Homepage"
                    className="homepage-image"
                />
            </div>
            <div className="howtoplay">
                Enter the words you see before the ghosts reach you!!
            </div>
            {/* Name Input Field */}
            <div className="registerBox">
                <div className="registerBoxBorder">
                    <input
                        type="text"
                        name="username"
                        className="registerInput"
                        placeholder="Enter your username"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        required
                    />
                </div>
            </div>

            {/* Start Button */}
            <a className="codepen-button">
                <button
                    onClick={startGame}
                    name="text"
                    className="start-button-text"
                >
                    BEGIN
                </button>
            </a>
        </div>
    );
}
