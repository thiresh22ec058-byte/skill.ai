import { useState } from "react";
import axios from "axios";
import SkillRadar from "../components/SkillRadar";

export default function Dashboard() {

const [data,setData] = useState(null);

/* ================= RESUME UPLOAD ================= */

const uploadResume = async (file)=>{

const formData = new FormData();

formData.append("resume",file);

const res = await axios.post(
"http://localhost:5000/api/ai/analyze-resume",
formData
);

setData(res.data);

};

/* ================= MARK PHASE COMPLETE ================= */

const markComplete = async (phase)=>{

try{

await axios.post(
"http://localhost:5000/api/progress/update",
{
userId:"123",
career:data.bestCareer.title,
phase:phase,
status:"completed"
}
);

alert("Phase completed successfully");

}catch(err){

console.log(err);

}

};

/* ================= UI ================= */

return(

<div style={{padding:"20px"}}>

<h2>Upload Resume</h2>

<input
type="file"
onChange={(e)=>uploadResume(e.target.files[0])}
/>

{data && (

<div style={{marginTop:"30px"}}>

{/* DETECTED SKILLS */}

<h3>Detected Skills</h3>

<ul>
{data.detectedSkills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

<h3>Skill Radar</h3>

<SkillRadar skills={data.detectedSkills} />

{/* BEST CAREER */}

<h3>Top Career Matches</h3>

<ul>
{data.matchedCareers.slice(0,3).map((c,i)=>(
<li key={i}>
{c.title} — {c.score}%
</li>
))}
</ul>

<h3>Recommended Career</h3>
<p>{data.bestCareer.title}</p>

{/* SKILL GAPS */}

<h3>Skill Gaps</h3>

<ul>
{data.skillGaps.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

{/* ROADMAP */}

<h3>Learning Roadmap</h3>

{data.roadmap.map((r)=>(

<div
key={r.phase}
style={{
border:"1px solid #ccc",
padding:"10px",
marginBottom:"10px",
borderRadius:"6px"
}}
>

<h4>{r.name}</h4>

<p>Duration: {r.duration}</p>

<a
href={r.playlist}
target="_blank"
rel="noreferrer"
>

Watch Course

</a>

<br/><br/>

<button onClick={()=>markComplete(r.phase)}>

Mark Complete

</button>

</div>

))}

</div>

)}

</div>

)

}