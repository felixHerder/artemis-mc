import mongoose from 'mongoose';
const launchPadsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const launchpadsCol = mongoose.model("launchpads",launchPadsSchema);