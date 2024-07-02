require('dotenv').config();

const config = {
  PORT: env.PORT || 4000,
  MONGO_URI: `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}?authMechanism=DEFAULT&authSource=admin`,
};

module.exports = config;
