import { NextApiRequest, NextApiResponse } from "next";
import Authenticate from "Server/middlewares/Authenticate";
import { DbConnect } from "../../../../../Server/config/Db_config";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const DbModels = await DbConnect();

    const AuthenticateDetail = await Authenticate(req, res);

    if (!AuthenticateDetail?.isAdmin) {
      return res.status(402).send("Not Authorized");
    }
    const institutionDatas = await DbModels?.institution.find({
      _id: AuthenticateDetail?.institution || [],
    });

    res.send(institutionDatas);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export default main;
