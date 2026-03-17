import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard(){

const [resumeText,setResumeText] = useState("");
const [skills,setSkills] = useState([]);
const [career,setCareer] = useState("Not analyzed yet");

const [skillRadar,setSkillRadar] = useState(null);

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState(null);


/* -------- Upload Resume -------- */

const handleUpload = async (e) => {

  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function () {

    const typedarray = new Uint8Array(this.result);

    const pdf = await pdfjsLib.getDocument(typedarray).promise;

    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map(item => item.str).join(" ");
      fullText += pageText + " ";
    }

    // ✅ CLEAN TEXT (FIXED)
    const cleanedText = fullText
      .toLowerCase()
      .replace(/\n/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    setResumeText(cleanedText);

    // reset
    setSkills([]);
    setSkillRadar(null);
    setCareer("Not analyzed yet");

  };

  reader.readAsArrayBuffer(file);
};



/* -------- Analyze Resume -------- */

const analyzeResume = () => {

  if (!resumeText) {
    alert("Upload resume first");
    return;
  }

  const text = resumeText;

  /* ================= SKILL DATABASE ================= */

  const skillDB = {

    Programming: ["python","java","javascript","c","c++","sql","html","css"],

    Web: ["react","node","express","mongodb","frontend","backend"],

    AI: ["machine learning","deep learning","tensorflow","ai","nlp","chatgpt"],

    IoT: ["iot","embedded systems","arduino","raspberry","lora","sensors"],

    Business: ["management","leadership","finance","marketing","communication","reporting","customer"],

    Medical: ["anatomy","physiology","diagnosis","patient care","pharmacology"]

  };

  /* ================= DETECT SKILLS ================= */

  let detectedSkills = [];

  Object.values(skillDB).forEach(category=>{
    category.forEach(skill=>{

      // ✅ FIXED MATCHING (NO REGEX ISSUE)
      if(text.includes(skill)){
        detectedSkills.push(skill);
      }

    });
  });

  detectedSkills = [...new Set(detectedSkills)];
  setSkills(detectedSkills);


  /* ================= CATEGORY SCORING ================= */

  let scores = {
    Programming:0,
    Web:0,
    AI:0,
    IoT:0,
    Business:0,
    Medical:0
  };

  Object.keys(skillDB).forEach(category=>{
    skillDB[category].forEach(skill=>{

      // ✅ FIXED MATCHING
      if(text.includes(skill)){
        scores[category]++;
      }

    });
  });

  setSkillRadar(scores);


  /* ================= CAREER MATCH ================= */

  let careerResult = "No clear match";

  if(scores.AI > 0) careerResult = "AI Engineer";
  else if(scores.IoT > 0) careerResult = "IoT Engineer";
  else if(scores.Web > 0) careerResult = "Full Stack Developer";
  else if(scores.Programming > 0) careerResult = "Software Developer";
  else if(scores.Business > 0) careerResult = "Business / Operations Role";
  else if(scores.Medical > 0) careerResult = "Medical Professional";

  setCareer(careerResult);

};



/* -------- AI Assistant -------- */

const askAI = ()=>{

const q = question.toLowerCase();

if(q.includes("ai")){
setAnswer({
title:"AI Career",
description:"AI Engineers build intelligent systems using machine learning."
});
}else{
setAnswer({
title:"Career Advice",
description:"Focus on skills and real-world projects."
});
}

};



/* -------- UI -------- */

return(

<div className="min-h-screen bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e293b] text-white">

<Navbar/>

<div className="max-w-7xl mx-auto px-8 py-10">

<h1 className="text-3xl font-bold text-cyan-400 mb-8">
AI Career Dashboard
</h1>



{/* Resume Upload */}

<div className="bg-[#111827] p-6 rounded-xl mb-8">

<h2 className="text-xl font-semibold text-cyan-300 mb-3">
Upload Resume
</h2>

<input type="file" onChange={handleUpload}/>

<button
onClick={analyzeResume}
className="ml-4 px-4 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
>
Analyze Resume
</button>

<p className="text-gray-400 mt-2">
Upload your resume and click Analyze to detect skills.
</p>

</div>



{/* Dashboard Cards */}

<div className="grid md:grid-cols-3 gap-6 mb-6">

{/* Detected Skills */}

<div className="bg-[#111827] p-6 rounded-xl">

<h3 className="text-cyan-300 font-semibold mb-2">
Detected Skills
</h3>

{skills.length===0 ?(
<p className="text-gray-400">No skills detected</p>
):( 

<ul className="list-disc pl-5 text-gray-300">
{skills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

)}

</div>



{/* Skill Radar */}

<div className="bg-[#111827] p-6 rounded-xl">

<h3 className="text-cyan-300 font-semibold mb-2">
Skill Radar
</h3>

{!skillRadar ? (
  <p className="text-gray-400">Not analyzed yet</p>
) : (

  Object.entries(skillRadar).filter(([_,value])=>value>0).length === 0 ? (

    <p className="text-gray-400">No skills found</p>

  ) : (

    <ul className="text-gray-300">
      {Object.entries(skillRadar)
        .filter(([_,value])=>value>0)
        .map(([key,value])=>(
          <li key={key}>{key}: {value}</li>
      ))}
    </ul>

  )

)}

</div>



{/* Career Match */}

<div className="bg-[#111827] p-6 rounded-xl">

<h3 className="text-cyan-300 font-semibold mb-2">
Top Career Match
</h3>

<p className="text-green-400 font-semibold">
{career}
</p>

</div>

</div>



{/* AI Assistant */}

<div className="bg-[#111827] p-6 rounded-xl">

<h2 className="text-xl text-cyan-300 mb-4">
AI Career Assistant
</h2>

<div className="flex gap-3 mb-4">

<input
value={question}
onChange={(e)=>setQuestion(e.target.value)}
placeholder="Ask AI about careers..."
className="flex-1 px-4 py-2 bg-[#020617] border border-gray-700 rounded-lg"
/>

<button
onClick={askAI}
className="px-5 py-2 bg-cyan-500 rounded-lg hover:bg-cyan-600"
>
Analyze
</button>

</div>

{answer &&(

<div className="bg-[#020617] border border-gray-700 rounded-lg p-5">

<h3 className="text-cyan-400 text-lg font-semibold mb-2">
{answer.title}
</h3>

<p className="text-gray-300">
{answer.description}
</p>

</div>

)}

</div>

</div>
</div>

);

}