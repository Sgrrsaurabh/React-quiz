import React from "react";
import "./SubjectSelection.css";

export default function SubjectSelection({ setSubject }) {
  return (
    <div className="subject-selection">
      <h2>Select a Subject</h2>
      <button onClick={() => setSubject("os")}>OS</button>
      <button onClick={() => setSubject("dbms")}>DBMS</button>
      <button onClick={() => setSubject("oops")}>OOPS</button>
      <button onClick={() => setSubject("javascript")}>JavaScript</button>
    </div>
  );
}
