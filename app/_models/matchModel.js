import mongoose from "mongoose";

const MatchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  safety: { type: Number, required: true },
  cafes: { type: Number, required: true },
  parks: { type: Number, required: true },
  schools: { type: Number, required: true },
  publicTransport: { type: Number, required: true },
});

export default mongoose.models.Match || mongoose.model("Match", MatchSchema);
