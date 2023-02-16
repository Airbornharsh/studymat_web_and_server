import { Schema, models, model } from "mongoose";

const institutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  pdfMats: [{ type: Schema.Types.ObjectId, ref: "PdfMat", default: [] }],
  videos: [{ type: Schema.Types.ObjectId, ref: "Video", default: [] }],
  playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist", default: [] }],
});

export default models.Institution || model("Institution", institutionSchema);
