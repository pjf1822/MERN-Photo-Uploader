import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema({
  myFile: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Photo", photoSchema);
