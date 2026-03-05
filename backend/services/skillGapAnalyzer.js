export function findSkillGap(userSkills, career) {

  if (!career || !career.requiredSkills) {
    return [];
  }

  const requiredSkills = career.requiredSkills.map(skill =>
    skill.toLowerCase()
  );

  const missingSkills = requiredSkills.filter(skill =>
    !userSkills.includes(skill)
  );

  return missingSkills;
}