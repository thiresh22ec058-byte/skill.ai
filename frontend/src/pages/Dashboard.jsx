import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard(){

const [resumeText,setResumeText] = useState("");
const [skills,setSkills] = useState([]);
const [career,setCareer] = useState("Not analyzed yet");

const [skillRadar,setSkillRadar] = useState({
AI:0,
Web:0,
IoT:0,
Business:0,
Programming:0
});

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState(null);



/* -------- Upload Resume -------- */

const handleUpload = async (e)=>{

const file = e.target.files[0];
if(!file) return;

const text = await file.text();
setResumeText(text);

};



/* -------- Analyze Resume -------- */

const analyzeResume = ()=>{

if(!resumeText){
alert("Upload resume first");
return;
}

const text = resumeText.toLowerCase();

/* Skill Database */

const skillDB = [
"python","java","javascript","react","node","mongodb","sql",
"html","css","git","docker","aws",
"machine learning","tensorflow","data science","data analysis",
"c","c++","embedded systems","iot","arduino","raspberry pi","lora",
"chatgpt","prompt engineering",
"leadership","management","problem solving",
"stock market","business"
];


/* Detect Skills */

const detectedSkills = skillDB.filter(skill =>
text.includes(skill)
);

setSkills(detectedSkills);


/* Radar Categories */

let radar = {
AI:0,
Web:0,
IoT:0,
Business:0,
Programming:0
};


detectedSkills.forEach(skill=>{

if(["machine learning","tensorflow","data science","chatgpt","prompt engineering"].includes(skill))
radar.AI++;

if(["html","css","javascript","react","node","mongodb"].includes(skill))
radar.Web++;

if(["iot","embedded systems","arduino","raspberry pi","lora"].includes(skill))
radar.IoT++;

if(["business","management","leadership","stock market"].includes(skill))
radar.Business++;

if(["python","java","c","c++"].includes(skill))
radar.Programming++;

});

setSkillRadar(radar);


/* Career Match */

let matchedCareer = "General Engineer";

if(radar.IoT >= 2)
matchedCareer = "IoT Engineer";

else if(radar.AI >= 2)
matchedCareer = "AI Engineer";

else if(radar.Web >= 2)
matchedCareer = "Full Stack Developer";

else if(radar.Business >= 2)
matchedCareer = "Business Analyst";

else if(radar.Programming >= 2)
matchedCareer = "Software Developer";

setCareer(matchedCareer);

};



/* -------- AI Assistant -------- */

const askAI = ()=>{

const q = question.toLowerCase();

if(q.includes("ai engineer")){

setAnswer({
title:"AI Engineer Career",

description:"AI Engineers build intelligent systems using machine learning and deep learning."
});

}

else{

setAnswer({
title:"Career Advice",

description:"Focus on building strong projects and mastering core skills."
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

<ul className="text-gray-300">

<li>AI: {skillRadar.AI}</li>
<li>Web: {skillRadar.Web}</li>
<li>IoT: {skillRadar.IoT}</li>
<li>Business: {skillRadar.Business}</li>
<li>Programming: {skillRadar.Programming}</li>

</ul>

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