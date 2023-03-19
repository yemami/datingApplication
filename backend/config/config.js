module.exports = {
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/datingapp',
  };