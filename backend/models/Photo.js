import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
  myFile: {
    type: String,
  },
});

export default mongoose.model("Photo", photoSchema);
