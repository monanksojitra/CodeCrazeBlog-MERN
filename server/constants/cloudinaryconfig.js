import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dqtahkpi4",
  api_key: "454875975863887",
  api_secret: "_TUQHtRT6osCMgGWq-d5M7AfpBk",
  secure: true,
});

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true,
// });
// Utility function to handle Cloudinary uploads
const uploadFile = async ({ path, folder }) => {
  try {
    const result = await cloudinary.uploader.upload(path, { folder });
    return result;
  } catch (error) {
    console.error("Upload error:", error);
    return null;
  }
};

// Utility function to handle Cloudinary file deletions
const deleteFile = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
      type: "upload",
    });
    return result;
  } catch (error) {
    console.error("Delete error:", error);
    return null;
  }
};

export { uploadFile, deleteFile };
