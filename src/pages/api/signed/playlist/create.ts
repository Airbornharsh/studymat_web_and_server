import { DbConnect } from "../../../../../Server/config/Db_config";
import Authenticate from "../../../../../Server/middlewares/Authenticate";

const main = async (req: any, res: any) => {
  try {
    const body = JSON.parse(req.body);

    if (!(body.name && body.institutionId && body.link)) {
      return res.status(406).send({ message: "No Data Given" });
    }

    const DbModels = await DbConnect();

    const AuthenticateDetail = await Authenticate(req, res);

    const tempInstitution = [];

    AuthenticateDetail!.institution.forEach((e: any) => {
      tempInstitution.push(e.toString());
    });

    if (!AuthenticateDetail!.institution.includes(body.institutionId)) {
      return res
        .status(402)
        .send({ message: "Not Authorized for this Institution" });
    }

    const newPlaylist = new DbModels!.playlist({
      institutionId: body.institutionId,
      name: body.name,
      link: body.link,
      courses: [...(body.courses ? body.courses : [])],
      branches: [...(body.branches ? body.branches : [])],
      years: [...(body.years ? body.years : [])],
      subjects: [...(body.subjects ? body.subjects : [])],
      modules: [...(body.modules ? body.modules : [])],
    });

    const PlaylistData = await newPlaylist.save();

    await DbModels?.institution.findByIdAndUpdate(body.institutionId, {
      $push: { playlists: PlaylistData._id },
    });

    return res.send(PlaylistData);
  } catch (e: any) {
    return res.status(500).send({ message: e.message });
  }
};

export default main;
