import {
Chart as ChartJS,
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
RadialLinearScale,
PointElement,
LineElement,
Filler,
Tooltip,
Legend
);

export default function SkillRadar({ skills }) {

const data = {
labels: skills,

datasets: [
{
label: "Skill Strength",
data: skills.map(() => Math.floor(Math.random()*100)),
backgroundColor: "rgba(54,162,235,0.2)",
borderColor: "rgba(54,162,235,1)",
borderWidth: 2
}
]
};

return <Radar data={data} />;
}