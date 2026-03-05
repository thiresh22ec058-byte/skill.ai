import React from "react";

export default function SkillGraph({ skills }) {
  return (
    <div>
      <h2>Skill Graph</h2>

      {skills.map((s, i) => (
        <div
          key={i}
          style={{
            padding: "10px",
            margin: "5px",
            borderRadius: "5px",
            background: s.status === "known" ? "#4CAF50" : "#FF5252",
            color: "white"
          }}
        >
          {s.skill} — {s.status}
        </div>
      ))}

    </div>
  );
}