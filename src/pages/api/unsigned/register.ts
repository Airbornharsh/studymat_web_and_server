import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "../../../../Server/config/Db_config";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);

    const DbModels = await DbConnect();

    let tempUser = await DbModels?.user.findOne({
      userName: body.userName,
    });
    if (tempUser) {
      return res.status(400).send({ message: "UserName Exists!" });
    }

    const hashPassword = await hash(body.password.trim(), 10);

    const newUser = new DbModels!.user({
      name: body.name.trim(),
      userName: body.userName.trim(),
      institution: [],
      password: hashPassword,
    });

    const data = await newUser.save();

    return res.send(data);
  } catch (e: any) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
};

export default main;
