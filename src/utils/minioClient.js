const Minio = require('minio');
const {
  MINIO_ENDPOINT,
  MINIO_PORT,
  MINIO_ROOT_USER,
  MINIO_ROOT_PASSWORD,
} = require('../../config');

const minioClient = new Minio.Client({
  endPoint: MINIO_ENDPOINT || 'localhost',
  port: parseInt(MINIO_PORT, 10) || 9000,
  useSSL: false,
  accessKey: MINIO_ROOT_USER,
  secretKey: MINIO_ROOT_PASSWORD,
});

module.exports = minioClient;
