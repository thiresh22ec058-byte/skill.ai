import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard(){

const [resumeText,setResumeText] = useState("");
const [skills,setSkills] = useState([]);
const [career,setCareer] = useState("Not analyzed yet");

const [question,setQuestion] = useState("");
const [answer,setAnswer] = useState(null);



/* -------- Resume Upload -------- */

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

const skillDB=[
"python","java","javascript","react","node",
"sql","machine learning","data science",
"tensorflow","docker","aws","html","css"
];

const detected = skillDB.filter(skill =>
resumeText.toLowerCase().includes(skill)
);

setSkills(detected);


/* Career detection */

if(detected.includes("machine learning"))
setCareer("AI Engineer");

else if(detected.includes("react") || detected.includes("javascript"))
setCareer("Software Developer");

else if(detected.includes("data science"))
setCareer("Data Scientist");

else
setCareer("General Software Engineer");

};



/* -------- AI Assistant -------- */

const askAI = ()=>{

const q = question.toLowerCase();

if(q.includes("ai engineer")){

setAnswer({
title:"AI Engineer Career Analysis",

description:
"AI Engineers design intelligent systems that learn from data. The field combines programming, mathematics, and machine learning.",

skills:[
"Python programming",
"Machine Learning algorithms",
"Deep Learning frameworks",
"Data processing",
"Model deployment"
],

projects:[
"AI chatbot",
"Image recognition system",
"Recommendation engine",
"AI-powered web application"
],

tips:[
"Master Python first",
"Focus on building real AI models",
"Learn TensorFlow or PyTorch",
"Study mathematics for machine learning"
]

});

}



else if(q.includes("software")){

setAnswer({
title:"Software Developer Career Analysis",

description:
"Software Developers build scalable applications used by millions of users. This role focuses on coding, architecture, and solving technical problems.",

skills:[
"JavaScript or Python",
"Data Structures",
"Frontend frameworks (React)",
"Backend development",
"System design"
],

projects:[
"Portfolio website",
"Full stack web app",
"REST API backend",
"SaaS style application"
],

tips:[
"Practice coding problems daily",
"Build 3 strong portfolio projects",
"Learn Git and collaboration tools",
"Understand how large systems scale"
]

});

}



else{

setAnswer({
title:"AI Career Insight",

description:
"Technology careers reward strong problem solving and practical experience. Focus on mastering fundamentals and building projects.",

skills:[
"Programming fundamentals",
"Algorithms",
"Framework expertise"
],

projects:[
"Build portfolio projects",
"Deploy apps to cloud"
],

tips:[
"Consistency beats intensity",
"Projects matter more than certificates"
]

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



{/* Skills */}

<div className="grid md:grid-cols-3 gap-6 mb-6">

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



<div className="bg-[#111827] p-6 rounded-xl">

<h3 className="text-cyan-300 font-semibold mb-2">
Skill Radar
</h3>

<p className="text-gray-400">
AI visualization coming soon
</p>

</div>



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

<p className="text-gray-300 mb-4">
{answer.description}
</p>

<h4 className="text-green-400 mb-2">Key Skills</h4>

<ul className="list-disc pl-6 mb-4">
{answer.skills.map((s,i)=>(<li key={i}>{s}</li>))}
</ul>

<h4 className="text-blue-400 mb-2">Recommended Projects</h4>

<ul className="list-disc pl-6 mb-4">
{answer.projects.map((p,i)=>(<li key={i}>{p}</li>))}
</ul>

<h4 className="text-yellow-400 mb-2">AI Suggestions</h4>

<ul className="list-disc pl-6">
{answer.tips.map((t,i)=>(<li key={i}>{t}</li>))}
</ul>

</div>

)}

</div>



</div>
</div>

);

}