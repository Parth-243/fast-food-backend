const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { TEMP_UPLOAD_DIR } = require('../../../config/index');

const createMulterConfig = (maxFileSize, maxFiles, allowedFileTypes) => {
  const uploadDir = path.join(__dirname, TEMP_UPLOAD_DIR);

  // Ensure the uploads folder exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  };

  return multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
      files: maxFiles,
    },
    fileFilter: fileFilter,
  });
};

module.exports = createMulterConfig;
