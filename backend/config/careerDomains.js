// ===============================
// DOMAIN CATEGORY KEYWORD MATCHING
// ===============================

export const domainCategories = {

  // Tech Careers

  "Software Development": ["software", "developer", "programming", "coding"],
  "Web Development": ["web", "frontend", "backend", "full stack"],
  "Mobile Development": ["android", "ios", "mobile", "app developer"],
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


  // Engineering Fields

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


  // Business Fields

  "Entrepreneurship": ["entrepreneur", "startup", "founder", "business owner"],
  "Business Management": ["management", "manager"],
  "Finance & Banking": ["finance", "bank"],
  "Investment & Trading": ["trading", "stock market"],
  "Marketing": ["marketing"],
  "Digital Marketing": ["digital marketing", "seo"],
  "Human Resources": ["hr", "human resource"],
  "Operations Management": ["operations"],
  "Supply Chain Management": ["supply chain"],


  // Creative Fields

  "Graphic Design": ["graphic"],
  "Content Creation": ["content creator", "youtuber"],
  "Video Editing": ["video editor"],
  "Animation": ["animation"],
  "Photography": ["photographer"],


  // Professional Fields

  "Healthcare & Medicine": ["doctor", "medical", "healthcare"],
  "Law": ["lawyer", "advocate"],
  "Education": ["teacher", "professor"],
  "Research & Academia": ["research", "scientist"],
  "Government Services": ["government", "civil service"],


  // Emerging Fields

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

  // Tech Careers

  "Software Development": [
    "Programming",
    "Data Structures",
    "Algorithms",
    "Object Oriented Programming",
    "Git",
    "SQL",
    "System Design",
    "Debugging",
    "Testing",
    "Problem Solving",
    "Projects"
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "REST APIs",
    "Responsive Design",
    "Database",
    "Web Security",
    "Git",
    "Projects"
  ],

  "Mobile Development": [
    "Java/Kotlin",
    "Swift",
    "Flutter",
    "React Native",
    "Mobile UI Design",
    "API Integration",
    "Testing",
    "Deployment",
    "Git",
    "Projects"
  ],

  "Data Science": [
    "Python",
    "Statistics",
    "Machine Learning",
    "Data Visualization",
    "Pandas",
    "NumPy",
    "SQL",
    "Data Cleaning",
    "Model Evaluation",
    "Projects"
  ],

  "Artificial Intelligence": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "TensorFlow",
    "PyTorch",
    "Data Processing",
    "Model Training",
    "Model Deployment",
    "Projects"
  ],

  "Machine Learning": [
    "Python",
    "Statistics",
    "Algorithms",
    "Model Training",
    "Feature Engineering",
    "Data Processing",
    "Model Evaluation",
    "TensorFlow",
    "PyTorch",
    "Projects"
  ],

  "Cybersecurity": [
    "Networking",
    "Linux",
    "Security Tools",
    "Cryptography",
    "Penetration Testing",
    "Ethical Hacking",
    "Threat Analysis",
    "Security Protocols",
    "Firewalls",
    "Incident Response",
    "Projects"
  ],

  "Cloud Computing": [
    "AWS",
    "Azure",
    "GCP",
    "Linux",
    "Networking",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Infrastructure as Code",
    "Monitoring",
    "Projects"
  ],

  "DevOps": [
    "Linux",
    "Docker",
    "Kubernetes",
    "CI/CD",
    "Git",
    "Cloud Platforms",
    "Monitoring",
    "Automation",
    "Scripting",
    "Infrastructure",
    "Projects"
  ],

  "Blockchain": [
    "Cryptography",
    "Smart Contracts",
    "Solidity",
    "Ethereum",
    "Web3",
    "Blockchain Architecture",
    "Security",
    "Decentralized Apps",
    "Testing",
    "Projects"
  ]
    ,

  "Game Development": [
    "C#",
    "Unity",
    "Unreal Engine",
    "Game Physics",
    "3D Graphics",
    "Animation",
    "Game Design",
    "Debugging",
    "Optimization",
    "Projects"
  ],

  "UI/UX Design": [
    "Design Principles",
    "Wireframing",
    "Prototyping",
    "User Research",
    "Figma",
    "Adobe XD",
    "Usability Testing",
    "Interaction Design",
    "Accessibility",
    "Visual Design",
    "Projects"
  ],

  "Product Management": [
    "Product Strategy",
    "Market Research",
    "Roadmapping",
    "Stakeholder Management",
    "Agile",
    "Scrum",
    "User Research",
    "Analytics",
    "Business Strategy",
    "Communication",
    "Projects"
  ],

  "Embedded Systems": [
    "Embedded C",
    "Microcontrollers",
    "RTOS",
    "Hardware Interfaces",
    "Circuit Design",
    "Sensors",
    "Firmware Development",
    "Debugging",
    "Testing",
    "Projects"
  ],

  "IoT Engineering": [
    "Embedded Systems",
    "Microcontrollers",
    "Sensors",
    "Networking",
    "IoT Platforms",
    "Cloud IoT",
    "Device Communication",
    "Edge Computing",
    "Security",
    "Projects"
  ],


  // Engineering Fields

  "Mechanical Engineering": [
    "Thermodynamics",
    "Mechanics",
    "CAD",
    "Manufacturing",
    "Material Science",
    "Fluid Mechanics",
    "Machine Design",
    "Simulation",
    "Engineering Math",
    "Testing"
  ],

  "Civil Engineering": [
    "Structural Design",
    "AutoCAD",
    "Construction Management",
    "Surveying",
    "Geotechnical Engineering",
    "Project Planning",
    "Site Supervision",
    "Safety Regulations",
    "Concrete Technology",
    "Infrastructure Design"
  ],

  "Electrical Engineering": [
    "Circuit Analysis",
    "Electrical Machines",
    "Power Systems",
    "Control Systems",
    "Electronics",
    "MATLAB",
    "Electrical Design",
    "Testing",
    "Signal Processing",
    "Power Electronics"
  ],

  "Electronics Engineering": [
    "Analog Electronics",
    "Digital Electronics",
    "Microprocessors",
    "Embedded Systems",
    "PCB Design",
    "C Programming",
    "Circuit Debugging",
    "Signal Processing",
    "Communication Systems",
    "Testing"
  ],

  "Automobile Engineering": [
    "Vehicle Dynamics",
    "Engine Systems",
    "Automotive Design",
    "CAD",
    "Mechanical Systems",
    "Manufacturing",
    "Diagnostics",
    "Testing",
    "Hybrid Systems",
    "Automotive Electronics"
  ],

  "Aerospace Engineering": [
    "Aerodynamics",
    "Flight Mechanics",
    "Propulsion Systems",
    "Aircraft Structures",
    "MATLAB",
    "Control Systems",
    "Simulation",
    "Testing",
    "Avionics",
    "Navigation Systems"
  ],

  "Robotics Engineering": [
    "Programming",
    "Robot Kinematics",
    "Control Systems",
    "Sensors",
    "Machine Vision",
    "ROS",
    "Embedded Systems",
    "Automation",
    "AI for Robotics",
    "Testing"
  ],

  "Mechatronics": [
    "Mechanical Systems",
    "Electronics",
    "Embedded Systems",
    "Control Systems",
    "Robotics",
    "Sensors",
    "Automation",
    "Programming",
    "System Integration",
    "Testing"
  ],

  "Industrial Engineering": [
    "Process Optimization",
    "Operations Research",
    "Supply Chain",
    "Quality Control",
    "Lean Manufacturing",
    "Data Analysis",
    "Project Management",
    "Production Planning",
    "Industrial Safety",
    "Cost Analysis"
  ],

  "Chemical Engineering": [
    "Thermodynamics",
    "Chemical Reactions",
    "Process Engineering",
    "Fluid Mechanics",
    "Material Science",
    "Plant Design",
    "Safety Engineering",
    "Process Simulation",
    "Heat Transfer",
    "Industrial Chemistry"
  ]

  ,

