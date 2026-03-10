import { useState } from "react";
import axios from "axios";

export default function ResumeBuilder(){

const [resume,setResume] = useState(null);

const generateResume = async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/resume"
);

setResume(res.data);

}catch(err){

console.log(err);

}

};

return(

<div style={{padding:"20px"}}>

<h2>Resume Builder</h2>

<button onClick={generateResume}>
Generate Resume
</button>

{resume && (

<div style={{marginTop:"20px"}}>

<h3>{resume.name}</h3>

<h4>Skills</h4>
<ul>
{resume.skills.map((s,i)=>(
<li key={i}>{s}</li>
))}
</ul>

<h4>Projects</h4>
<ul>
{resume.projects.map((p,i)=>(
<li key={i}>{p.title}</li>
))}
</ul>

</div>

)}

</div>

)

}
