import { User } from "../../models/Account.js";

const updateProfile = async (req, res) => {
  try {
    const {
      body: {
        firstname,
        lastname,
        address,
        country,
        postalcode,
        city,
        aboutme,
      },
      auth: { uid },
    } = req;
    console.log(req.body);
    if (
      !firstname ||
      !lastname ||
      !address ||
      !country ||
      !postalcode ||
      !city ||
      !aboutme
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await User.updateOne(
      { _id: uid },
      {
        $set: {
          firstname,
          lastname,
          address,
          country,
          postalcode,
          city,
          bio: aboutme,
        },
      }
    );
    const data = await User.findById({ _id: uid });
    return res.status(200).json({
      message: "Profile updated",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export default updateProfile;