// Business Fields

"Entrepreneurship": [
"Business Planning",
"Market Research",
"Financial Management",
"Leadership",
"Product Development",
"Sales Strategy",
"Networking",
"Startup Operations",
"Pitching",
"Business Strategy"
],

"Business Management": [
"Leadership",
"Strategic Planning",
"Business Communication",
"Project Management",
"Decision Making",
"Team Management",
"Operations Management",
"Business Analysis",
"Organizational Behavior",
"Financial Planning"
],

"Finance & Banking": [
"Accounting",
"Financial Analysis",
"Investment Basics",
"Risk Management",
"Financial Modeling",
"Corporate Finance",
"Taxation",
"Regulations",
"Banking Systems",
"Financial Planning"
],

"Investment & Trading": [
"Stock Market Analysis",
"Technical Analysis",
"Fundamental Analysis",
"Risk Management",
"Portfolio Management",
"Financial Modeling",
"Trading Platforms",
"Market Psychology",
"Derivatives",
"Investment Strategy"
],

"Marketing": [
"Market Research",
"Brand Strategy",
"Consumer Behavior",
"Advertising",
"Campaign Management",
"Sales Strategy",
"Content Marketing",
"Analytics",
"Digital Marketing",
"Customer Engagement"
],

"Digital Marketing": [
"SEO",
"Content Marketing",
"Social Media Marketing",
"Google Analytics",
"Paid Advertising",
"Email Marketing",
"Conversion Optimization",
"Brand Strategy",
"Copywriting",
"Marketing Automation"
],

"Human Resources": [
"Recruitment",
"Employee Relations",
"HR Policies",
"Performance Management",
"Conflict Resolution",
"Training & Development",
"Payroll Management",
"Communication",
"Labor Laws",
"Talent Management"
],

"Operations Management": [
"Supply Chain",
"Process Optimization",
"Inventory Management",
"Logistics",
"Quality Management",
"Project Management",
"Lean Operations",
"Data Analysis",
"Production Planning",
"Cost Control"
],

