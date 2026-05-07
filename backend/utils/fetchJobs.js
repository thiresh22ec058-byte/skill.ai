const axios = require("axios");
const Job = require("../models/Job");

async function fetchJobsFromAPI(skill) {
  try {

    const response = await axios.get(`API_URL`);

    const jobs = response.data.results;

    for (let job of jobs) {

      await Job.updateOne(
        { link: job.redirect_url },
        {
          title: job.title,
          company: job.company.display_name,
          location: job.location.display_name,
          link: job.redirect_url,
          skills: [skill],
          createdAt: new Date()
        },
        { upsert: true }
      );

    }

    console.log("Jobs updated");

  } catch (error) {
    console.log("Error fetching jobs:", error.message);
  }
}

module.exports = fetchJobsFromAPI;