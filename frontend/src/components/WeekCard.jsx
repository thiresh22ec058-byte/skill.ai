import React from "react";

const WeekCard = ({ phase, onComplete }) => {

  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px"
    }}>

      <h2>
        Phase {phase.phase}: {phase.name}
      </h2>

      <p>Duration: {phase.duration}</p>

      <h3>Topics</h3>

      {phase.topics.map((topic, i) => (
        <div key={i}>
          {topic.title} — 
          <a href={topic.video} target="_blank">
            Watch
          </a>
        </div>
      ))}

      <h3>Projects</h3>

      {phase.projects.map((p, i) => (
        <div key={i}>
          {p.title} — 
          <a href={p.tutorial} target="_blank">
            Build
          </a>
        </div>
      ))}

      {phase.status === "completed" && (
        <p style={{color:"green"}}>Completed</p>
      )}

      {phase.status === "unlocked" && (
        <button onClick={onComplete}>
          Complete Phase
        </button>
      )}

      {phase.status === "locked" && (
        <p>🔒 Locked</p>
      )}

    </div>
  );
};

export default WeekCard;