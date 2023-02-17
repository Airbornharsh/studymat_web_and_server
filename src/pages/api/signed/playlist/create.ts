import { DbConnect } from "../../../../../Server/config/Db_config";
import Authenticate from "../../../../../Server/middlewares/Authenticate";

const main = async (req: any, res: any) => {
  try {
    if (!(req.body.name && req.body.institutionId && req.body.link)) {
      return res.status(406).send({ message: "No Data Given" });
    }

    const DbModels = await DbConnect();

    const AuthenticateDetail = await Authenticate(req, res);

    const tempInstitution = [];

    AuthenticateDetail!.institution.forEach((e: any) => {
      tempInstitution.push(e.toString());
    });

    if (!AuthenticateDetail!.institution.includes(req.body.institutionId)) {
      return res
        .status(402)
        .send({ message: "Not Authorized for this Institution" });
    }

    const newVideo = new DbModels!.video({
      institutionId: req.body.institutionId,
      name: req.body.name,
      link: req.body.link,
      courses: [...(req.body.courses ? req.body.courses : [])],
      branches: [...(req.body.branches ? req.body.branches : [])],
      years: [...(req.body.years ? req.body.years : [])],
      subjects: [...(req.body.subjects ? req.body.subjects : [])],
      modules: [...(req.body.modules ? req.body.modules : [])],
    });

    const videoData = await newVideo.save();

    await DbModels?.institution.findByIdAndUpdate(AuthenticateDetail?._id, {
      $push: { playlists: videoData._id },
    });

    res.send(videoData);
  } catch (e: any) {
    res.status(500).send(e.message);
  }
};

export default main;
