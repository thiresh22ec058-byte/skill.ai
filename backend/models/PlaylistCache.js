import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  videoId: String,
  duration: Number
});

const weekSchema = new mongoose.Schema({
  week: Number,
  totalDuration: Number,
  videos: [videoSchema]
});

const playlistCacheSchema = new mongoose.Schema({
  goal: String,
  playlistId: String,        // ✅ IMPORTANT
  roadmap: [weekSchema]
});

export default mongoose.model("PlaylistCache", playlistCacheSchema);