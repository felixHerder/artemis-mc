import mongoose from 'mongoose';
const rocketsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export const rocketsCol = mongoose.model("rockets",rocketsSchema);