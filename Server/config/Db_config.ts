import mongoose, { mongo } from "mongoose";
import user from "../models/user";
import institution from "../models/institution";
import pdfMat from "../models/pdfMat";
import video from "../models/video";
import playlist from "../models/playlist";

const Db_Uri = process.env.DB_URI;

// let gfs: any;
// let bucket: any;

export const DbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connect = await mongoose.connect(Db_Uri as string);
    console.log("Db Connected");
    return {
      connect,
      user,
      institution,
      pdfMat,
      video,
      playlist,
    };
  } catch (e) {
    console.log(e);
  }
};
