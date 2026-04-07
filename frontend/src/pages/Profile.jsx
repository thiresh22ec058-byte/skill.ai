import { useState, useEffect } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function Profile() {

const [profile,setProfile] = useState({})
const [edit,setEdit] = useState(false)

const [project,setProject] = useState({
title:"",
description:"",
link:"",
type:"software"
})


/* ================= GET PROFILE ================= */

const getProfile = async()=>{
try{
const res = await api.get("/profile")
setProfile(res.data)
}catch(err){
console.log(err)
}
}

useEffect(()=>{
getProfile()
},[])



/* ================= SAVE PROFILE ================= */

const saveProfile = async()=>{

try{

await api.put("/profile/update-profile",{
name: profile.name,
role: profile.role,
profilePhoto: profile.profilePhoto
})

setEdit(false)

getProfile()

}catch(err){
console.log(err)
}

}



/* ================= UPLOAD PHOTO ================= */

const uploadPhoto = async(e)=>{

const file = e.target.files[0]

if(!file) return

const formData = new FormData()
formData.append("file",file)

try{

await api.post("/profile/upload-photo",formData)

getProfile()

}catch(err){
console.log(err)
}

}



/* ================= ADD PROJECT ================= */

const addProject = async()=>{

if(!project.title) return

try{

const formData = new FormData()

formData.append("title",project.title)
formData.append("type",project.type)
formData.append("link",project.link)

if(project.file){
formData.append("file",project.file)
}

await api.post("/profile/add-project",formData)

setProject({
title:"",
description:"",
link:"",
type:"software",
file:null
})

getProfile()

}catch(err){
console.log(err)
}

}



/* ================= DELETE PROJECT ================= */

const deleteProject = async(index)=>{

try{

await api.delete(`/profile/delete-project/${index}`)

getProfile()

}catch(err){
console.log(err)
}

}



return(

<div className="min-h-screen bg-[#020617] text-white">

<Navbar/>

<div className="max-w-6xl mx-auto p-6">

{/* PROFILE */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl mb-6">

<div className="flex items-center justify-between">

<div className="flex items-center gap-6">

<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500">

<img
src={profile?.profilePhoto || "https://via.placeholder.com/150"}
className="w-full h-full object-cover"
/>

</div>

<div>

{edit ? (

<input
value={profile.name || ""}
onChange={(e)=>setProfile({...profile,name:e.target.value})}
className="bg-[#020617] border border-gray-700 p-2 rounded mb-2"
/>

):( 

<h2 className="text-2xl font-bold">
{profile?.name || "Thiresh"}
</h2>

)}

<p className="text-gray-400">
{profile?.role || "Fresher"}
</p>

<p className="text-yellow-400 text-lg">
{profile?.careerGoal || "Software Development"}
</p>

<input
type="file"
onChange={uploadPhoto}
className="mt-2"
/>

</div>

</div>


<div>

{edit ? (

<button
onClick={saveProfile}
className="bg-green-500 px-5 py-2 rounded-lg"
>
Save Changes
</button>

):( 

<button
onClick={()=>setEdit(true)}
className="bg-blue-500 px-5 py-2 rounded-lg"
>
Edit Profile
</button>

)}

</div>

</div>

</div>



{/* ROADMAP */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl mb-6">

<h2 className="text-lg font-semibold mb-3">
Learning Roadmap
</h2>

<p>
Goal: {profile?.careerGoal}
</p>

<p>
Progress: {profile?.stats?.progressPercent || 0}%
</p>

</div>



{/* PROJECT */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl">

<h2 className="text-lg font-semibold mb-4">
My Projects
</h2>

<input
placeholder="Project Title"
value={project.title}
onChange={(e)=>setProject({...project,title:e.target.value})}
className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3"
/>

<textarea
placeholder="Project Description"
value={project.description}
onChange={(e)=>setProject({...project,description:e.target.value})}
className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3"
/>

<input
placeholder="Project Link"
value={project.link}
onChange={(e)=>setProject({...project,link:e.target.value})}
className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3"
/>

<input
type="file"
onChange={(e)=>setProject({...project,file:e.target.files[0]})}
className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3"
/>


<select
value={project.type}
onChange={(e)=>setProject({...project,type:e.target.value})}
className="w-full p-3 rounded-lg bg-[#020617] border border-gray-700 mb-3"
>

<option value="software">Software</option>
<option value="hardware">Hardware</option>


</select>


<button
onClick={addProject}
className="bg-green-500 px-5 py-2 rounded-lg"
>
Add Project
</button>



{/* PROJECT LIST */}

<div className="mt-6 space-y-3">

{profile?.projects?.map((p,i)=>(

<div key={i} className="bg-[#020617] p-4 rounded-lg">

<h3 className="font-semibold text-lg">
{p.title}
</h3>

<p className="text-gray-400">
{p.description}
</p>

<p className="text-yellow-400">
{p.type}
</p>

<div className="flex gap-3 mt-2">

<a
href={p.link}
target="_blank"
className="bg-blue-500 px-3 py-1 rounded"
>
View
</a>

<button
onClick={()=>deleteProject(i)}
className="bg-red-500 px-3 py-1 rounded"
>
Delete
</button>

</div>

</div>

))}

</div>

</div>

</div>

</div>

)

}