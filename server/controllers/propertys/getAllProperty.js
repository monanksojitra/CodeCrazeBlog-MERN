import { Property } from "../../models/Account.js";

const getAllProperty = async (req, res) => {
  try {
    const data = await Property.find({});
    if (!data) return res.status(404).json({ message: "Property not found" });
    return res.status(200).json({
      message: "Property fetched",
      data,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export default getAllProperty;