"Supply Chain Management": [
"Logistics",
"Inventory Planning",
"Procurement",
"Demand Forecasting",
"Supplier Management",
"Transportation",
"Supply Chain Analytics",
"Operations",
"Warehouse Management",
"Distribution"
],


// Creative Fields

"Graphic Design": [
"Photoshop",
"Illustrator",
"Typography",
"Branding",
"Color Theory",
"Layout Design",
"Creative Thinking",
"Visual Communication",
"Design Software",
"Portfolio Projects"
],

"Content Creation": [
"Storytelling",
"Video Production",
"Editing",
"Social Media",
"Content Strategy",
"Audience Engagement",
"Brand Building",
"SEO Basics",
"Script Writing",
"Content Planning"
],

"Video Editing": [
"Premiere Pro",
"After Effects",
"Color Grading",
"Storytelling",
"Motion Graphics",
"Sound Editing",
"Video Production",
"Editing Techniques",
"Creative Editing",
"Portfolio Projects"
],

"Animation": [
"2D Animation",
"3D Animation",
"Storyboarding",
"Character Design",
"Motion Graphics",
"Animation Software",
"Creative Storytelling",
"Rendering",
"Visual Effects",
"Portfolio Projects"
],

"Photography": [
"Camera Techniques",
"Lighting",
"Photo Editing",
"Composition",
"Adobe Lightroom",
"Adobe Photoshop",
"Creative Direction",
"Visual Storytelling",
"Portfolio Building",
"Studio Setup"
],


// Professional Fields

"Healthcare & Medicine": [
"Biology",
"Human Anatomy",
"Medical Terminology",
"Patient Care",
"Clinical Knowledge",
"Diagnosis",
"Pharmacology",
"Medical Ethics",
"Healthcare Systems",
"Research"
],

"Law": [
"Legal Research",
"Constitutional Law",
"Drafting",
"Court Procedures",
"Case Analysis",
"Legal Writing",
"Public Speaking",
"Negotiation",
"Legal Ethics",
"Litigation"
],

"Education": [
"Subject Knowledge",
"Teaching Methods",
"Communication",
"Classroom Management",
"Curriculum Design",
"Assessment Methods",
"Educational Psychology",
"Technology in Education",
"Lesson Planning",
"Student Engagement"
],

"Research & Academia": [
"Research Methodology",
"Academic Writing",
"Statistics",
"Literature Review",
"Data Analysis",
"Critical Thinking",
"Scientific Communication",
"Publication Writing",
"Experiment Design",
"Peer Review"
],

"Government Services": [
"Public Administration",
"Policy Analysis",
"Law Basics",
"Governance",
"Communication",
"Leadership",
"Decision Making",
"Public Speaking",
"Economics",
"General Studies"
],


// Emerging Fields

"Environmental Science": [
"Ecology",
"Climate Studies",
"Sustainability",
"Research Methods",
"Environmental Policy",
"Data Analysis",
"Field Research",
"Environmental Impact Assessment",
"Conservation",
"Scientific Reporting"
],

"Renewable Energy": [
"Solar Energy",
"Wind Energy",
"Energy Systems",
"Electrical Basics",
"Sustainability",
"Energy Storage",
"Power Electronics",
"Grid Systems",
"Energy Policy",
"Green Technology"
],

"Agriculture Technology": [
"Precision Farming",
"Agricultural Sensors",
"IoT in Agriculture",
"Crop Monitoring",
"Soil Analysis",
"Agricultural Data Analysis",
"Farm Automation",
"Sustainable Farming",
"Agriculture Equipment",
"Agricultural Research"
],

"Space & Astronomy": [
"Astrophysics",
"Orbital Mechanics",
"Rocket Science",
"Space Systems",
"Satellite Technology",
"Navigation Systems",
"Data Analysis",
"Simulation",
"Scientific Research",
"Astronomy Tools"
],

"Sports & Fitness": [
"Exercise Science",
"Nutrition",
"Fitness Training",
"Strength Training",
"Injury Prevention",
"Coaching",
"Sports Psychology",
"Fitness Programming",
"Physical Conditioning",
"Health Monitoring"
]

};

// ===============================
// SKILL SYNONYMS
// ===============================

export const skillSynonyms = {

"Programming": ["c", "c++", "java", "python", "coding"],

"Embedded Systems": ["embedded", "arduino", "raspberry pi"],

"Microcontrollers": ["microcontroller", "8051", "esp32"],

"Sensors": ["sensor", "temperature sensor"],

"Networking": ["network", "tcp/ip"],

"IoT Projects": ["iot project", "iot"],

"SQL": ["mysql", "postgresql", "database"],

"Git": ["github", "gitlab"],

"Machine Learning": ["ml"],

"Data Structures": ["dsa"],

"Algorithms": ["algo"]

};

// ===============================
// NORMALIZE GOAL FUNCTION
// ===============================

export function normalizeGoal(goal) {

  if (!goal) return null;

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

  // fallback
  return "Software Development";

}