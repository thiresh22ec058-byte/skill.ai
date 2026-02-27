// frontend/src/components/WeekCard.jsx

function WeekCard({ week }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl mb-6 shadow-lg">
      <h2 className="text-2xl font-bold mb-2">
        Week {week.week}
      </h2>

      <p className="text-sm text-gray-400 mb-4">
        Total Duration: {Math.round(week.totalDuration)} mins
      </p>

      <ul className="mb-4">
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
        className="bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2 rounded-lg text-white"
      >
        Start Week {week.week}
      </a>
    </div>
  );
}

export default WeekCard;