// backend/services/roadmapService.js

import OpenAI from "openai";
import { domainSkills, normalizeGoal } from "../config/careerDomains.js";

/* ================= OPENAI CLIENT ================= */

function getOpenAIClient() {

  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined in .env");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

}

/* ================= GPT ROADMAP GENERATOR ================= */

export const generateRoadmapFromGPT = async ({
  goal,
  skillLevel,
  currentSkills,
  dailyHours
}) => {

  const prompt = `
Generate a personalized learning roadmap.

User Goal: ${goal}
Skill Level: ${skillLevel}
Current Skills: ${currentSkills.join(", ")}
Daily Study Hours: ${dailyHours}

Return ONLY valid JSON.

{
"title":"",
"estimated_duration":"",
"weekly_plan_overview":"",
"phases":[
{
"phase_name":"",
"duration":"",
"topics":[],
"projects":[]
}
]
}
`;

  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({

    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "You are a roadmap generator that returns strict JSON only."
      },
      {
        role: "user",
        content: prompt
      }
    ],

    temperature: 0.7

  });

  const rawContent = response.choices[0].message.content;

  try {

    return JSON.parse(rawContent);

  } catch (err) {

    console.error("GPT returned invalid JSON:\n", rawContent);
    throw new Error("Invalid JSON from GPT");

  }

};

/* ================= YOUTUBE VIDEO BUILDER ================= */

const buildPlaylist = (topics) => {

  if (!topics || topics.length === 0) return null;

  const topic = topics[0].toLowerCase();

  const videoMap = {

    programming: "https://www.youtube.com/watch?v=zOjov-2OZ0E",
    python: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    javascript: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
    html: "https://www.youtube.com/watch?v=qz0aGYrrlhU",
    css: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
    react: "https://www.youtube.com/watch?v=bMknfKXIFA8",

    machine: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    data: "https://www.youtube.com/watch?v=ua-CiDNNj30",

    networking: "https://www.youtube.com/watch?v=qiQR5rTSshw",
    sensors: "https://www.youtube.com/watch?v=Y2KqQ2Z2F6Y",
    microcontrollers: "https://www.youtube.com/watch?v=F8C1Za2K5qM",
    embedded: "https://www.youtube.com/watch?v=O9qvYg6g9jE",
    iot: "https://www.youtube.com/watch?v=6mBO2vqLv38",

    business: "https://www.youtube.com/watch?v=RjR0GUOAXOU",
    marketing: "https://www.youtube.com/watch?v=nU-IIXBWlS4",
    finance: "https://www.youtube.com/watch?v=8S0FDjFBj8o",
    leadership: "https://www.youtube.com/watch?v=9qV8N2A3tDk",

    ui: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",

    cybersecurity: "https://www.youtube.com/watch?v=U_P23SqJaDc"
  };

  for (const key in videoMap) {

    if (topic.includes(key)) {
      return videoMap[key];
    }

  }

  /* Default programming course */

  return "https://www.youtube.com/watch?v=rfscVS0vtbw";

};

/* ================= STATIC ROADMAP GENERATOR ================= */

export function generateRoadmap(goal, userSkills = []) {

  const normalizedGoal = normalizeGoal(goal);

  const requiredSkills = domainSkills[normalizedGoal] || [];

  const missingSkills = requiredSkills.filter(
    skill =>
      !userSkills.some(
        s => s.toLowerCase() === skill.toLowerCase()
      )
  );

  /* Split skills into 3 phases */

  const phaseSize = Math.ceil(missingSkills.length / 3);

  const phase1 = missingSkills.slice(0, phaseSize);
  const phase2 = missingSkills.slice(phaseSize, phaseSize * 2);
  const phase3 = missingSkills.slice(phaseSize * 2);

  return {

    title: normalizedGoal,

    phases: [

      {
        phase: 1,
        name: "Core Foundations",
        duration: "4 weeks",
        topics: phase1,
        playlist: buildPlaylist(phase1),
        status: "unlocked"
      },

      {
        phase: 2,
        name: "Intermediate Skills",
        duration: "4 weeks",
        topics: phase2,
        playlist: buildPlaylist(phase2),
        status: "locked"
      },

      {
        phase: 3,
        name: "Advanced Concepts",
        duration: "4 weeks",
        topics: phase3,
        playlist: buildPlaylist(phase3),
        status: "locked"
      }

    ]

  };

}