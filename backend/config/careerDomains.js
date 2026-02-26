// ===============================
// DOMAIN CATEGORY KEYWORD MATCHING
// ===============================

export const domainCategories = {
  "Software Development": ["software", "developer", "programming", "coding"],
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
  "Product Management": ["product manager"],
  "Embedded Systems": ["embedded", "microcontroller"],
  "IoT Engineering": ["iot", "internet of things"],

  "Mechanical Engineering": ["mechanical"],
  "Civil Engineering": ["civil"],
  "Electrical Engineering": ["electrical"],
  "Electronics Engineering": ["electronics"],
  "Automobile Engineering": ["automobile"],
  "Aerospace Engineering": ["aerospace"],
  "Robotics Engineering": ["robotics"],
  "Mechatronics": ["mechatronics"],
  "Industrial Engineering": ["industrial"],
  "Chemical Engineering": ["chemical"],

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


// ===============================
// REQUIRED SKILLS PER DOMAIN
// ===============================

export const domainSkills = {

  "Software Development": [
    "Programming",
    "Data Structures",
    "Git",
    "SQL",
    "Problem Solving",
    "Projects"
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Backend Development",
    "Projects"
  ],

  "Mobile Development": [
    "Java/Kotlin",
    "Swift",
    "Flutter/React Native",
    "API Integration",
    "Mobile UI Design"
  ],

  "Data Science": [
    "Python",
    "Statistics",
    "Data Visualization",
    "Machine Learning",
    "SQL"
  ],

  "Artificial Intelligence": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "Projects"
  ],

  "Machine Learning": [
    "Python",
    "Statistics",
    "Algorithms",
    "Model Training",
    "Projects"
  ],

  "Cybersecurity": [
    "Networking",
    "Linux",
    "Ethical Hacking",
    "Cryptography",
    "Security Tools"
  ],

  "Cloud Computing": [
    "AWS/Azure/GCP",
    "Linux",
    "Networking",
    "Deployment",
    "DevOps Basics"
  ],

  "DevOps": [
    "CI/CD",
    "Docker",
    "Kubernetes",
    "Cloud",
    "Automation"
  ],

  "Blockchain": [
    "Cryptography",
    "Smart Contracts",
    "Solidity",
    "Web3",
    "Projects"
  ],

  "IoT Engineering": [
    "Programming",
    "Embedded Systems",
    "Microcontrollers",
    "Sensors",
    "Networking",
    "IoT Projects"
  ],

  "Mechanical Engineering": [
    "Engineering Mechanics",
    "Thermodynamics",
    "CAD",
    "Manufacturing",
    "Projects"
  ],

  "Civil Engineering": [
    "Structural Analysis",
    "Construction Planning",
    "AutoCAD",
    "Material Science"
  ],

  "Electrical Engineering": [
    "Circuit Theory",
    "Power Systems",
    "Control Systems",
    "Electronics"
  ],

  "Electronics Engineering": [
    "Digital Electronics",
    "Analog Circuits",
    "Microcontrollers",
    "Embedded Systems"
  ],

  "Entrepreneurship": [
    "Business Planning",
    "Marketing",
    "Finance",
    "Leadership",
    "Networking"
  ],

  "Finance & Banking": [
    "Accounting",
    "Financial Analysis",
    "Investment Basics",
    "Risk Management"
  ],

  "Digital Marketing": [
    "SEO",
    "Social Media Marketing",
    "Content Strategy",
    "Analytics"
  ],

  "Graphic Design": [
    "Photoshop",
    "Illustrator",
    "Typography",
    "Branding"
  ],

  "Healthcare & Medicine": [
    "Biology",
    "Human Anatomy",
    "Medical Terminology",
    "Patient Care",
    "Clinical Knowledge"
  ],

  "Law": [
    "Legal Research",
    "Constitutional Law",
    "Drafting",
    "Court Procedures"
  ],

  "Education": [
    "Subject Knowledge",
    "Teaching Methods",
    "Communication",
    "Classroom Management"
  ],

  "Environmental Science": [
    "Ecology",
    "Climate Studies",
    "Sustainability",
    "Research Methods"
  ]
};


// ===============================
// NORMALIZE FUNCTION
// ===============================

export function normalizeGoal(goal) {
  const lowerGoal = goal.toLowerCase();

  // Exact match
  for (const domain in domainCategories) {
    if (domain.toLowerCase() === lowerGoal) {
      return domain;
    }
  }

  // Keyword match
  for (const domain in domainCategories) {
    if (
      domainCategories[domain].some(keyword =>
        lowerGoal.includes(keyword)
      )
    ) {
      return domain;
    }
  }

  return "Software Development"; // safe fallback
}