import { NextApiRequest, NextApiResponse } from "next";
import { DbConnect } from "../../../../../Server/config/Db_config";
import Authenticate from "../../../../../Server/middlewares/Authenticate";

const main = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const body = JSON.parse(req.body);

    const DbModels = await DbConnect();

    const pdfDatas = await DbModels?.pdf.find({
      institutionId: body.institutionId,
    });

    console.log(pdfDatas, body.institutionId);

    res.send(pdfDatas);
  } catch (e: any) {
    res.status(500).send({ message: e.message });
  }
};

export default main;
