import { useState, useEffect } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

export default function Profile() {

const [profile,setProfile] = useState(null)
const [edit,setEdit] = useState(false)

/* Profile */

const [name,setName] = useState("")
const [role,setRole] = useState("Fresher")
const [careerGoal,setCareerGoal] = useState("")
const [photo,setPhoto] = useState(null)

/* Project */

const [projectTitle,setProjectTitle] = useState("")
const [projectType,setProjectType] = useState("software")
const [projectLink,setProjectLink] = useState("")
const [projectFile,setProjectFile] = useState(null)



/* ================= GET PROFILE ================= */

const getProfile = async ()=>{

try{

const res = await api.get("/profile")

setProfile(res.data)

setName(res.data?.name || "")
setRole(res.data?.role || "Fresher")
setCareerGoal(res.data?.careerGoal || "")

}catch(err){

console.log("Profile Fetch Error",err)

}

}



/* ================= SAVE PROFILE ================= */

const saveProfile = async ()=>{

try{

await api.put("/profile/update-profile",{
name: name || "",
role: role || "Fresher",
careerGoal: careerGoal || ""
})

if(photo){

const formData = new FormData()
formData.append("file",photo)

await api.post("/profile/upload-photo",formData)

}

alert("Profile Updated")

setEdit(false)

getProfile()

}catch(err){

console.log("Save Error",err)

alert("Save failed")

}

}



/* ================= ADD PROJECT ================= */

const addProject = async ()=>{

try{

const formData = new FormData()

formData.append("title",projectTitle || "")
formData.append("type",projectType || "software")

if(projectType === "software"){
formData.append("link",projectLink || "")
}

if(projectType === "hardware" && projectFile){
formData.append("file",projectFile)
}

await api.post("/profile/add-project",formData)

setProjectTitle("")
setProjectLink("")
setProjectFile(null)

getProfile()

}catch(err){

console.log("Project Error",err)

}

}



/* ================= DELETE PROJECT ================= */

const deleteProject = async(index)=>{

try{

await api.delete(`/profile/delete-project/${index}`)

getProfile()

}catch(err){

console.log("Delete Error",err)

}

}


useEffect(()=>{
getProfile()
},[])



return(

<div className="min-h-screen bg-[#020617] text-white">

<Navbar/>

<div className="max-w-6xl mx-auto p-6">


{/* ================= PROFILE ================= */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl mb-6">

<div className="flex justify-between items-center">

<div className="flex gap-6 items-center">


{/* IMAGE */}

<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500">

<img
src={
profile?.profilePhoto
? `http://localhost:5000${profile.profilePhoto}`
: "https://via.placeholder.com/150"
}
className="w-full h-full object-cover"
/>

</div>


{/* DETAILS */}

<div>

{edit ? (

<input
value={name || ""}
onChange={(e)=>setName(e.target.value)}
className="bg-[#020617] border p-2 rounded mb-2"
/>

):( 

<h2 className="text-2xl font-bold">
{name || "Thiresh"}
</h2>

)}


{/* ROLE */}

{edit ? (

<select
value={role || "Fresher"}
onChange={(e)=>setRole(e.target.value)}
className="bg-[#020617] border p-2 rounded mb-2"
>

<option>Fresher</option>
<option>Student</option>
<option>Working Professional</option>
<option>College Student</option>
<option>Final Year Student</option>
<option>Job Seeker</option>

</select>

):( 

<p className="text-gray-400">
{role}
</p>

)}


/* CAREER GOAL */

<p className="text-yellow-400 text-lg">
{careerGoal}
</p>


{edit && (

<input
type="file"
onChange={(e)=>setPhoto(e.target.files[0] || null)}
className="mt-2"
/>

)}

</div>

</div>


{/* BUTTON */}

<div>

{edit ? (

<button
onClick={saveProfile}
className="bg-green-500 px-6 py-2 rounded-lg"
>
Save Changes
</button>

):( 

<button
onClick={()=>setEdit(true)}
className="bg-blue-500 px-6 py-2 rounded-lg"
>
Edit Profile
</button>

)}

</div>

</div>

</div>



{/* ================= ROADMAP ================= */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl mb-6">

<h2 className="text-lg font-semibold mb-3">
Learning Roadmap
</h2>

<p>
Goal: {careerGoal}
</p>

<p>
Progress: {profile?.stats?.progressPercent || 0}%
</p>

</div>



{/* ================= PROJECT ================= */}

<div className="bg-gradient-to-r from-[#0b1324] to-[#16213e] p-6 rounded-xl">

<h2 className="text-lg font-semibold mb-4">
My Projects
</h2>


{/* PROJECT LIST */}

{profile?.projects?.map((project,index)=>(

<div
key={index}
className="flex justify-between bg-[#1e293b] p-3 rounded mb-2"
>

<p>{project.title}</p>

<div className="flex gap-3">

{project.link && (

<a
href={project.link}
target="_blank"
className="text-blue-400"
>
View
</a>

)}

{project.file && (

<a
href={`http://localhost:5000${project.file}`}
target="_blank"
className="text-blue-400"
>
View File
</a>

)}

<button
onClick={()=>deleteProject(index)}
className="bg-red-500 px-3 rounded"
>
Delete
</button>

</div>

</div>

))}



{/* ADD PROJECT */}

<input
placeholder="Project Title"
value={projectTitle || ""}
onChange={(e)=>setProjectTitle(e.target.value)}
className="w-full p-2 rounded bg-[#020617] border mt-4"
/>


<select
value={projectType}
onChange={(e)=>setProjectType(e.target.value)}
className="w-full p-2 rounded bg-[#020617] border mt-2"
>

<option value="software">
Software Project
</option>

<option value="hardware">
Hardware Project
</option>

</select>


{projectType === "software" ? (

<input
placeholder="Project Link"
value={projectLink || ""}
onChange={(e)=>setProjectLink(e.target.value)}
className="w-full p-2 rounded bg-[#020617] border mt-2"
/>

):( 

<input
type="file"
onChange={(e)=>setProjectFile(e.target.files[0] || null)}
className="mt-2"
/>

)}


<button
onClick={addProject}
className="bg-green-500 px-6 py-2 rounded mt-3"
>
Add Project
</button>


</div>


</div>

</div>

)

}