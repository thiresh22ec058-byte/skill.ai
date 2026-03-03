// backend/services/roadmapService.js

import OpenAI from "openai";

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not defined in .env");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export const generateRoadmapFromGPT = async ({
  goal,
  skillLevel,
  currentSkills,
  dailyHours,
}) => {
  const prompt = `
Generate a personalized learning roadmap.

User Goal: ${goal}
Skill Level: ${skillLevel}
Current Skills: ${currentSkills.join(", ")}
Daily Study Hours: ${dailyHours}

Return ONLY valid JSON. Do NOT include markdown. Do NOT include backticks.

Structure:

{
  "title": "",
  "estimated_duration": "",
  "weekly_plan_overview": "",
  "phases": [
    {
      "phase_name": "",
      "duration": "",
      "topics": [],
      "projects": []
    }
  ]
}

Make it practical, industry-focused and structured.
`;

  // ✅ FIX: Create OpenAI client properly
  const openai = getOpenAIClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a roadmap generator that returns strict JSON only." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  const rawContent = response.choices[0].message.content;

  try {
    return JSON.parse(rawContent);
  } catch (err) {
    console.error("GPT returned invalid JSON:\n", rawContent);
    throw new Error("Invalid JSON from GPT");
  }
};