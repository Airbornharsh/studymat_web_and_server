import { Secret, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "Server/config/Db_config";

const Authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken =
      (req.headers["authorization"]?.split(" ")[1] as string) || "";

    let tempErr: any;
    let tempUser: any;

    const DbModels = await DbConnect();

    await verify(
      accessToken,
      process.env.JWT_SECRET as Secret,
      (err: any, user: any) => {
        tempErr = err;
        tempUser = user;
      }
    );

    const userData = await DbModels!.user.findById(tempUser._id);

    if (tempErr && userData.isAdmin)
      return res.status(402).send({ message: "Not Authorized" });

    return {
      userName: userData.userName,
      isAdmin: userData.isAdmin,
      _id: userData._id,
      iat: userData.iat,
      institution: userData.institution,
    };
  } catch (e: any) {
    return res.status(500).send({ message: e.message });
  }
};

export default Authenticate;
