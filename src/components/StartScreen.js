import { useState } from "react";
import "./StartScreen.css";

function StartScreen({ numQuestions, dispatch, selectedSubject }) {
  const [username, setUsername] = useState(""); // Track username input

  const handleStart = () => {
    if (username.trim()) {
      dispatch({ type: "start", payload: username }); // Dispatch the username
    } else {
      alert("Please enter your username to start the quiz.");
    }
  };

  return (
    <div className="start">
      <h2>Welcome to The Quiz!</h2>
      <h3>{numQuestions} questions to test your mastery in {selectedSubject}</h3>
      
      {/* Username Input with Label */}
      <div className="username-container">
        <label htmlFor="username" className="username-label">Enter your username:</label>
        <input
          id="username" // Connects the label and input for accessibility
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="username-input"
          autoFocus // Automatically focuses on this input when the component mounts
        />
      </div>
      
      <button className="btn btn-ui" onClick={handleStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
