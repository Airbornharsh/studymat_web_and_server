import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "../../../../../Server/config/Db_config";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);

    const DbModels = await DbConnect();

    const playlistDatas = await DbModels?.playlist.find({
      institutionId: body.institutionId,
    });

    res.send(playlistDatas);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export default main;
