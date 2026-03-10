import { useState,useEffect } from "react";
import axios from "axios";

export default function SkillGap(){

const [gaps,setGaps] = useState([]);

useEffect(()=>{

fetchGaps();

},[]);

const fetchGaps = async ()=>{

try{

const res = await axios.get(
"http://localhost:5000/api/skill-gap"
);

setGaps(res.data.skillGaps);

}catch(err){

console.log(err);

}

};

return(

<div style={{padding:"20px"}}>

<h2>Skill Gap Analysis</h2>

<ul>
{gaps.map((g,i)=>(
<li key={i}>{g}</li>
))}
</ul>

</div>

)

}
