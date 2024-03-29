import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "../../../../Server/config/Db_config";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = req.body;

    const DbModels = await DbConnect();

    let tempUser;
    if (body.userName) {
      tempUser = await DbModels!.user.findOne({
        userName: body.userName.trim(),
      });
      if (!tempUser) {
        return res
          .status(400)
          .send({ message: `No Such ${body.userName} Exist` });
      }
    }

    const passwordSame = await compare(
      body.password.trim(),
      tempUser.password.trim()
    );

    if (!passwordSame) {
      return res.status(401).send({ message: "Wrong Password" });
    }

    const authUser = {
      userName: tempUser.userName,
      _id: tempUser._id,
    };

    const accessToken = sign(authUser, process.env.JWT_SECRET as Secret);

    res.send({ accessToken });
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export default main;
