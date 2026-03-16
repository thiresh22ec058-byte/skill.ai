const express = require("express");
const router = express.Router();
const pdfParse = require("pdf-parse");

const skillDB = [
"python","java","javascript","react","node","express","mongodb","sql",
"html","css","bootstrap","tailwind","nextjs","typescript",
"machine learning","deep learning","data science","tensorflow","pytorch",
"nlp","computer vision","pandas","numpy","matplotlib","scikit-learn",
"aws","azure","gcp","docker","kubernetes","linux","git",
"rest api","graphql","microservices","system design",
"android","flutter","swift","kotlin",
"power bi","tableau","excel","data analysis",
"cybersecurity","network security","ethical hacking",
"devops","ci/cd","jenkins","terraform"
];

router.post("/analyze-resume", async (req,res)=>{

try{

const buffer = req.files.resume.data;

const data = await pdfParse(buffer);

const text = data.text.toLowerCase();

const detectedSkills = skillDB.filter(skill =>
text.includes(skill)
);

let career = "General Software Engineer";

if(detectedSkills.includes("machine learning"))
career = "AI Engineer";

else if(detectedSkills.includes("react") || detectedSkills.includes("node"))
career = "Full Stack Developer";

else if(detectedSkills.includes("data science"))
career = "Data Scientist";

else if(detectedSkills.includes("docker"))
career = "DevOps Engineer";

else if(detectedSkills.includes("cybersecurity"))
career = "Cybersecurity Engineer";

res.json({
skills: detectedSkills,
career
});

}catch(err){

console.log(err);
res.status(500).json({error:"Resume analysis failed"});

}

});

module.exports = router;