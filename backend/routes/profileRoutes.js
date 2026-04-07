import express from "express"
import multer from "multer"
import Profile from "../models/Profile.js"

const router = express.Router()

/* ================= MULTER ================= */

const storage = multer.diskStorage({
destination:(req,file,cb)=>{
cb(null,"uploads/")
},
filename:(req,file,cb)=>{
cb(null,Date.now()+"-"+file.originalname)
}
})

const upload = multer({storage})


/* ================= GET PROFILE ================= */

router.get("/",async(req,res)=>{

try{

let profile = await Profile.findOne()

if(!profile){

profile = await Profile.create({
name:"Thiresh",
experience:"Fresher",
goal:"Software Development",
projects:[]
})

}

res.json(profile)

}catch(err){
res.status(500).json(err)
}

})


/* ================= UPDATE PROFILE ================= */

router.post("/update",async(req,res)=>{

try{

const profile = await Profile.findOneAndUpdate(
{},
req.body,
{new:true}
)

res.json(profile)

}catch(err){
res.status(500).json(err)
}

})


/* ================= UPLOAD PHOTO ================= */

router.post("/upload-photo",upload.single("photo"),async(req,res)=>{

try{

const photo = req.file.filename

const profile = await Profile.findOneAndUpdate(
{},
{photo},
{new:true}
)

res.json(profile)

}catch(err){
res.status(500).json(err)
}

})



/* ================= ADD PROJECT ================= */

router.post("/add-project",async(req,res)=>{

try{

const profile = await Profile.findOne()

profile.projects.push(req.body)

await profile.save()

res.json(profile)

}catch(err){
res.status(500).json(err)
}

})



/* ================= DELETE PROJECT ================= */

router.delete("/delete-project/:id",async(req,res)=>{

try{

const profile = await Profile.findOne()

profile.projects = profile.projects.filter(
p=>p._id.toString() !== req.params.id
)

await profile.save()

res.json(profile)

}catch(err){
res.status(500).json(err)
}

})

export default router