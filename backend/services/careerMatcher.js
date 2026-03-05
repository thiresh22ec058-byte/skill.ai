import Career from "../models/Career.js";

/*
Career Matching Algorithm
Matches detected skills with required career skills
*/

export async function matchCareers(userSkills) {

  const careers = await Career.find();

  const results = [];

  for (const career of careers) {

    const required = career.requiredSkills.map(s => s.toLowerCase());

    let matched = 0;

    for (const skill of userSkills) {

      if (required.includes(skill.toLowerCase())) {
        matched++;
      }

    }

    const score = Math.round((matched / required.length) * 100);

    results.push({
      title: career.title,
      domain: career.domain,
      description: career.description,
      requiredSkills: career.requiredSkills,
      roadmap: career.roadmap,
      score
    });

  }

  // Sort by highest score
  results.sort((a, b) => b.score - a.score);

  return results;

}