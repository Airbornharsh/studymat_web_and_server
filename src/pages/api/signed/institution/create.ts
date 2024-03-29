import { DbConnect } from "../../../../../Server/config/Db_config";
import Authenticate from "../../../../../Server/middlewares/Authenticate";

const main = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.body);

    if (!(body.name || body.url)) {
      return res.status(406).send({ message: "No Data Given" });
    }

    const DbModels = await DbConnect();

    const AuthenticateDetail = await Authenticate(req, res);

    const newInstitution = new DbModels!.institution({
      name: body.name,
      users: [AuthenticateDetail?._id],
    });

    const institutionData = await newInstitution.save();

    await DbModels?.user.findByIdAndUpdate(AuthenticateDetail?._id, {
      $push: { institution: institutionData._id },
    });

    return res.send(institutionData);
  } catch (e: any) {
    return res.status(500).send({ message: e.message });
  }
};

export default main;
