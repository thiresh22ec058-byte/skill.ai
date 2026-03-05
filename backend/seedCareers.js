import mongoose from "mongoose";
import dotenv from "dotenv";
import Career from "./models/Career.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB Connected");

/* DELETE OLD CAREERS */

await Career.deleteMany({});

/* CAREER LIST */

const careerTitles = [

"Full Stack Developer",
"Frontend Developer",
"Backend Developer",
"DevOps Engineer",
"Cloud Engineer",
"Software Engineer",
"Mobile App Developer",
"Game Developer",
"Embedded Systems Engineer",
"Data Scientist",
"Data Analyst",
"Machine Learning Engineer",
"AI Engineer",
"NLP Engineer",
"Computer Vision Engineer",
"Cybersecurity Analyst",
"Ethical Hacker",
"Security Engineer",
"Penetration Tester",
"Blockchain Developer",
"Smart Contract Developer",
"Web3 Developer",
"UI UX Designer",
"Product Designer",
"QA Engineer",
"Automation Tester",
"Site Reliability Engineer",
"System Architect",
"Solutions Architect",
"Database Administrator",
"Big Data Engineer",
"AR VR Developer",
"IoT Engineer",
"Robotics Engineer",
"Digital Marketing Specialist",
"SEO Specialist",
"Technical Writer",
"IT Support Engineer",
"Network Engineer",
"Cloud Architect",
"AWS Engineer",
"Azure Engineer",
"GCP Engineer",
"Kubernetes Engineer",
"Linux Engineer",
"Android Developer",
"iOS Developer",
"Unity Developer",
"React Native Developer",
"Flutter Developer"

];

/* GENERATE CAREER DATA */

const careers = careerTitles.map((title,index)=>({

title,

domain:"Technology",

description:`Career path for ${title}`,

requiredSkills:[
"programming",
"problem solving",
"algorithms",
"git",
"title specific skill"
],

roadmap:[

{
phase:1,
name:"Foundations",
duration:"4 weeks",
playlist:"https://www.youtube.com/playlist?list=PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88"
},

{
phase:2,
name:"Intermediate Skills",
duration:"4 weeks",
playlist:"https://www.youtube.com/playlist?list=PLZyvi_9gamL-EE3zQJbU5N9aL6YhY6z5V"
},

{
phase:3,
name:"Advanced Concepts",
duration:"4 weeks",
playlist:"https://www.youtube.com/playlist?list=PL-osiE80TeTt2d9bfVyTiXJA-UTHn6WwU"
},

{
phase:4,
name:"Projects + Portfolio",
duration:"4 weeks",
playlist:"https://www.youtube.com/playlist?list=PLWKjhJtqVAbl3BU1W4j7F7N0h6bYv4Pp0"
}

]

}));

/* INSERT CAREERS */

await Career.insertMany(careers);

console.log("50 Careers inserted successfully");

process.exit();