import { Secret, verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const Authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1] as string || "";

    let tempErr: any;
    let tempUser: any;

    await verify(
      accessToken,
      process.env.JWT_SECRET as Secret,
      (err: any, user: any) => {
        tempErr = err;
        tempUser = user;
      }
    );

    if (tempErr) return res.status(402).send({ message: "Not Authorized" });

    return {
      userName: tempUser.userName,
      _id: tempUser._id,
      iat: tempUser.iat,
    };
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

export default Authenticate;
