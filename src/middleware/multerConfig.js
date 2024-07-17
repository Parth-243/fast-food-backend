const multer = require('multer');
const fs = require('fs');
const { TEMP_UPLOAD_DIR } = require('../../config/index');

const createMulterConfig = (maxFileSize, maxFiles, allowedFileTypes) => {
  // Ensure the uploads folder exists
  if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
    fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, TEMP_UPLOAD_DIR);
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
