import mongoose, { mongo } from "mongoose";

const Db_Uri = process.env.DB_URI1;
const Db_Post_Uri1 = process.env.DB_POST_URI1;

// let gfs: any;
// let bucket: any;

export const DbConnect1 = async () => {
  try {
    const connect = await mongoose.connect(Db_Uri as string);
    console.log("Db Connected");
    return {
      connect,
    };
  } catch (e) {
    console.log(e);
  }
};