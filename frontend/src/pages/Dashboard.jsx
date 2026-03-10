import { useState } from "react";
import api from "../utils/api";
import SkillRadar from "../components/SkillRadar";
import Navbar from "../components/Navbar";

export default function Dashboard() {

const [data,setData] = useState(null);

/* ================= RESUME UPLOAD ================= */

const uploadResume = async (file)=>{

if(!file) return;

try{

const formData = new FormData();
formData.append("resume",file);

const res = await api.post(
"/ai/analyze-resume",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

setData(res.data);

}catch(err){

console.error("Resume upload error:",err);
alert("Resume analysis failed");

}

};

/* ================= MARK PHASE COMPLETE ================= */

const markComplete = async (phase)=>{

try{

await api.post(
"/progress/update",
{
career:data?.bestCareer?.title,
phase:phase,
status:"completed"
}
);

alert("Phase completed successfully");

}catch(err){

console.log("Progress update error:",err);

}

};

/* ================= STYLES ================= */

const card = {
background:"rgba(255,255,255,0.05)",
padding:"20px",
borderRadius:"12px",
marginBottom:"20px",
backdropFilter:"blur(10px)"
};

const title = {
marginBottom:"10px",
fontSize:"20px",
fontWeight:"600"
};

/* ================= UI ================= */

return(

<>

<Navbar/>

<div
style={{
maxWidth:"1200px",
margin:"auto",
padding:"40px 20px",
color:"white"
}}
>

<h1 style={{marginBottom:"30px"}}>
AI Career Dashboard
</h1>

{/* ================= RESUME UPLOAD ================= */}

<div style={card}>

<h2 style={title}>Upload Resume</h2>

<input
type="file"
onChange={(e)=>uploadResume(e.target.files[0])}
/>

<p style={{marginTop:"10px",opacity:0.7}}>
Upload your resume to get skill analysis, career recommendations,
skill gaps and a personalized learning roadmap.
</p>

</div>

{/* ================= EMPTY STATE ================= */}

{!data && (

<div style={{opacity:0.7}}>
Upload a resume to see your AI career analysis.
</div>

)}

{/* ================= DASHBOARD GRID ================= */}

{data && (

<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",
gap:"25px",
marginTop:"20px"
}}
>

{/* ================= DETECTED SKILLS ================= */}

<div style={card}>

<h3 style={title}>Detected Skills</h3>

{data?.detectedSkills?.length > 0 ? (

<ul>
{data.detectedSkills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

) : (

<p>No skills detected</p>

)}

</div>

{/* ================= SKILL RADAR ================= */}

<div style={card}>

<h3 style={title}>Skill Radar</h3>

<SkillRadar skills={data?.detectedSkills || []} />

</div>

{/* ================= CAREER MATCHES ================= */}

<div style={card}>

<h3 style={title}>Top Career Matches</h3>

{data?.matchedCareers?.length > 0 ? (

<ul>
{data.matchedCareers.slice(0,3).map((c,i)=>(
<li key={i}>
{c.title} — {c.score}%
</li>
))}
</ul>

) : (

<p>No career matches found</p>

)}

</div>

{/* ================= RECOMMENDED CAREER ================= */}

<div style={card}>

<h3 style={title}>Recommended Career</h3>

<p style={{fontSize:"18px"}}>
{data?.bestCareer?.title || "Not available"}
</p>

</div>

{/* ================= SKILL GAPS ================= */}

<div style={card}>

<h3 style={title}>Skill Gaps</h3>

{data?.skillGaps?.length > 0 ? (

<ul>
{data.skillGaps.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

) : (

<p>No skill gaps detected</p>

)}

</div>

</div>

)}

{/* ================= ROADMAP ================= */}

{data?.roadmap?.length > 0 && (

<div style={{marginTop:"40px"}}>

<h2 style={{marginBottom:"20px"}}>
Learning Roadmap
</h2>

{data.roadmap.map((r)=>(
<div
key={r.phase}
style={{
border:"1px solid rgba(255,255,255,0.15)",
padding:"20px",
marginBottom:"20px",
borderRadius:"10px",
background:"rgba(255,255,255,0.03)"
}}
>

<h3>{r.name}</h3>

<p>Duration: {r.duration}</p>

<a
href={r.playlist}
target="_blank"
rel="noreferrer"
style={{color:"#38bdf8"}}
>
Watch Course
</a>

<br/><br/>

<button
onClick={()=>markComplete(r.phase)}
style={{
background:"#22c55e",
border:"none",
padding:"8px 15px",
borderRadius:"6px",
cursor:"pointer"
}}
>
Mark Complete
</button>

</div>
))}

</div>

)}

</div>

</>

);

}