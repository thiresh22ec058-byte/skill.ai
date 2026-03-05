import Career from "../models/Career.js";

export async function matchCareers(userSkills) {

  const careers = await Career.find();

  const results = careers.map((career) => {

    const requiredSkills = career.requiredSkills.map(skill =>
      skill.toLowerCase()
    );

    const matchedSkills = requiredSkills.filter(skill =>
      userSkills.includes(skill)
    );

    const matchScore = Math.round(
      (matchedSkills.length / requiredSkills.length) * 100
    );

    return {
      _id: career._id,
      title: career.title,
      domain: career.domain,
      description: career.description,
      requiredSkills: career.requiredSkills,
      matchScore,
      roadmap: career.roadmap
    };
  });

  // sort careers by highest match
  results.sort((a, b) => b.matchScore - a.matchScore);

  return results;
}

return results
  .sort((a,b)=>b.matchScore-a.matchScore)
  .slice(0,5);
  