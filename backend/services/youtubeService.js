import axios from "axios";
import PlaylistCache from "../models/PlaylistCache.js";

const YOUTUBE_API = "https://www.googleapis.com/youtube/v3/search";

export const getBestPlaylist = async (topic, goal) => {

  try {

    const query = `${topic} ${goal} full course playlist`;

    // Check cache first
    const cached = await PlaylistCache.findOne({ query });

    if (cached) {
      return cached.url;
    }

    const response = await axios.get(YOUTUBE_API, {
      params: {
        part: "snippet",
        q: query,
        type: "playlist",
        maxResults: 1,
        key: process.env.YOUTUBE_API_KEY
      }
    });

    if (!response.data.items || response.data.items.length === 0) {
      console.log("No playlist found for:", query);
      return null;
    }

    const playlist = response.data.items[0];

    const url = `https://www.youtube.com/playlist?list=${playlist.id.playlistId}`;

    // Save or update cache (prevents duplicate key error)
    await PlaylistCache.updateOne(
      { query },
      { query, url },
      { upsert: true }
    );

    return url;

  } catch (error) {

    console.error("YouTube API Error:", error.message);

    return null;

  }

};