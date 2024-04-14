
const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET || "DJFBU23TIGF7G23RIH2RN2I37RURSHFD",
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || "dqtahkpi4",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "dqtahkpi4",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "459178897627443",
  CLOUDINARY_API_SECRET:
    process.env.CLOUDINARY_API_SECRET || "XQQ0D0V0wIXWAUuj3bxcMQ9hNpE",
};

export default config;
