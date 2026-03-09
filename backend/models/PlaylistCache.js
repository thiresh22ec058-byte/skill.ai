import mongoose from "mongoose";

const playlistCacheSchema = new mongoose.Schema({

  query: {
    type: String,
    required: true,
    unique: true
  },

  url: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

export default mongoose.model("PlaylistCache", playlistCacheSchema);