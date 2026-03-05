export function extractSkills(resumeText) {

  const skillsDatabase = [
    "python",
    "java",
    "javascript",
    "html",
    "css",
    "react",
    "node",
    "node.js",
    "express",
    "mongodb",
    "sql",
    "machine learning",
    "tensorflow",
    "data analysis",
    "c++",
    "c",
    "git",
    "docker",
    "aws"
  ];

  const text = resumeText.toLowerCase();

  const detectedSkills = skillsDatabase.filter(skill =>
    text.includes(skill)
  );

  return detectedSkills;
}