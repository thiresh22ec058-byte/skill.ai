import { domainJobs } from "../config/domainJobs.js";

export const getRecommendedJobs = (goal, readiness = 0) => {

  const jobs = domainJobs[goal] || [];

  if (jobs.length === 0) return [];

  // Beginner
  if (readiness < 30) {
    return jobs.filter(job =>
      job.toLowerCase().includes("intern") ||
      job.toLowerCase().includes("trainee") ||
      job.toLowerCase().includes("assistant")
    );
  }

  // Junior
  if (readiness < 60) {
    return jobs.filter(job =>
      job.toLowerCase().includes("junior") ||
      job.toLowerCase().includes("associate") ||
      job.toLowerCase().includes("analyst")
    );
  }

  // Mid Level
  if (readiness < 80) {
    return jobs.filter(job =>
      job.toLowerCase().includes("developer") ||
      job.toLowerCase().includes("engineer") ||
      job.toLowerCase().includes("consultant")
    );
  }

  // Advanced
  return jobs;

};