import React from "react";

function LearningPlan({ roadmap }) {

  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="text-white text-center mt-10">
        No roadmap available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      
      <h1 className="text-4xl font-bold mb-10 text-center">
        📚 Your Learning Roadmap
      </h1>

      {roadmap.map((week) => (
        <div
          key={week.week}
          className="bg-gray-900 rounded-xl p-6 mb-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2">
            Week {week.week}
          </h2>

          <p className="text-sm text-gray-400 mb-4">
            Total Duration: {week.totalDuration} mins
          </p>

          <ul className="mb-4 space-y-2">
            {week.videos.map((video, index) => (
              <li key={index} className="text-gray-300 text-sm">
                • {video.title}
              </li>
            ))}
          </ul>

          <a
            href={`https://www.youtube.com/watch?v=${week.videos[0].videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg text-white inline-block"
          >
            Start Week {week.week}
          </a>
        </div>
      ))}
    </div>
  );
}

export default LearningPlan;