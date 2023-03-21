module.exports = {
  BASE_URL: process.env.BASE_URL || "http://localhost:8000/",
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/datingapp",
};
