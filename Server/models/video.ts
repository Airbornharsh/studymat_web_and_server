import { Schema, models, model } from "mongoose";

const videoSchema = new Schema({
  institutionId: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  courses: [{ type: String, default: [] }],
  branches: [{ type: String, default: [] }],
  years: [{ type: String, default: [] }],
  subjects: [{ type: String, default: [] }],
  modules: [{ type: String, default: [] }],
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

export default models.Video || model("Video", videoSchema);
