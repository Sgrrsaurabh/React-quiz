// UserDetails.js
import React, { useState } from "react";

export default function UserDetails({ onSave }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save user details to local storage
    const userDetails = { name, email };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    onSave(userDetails); // Pass user details back to the parent component
  };

  return (
    <div className="user-details">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
