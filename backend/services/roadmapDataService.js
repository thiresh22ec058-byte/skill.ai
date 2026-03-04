import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { normalizeGoal } from "../config/careerDomains.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roadmapsDir = path.join(__dirname, "../config/roadmaps");

const roadmapDatabase = {};

const files = fs.readdirSync(roadmapsDir);

for (const file of files) {

  if (!file.endsWith(".js")) continue;

  try {

    const module = await import(`../config/roadmaps/${file}`);

    const roadmapData = Object.values(module)[0];

    if (roadmapData && roadmapData.title) {
      roadmapDatabase[roadmapData.title] = roadmapData;
    }

  } catch (err) {
    console.log(`Skipping file: ${file}`);
  }

}

export const getRoadmapByGoal = (goal) => {

  const normalizedGoal = normalizeGoal(goal);

  return roadmapDatabase[normalizedGoal] || null;

};