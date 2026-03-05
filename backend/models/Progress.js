import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({

  userId: String,

  career: String,

  phase: Number,

  status: String

});

export default mongoose.model("Progress", progressSchema);