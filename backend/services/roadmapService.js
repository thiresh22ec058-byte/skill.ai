import OpenAI from "openai";
import { domainSkills, normalizeGoal } from "../config/careerDomains.js";
import { getBestPlaylist } from "./youtubeService.js";

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

/* ================= YOUTUBE PLAYLIST FETCHER ================= */

const buildPlaylist = async (topics, goal) => {

  if (!topics || topics.length === 0) return null;

  const topic = topics[0];

  try {

    const playlist = await getBestPlaylist(topic, goal);

    return playlist;

  } catch (error) {

    console.error("YouTube Playlist Error:", error);

    return null;

  }

};

/* ================= STATIC ROADMAP GENERATOR ================= */

export async function generateRoadmap(goal, userSkills = []) {

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

  /* Fetch playlists */

  const playlist1 = await buildPlaylist(phase1, normalizedGoal);
  const playlist2 = await buildPlaylist(phase2, normalizedGoal);
  const playlist3 = await buildPlaylist(phase3, normalizedGoal);

  return {

    title: normalizedGoal,

    phases: [

      {
        phase: 1,
        name: "Core Foundations",
        duration: "4 weeks",
        topics: phase1,
        playlist: playlist1,
        status: "unlocked"
      },

      {
        phase: 2,
        name: "Intermediate Skills",
        duration: "4 weeks",
        topics: phase2,
        playlist: playlist2,
        status: "locked"
      },

      {
        phase: 3,
        name: "Advanced Concepts",
        duration: "4 weeks",
        topics: phase3,
        playlist: playlist3,
        status: "locked"
      }

    ]

  };

}