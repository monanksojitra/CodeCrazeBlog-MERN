const deleteProfile = async (req, res) => {
  res.status(200).json({ message: "Profile deleted" });
};
export default deleteProfile;
