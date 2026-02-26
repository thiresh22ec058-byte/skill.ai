// 50 Domain Category Mapping

export const domainCategories = {
  "Software Development": ["software", "developer", "programmer", "engineer", "coding"],
  "Web Development": ["web", "frontend", "backend", "full stack"],
  "Mobile Development": ["android", "ios", "mobile app"],
  "Data Science": ["data scientist", "data analyst", "analytics"],
  "Artificial Intelligence": ["ai", "artificial intelligence"],
  "Machine Learning": ["machine learning", "ml"],
  "Cybersecurity": ["cyber", "security", "ethical hacker"],
  "Cloud Computing": ["cloud", "aws", "azure", "gcp"],
  "DevOps": ["devops", "ci/cd"],
  "Blockchain": ["blockchain", "crypto", "web3"],
  "Game Development": ["game developer", "unity", "unreal"],
  "UI/UX Design": ["ui", "ux", "designer"],
  "Embedded Systems": ["embedded", "microcontroller"],
  "IoT Engineering": ["iot", "internet of things"],

  "Mechanical Engineering": ["mechanical"],
  "Civil Engineering": ["civil"],
  "Electrical Engineering": ["electrical"],
  "Electronics Engineering": ["electronics"],
  "Automobile Engineering": ["automobile"],
  "Aerospace Engineering": ["aerospace"],
  "Robotics Engineering": ["robotics"],
  "Chemical Engineering": ["chemical"],
  "Industrial Engineering": ["industrial"],

  "Entrepreneurship": ["entrepreneur", "startup", "founder", "business owner"],
  "Business Management": ["management", "manager"],
  "Finance & Banking": ["finance", "bank"],
  "Investment & Trading": ["trading", "stock market"],
  "Marketing": ["marketing"],
  "Digital Marketing": ["digital marketing", "seo"],
  "Human Resources": ["hr", "human resource"],
  "Operations Management": ["operations"],
  "Supply Chain Management": ["supply chain"],

  "Graphic Design": ["graphic"],
  "Content Creation": ["content creator", "youtuber"],
  "Video Editing": ["video editor"],
  "Animation": ["animation"],
  "Photography": ["photographer"],

  "Healthcare & Medicine": ["doctor", "medical", "healthcare"],
  "Law": ["lawyer", "advocate"],
  "Education": ["teacher", "professor"],
  "Research & Academia": ["research", "scientist"],
  "Government Services": ["government", "civil service"],

  "Environmental Science": ["environment"],
  "Renewable Energy": ["renewable", "solar"],
  "Agriculture Technology": ["agriculture"],
  "Space & Astronomy": ["astronaut", "space"],
  "Sports & Fitness": ["sports", "fitness", "trainer"]
};


// Normalize function
export function normalizeGoal(goal) {
  const lowerGoal = goal.toLowerCase();

  for (const domain in domainCategories) {
    if (
      domainCategories[domain].some(keyword =>
        lowerGoal.includes(keyword)
      )
    ) {
      return domain;
    }
  }

  return "General Career Path";
}