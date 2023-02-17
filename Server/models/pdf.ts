import { Schema, models, model } from "mongoose";

const pdfSchema = new Schema({
  institutionId: {
    type: Schema.Types.ObjectId,
    ref: "Institution",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  courses: [{ type: String, default: [] }],
  branches: [{ type: String, default: [] }],
  years: [{ type: String, default: [] }],
  subjects: [{ type: String, default: [] }],
  modules: [{ type: String, default: [] }],
});

export default models.Pdf || model("Pdf", pdfSchema);
