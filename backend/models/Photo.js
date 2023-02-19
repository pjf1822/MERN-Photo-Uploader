import mongoose from "mongoose";

const { Schema } = mongoose;

const photoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {},

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Photo", photoSchema);
