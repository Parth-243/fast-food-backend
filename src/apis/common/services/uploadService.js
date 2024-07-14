const minioClient = require('../../../utils/minioClient');
const fs = require('fs').promises;

const generateBucketPolicy = (bucketName) => {
  return {
    Version: '2012-10-17',
    Statement: [
      {
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };
};

const setBucketPolicy = async (bucketName) => {
  try {
    const policy = JSON.stringify(generateBucketPolicy(bucketName));
    await minioClient.setBucketPolicy(bucketName, policy);
    console.log(`Bucket policy for ${bucketName} set successfully.`);
  } catch (err) {
    console.error(`Error setting bucket policy: ${err.message}`);
  }
};

const uploadFile = async (bucketName, objectName, filePath) => {
  // Upload the file
  try {
    await minioClient.fPutObject(bucketName, objectName, filePath);
    const fileUrl = `${minioClient.protocol}//${minioClient.host}:${minioClient.port}/${bucketName}/${objectName}`;

    // Delete the local file after successful upload
    await fs.unlink(filePath);
    return fileUrl;
  } catch (err) {
    throw new Error(`Error uploading file: ${err.message}`);
  }
};

const uploadFiles = async (bucketName, files) => {
  // Check if the bucket exists
  const bucketExists = await minioClient
    .bucketExists(bucketName)
    .catch(() => false);

  // If the bucket does not exist, create it
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName, 'us-east-1');
    console.log(`Bucket ${bucketName} created successfully`);

    // Set the bucket policy
    await setBucketPolicy(bucketName);
  }

  const fileUploadPromises = files.map((file) =>
    uploadFile(bucketName, file.filename.replace(/\s+/g, '-'), file.path)
  );

  return Promise.all(fileUploadPromises);
};

const deleteFile = async (fileUrl) => {
  try {
    const url = new URL(fileUrl);
    const bucketName = url.pathname.split('/')[1];
    const objectName = url.pathname.split('/').slice(2).join('/');

    await minioClient.removeObject(bucketName, objectName);
    console.log(
      `File ${objectName} deleted successfully from bucket ${bucketName}`
    );
  } catch (err) {
    throw new Error(`Error deleting file: ${err.message}`);
  }
};

module.exports = { uploadFiles, deleteFile };
