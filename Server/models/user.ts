import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  institution: [
    { type: Schema.Types.ObjectId, ref: "Institution", default: [] },
  ],
});

export default models.User || model("User", userSchema);
