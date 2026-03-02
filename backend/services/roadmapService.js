// backend/services/roadmapService.js

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

Return ONLY valid JSON in this structure:

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

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an expert career mentor." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
  });

  return JSON.parse(response.choices[0].message.content);
};