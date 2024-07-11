require('dotenv').config();

const { env } = process;

const config = {
  PORT: env.PORT || 4000,
  MONGO_URI: `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}:${env.MONGO_PORT}/${env.MONGO_DATABASE}?authMechanism=DEFAULT&authSource=admin`,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRY_TIME: env.JWT_EXPIRY_TIME || '1h',
  MIN_PASSWORD_LENGTH: parseInt(env.MIN_PASSWORD_LENGTH || 8, 10),
  USER_ROLES: { USER: 'user', B_USER: 'businessUser', ADMIN: 'admin' },
};

module.exports = config;
