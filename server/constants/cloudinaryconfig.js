import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "du8fjnogk",
  api_key: process.env.API_KEY || "334731757154325",
  api_secret: process.env.API_SECRET || "g-M9m8Uv1F8xroJEYiS8xY6E_q8",
});

const uploadFile = async ({ path, folder }) => {
  const result = await cloudinary.uploader.upload(
    path,
    { folder: folder },
    function (error, result) {
      if (error) {
        console.log(error);
        return -1;
      }

      //   console.log(result);
      return result;
    }
  );

  return result;
};

const deleteFile = async (public_id) => {
  const result = await cloudinary.uploader.destroy(
    [public_id],
    function (error, result) {
      if (error) {
        console.log(error);
        return -1;
      }
      return result;
    }
  );
  return result;
};

export { uploadFile, deleteFile };
