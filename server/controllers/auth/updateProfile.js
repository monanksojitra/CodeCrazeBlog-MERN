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

    const updatedUser = await User.findById(uid).select("-password");
    return res.status(200).json({
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateProfile;
