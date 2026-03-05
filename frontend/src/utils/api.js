const API_BASE = "http://localhost:5000/api";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const fetchRoadmap = async (goal) => {
  const res = await fetch(`${API_BASE}/roadmap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ goal })
  });

  return res.json();
};

export const completePhase = async (goal, phaseNumber) => {
  const res = await fetch(`${API_BASE}/roadmap/complete-phase`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify({ goal, phaseNumber })
  });

  return res.json();
};

export const getUserProgress = async () => {
  const res = await fetch(`${API_BASE}/roadmap/user-progress`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  return res.json();
};