import mongoose from "mongoose";

const playlistCacheSchema = new mongoose.Schema({
  goal: { type: String, required: true, unique: true },
  domain: { type: String, required: true },
  roadmap: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("PlaylistCache", playlistCacheSchema);