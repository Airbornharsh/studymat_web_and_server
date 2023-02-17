import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "../../../../../Server/config/Db_config";
import Authenticate from "../../../../../Server/middlewares/Authenticate";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);

    const DbModels = await DbConnect();

    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    let institutionDatas = await DbModels?.institution
      .find({ name: { $regex: body.name } })
      .skip((page - 1) * limit)
      .limit(limit);

    institutionDatas = institutionDatas?.map((i) => {
      return {
        _id: i._id,
        name: i.name,
        pdfs: i.pdfs.length,
        videos: i.videos.length,
        playlists: i.playlists.length,
      };
    });

    res.send(institutionDatas);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export default main;
