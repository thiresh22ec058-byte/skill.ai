// backend/utils/weeklySplitter.js

function convertISOToMinutes(iso) {
  const match = iso.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  return hours * 60 + minutes + seconds / 60;
}

function splitIntoWeeks(videos) {
  const WEEK_LIMIT = 300; // 5 hours per week
  let roadmap = [];
  let currentWeek = [];
  let total = 0;
  let weekNumber = 1;

  for (let video of videos) {
    const duration = convertISOToMinutes(video.duration);

    if (total + duration <= WEEK_LIMIT) {
      currentWeek.push({
        title: video.title,
        videoId: video.videoId,
        duration
      });
      total += duration;
    } else {
      roadmap.push({
        week: weekNumber,
        totalDuration: total,
        videos: currentWeek
      });

      weekNumber++;
      currentWeek = [{
        title: video.title,
        videoId: video.videoId,
        duration
      }];
      total = duration;
    }
  }

  if (currentWeek.length > 0) {
    roadmap.push({
      week: weekNumber,
      totalDuration: total,
      videos: currentWeek
    });
  }

  return roadmap;
}

export default splitIntoWeeks;