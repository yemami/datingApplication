const multer = require('multer');
const path = require('path');

// Set storage engine for profile pictures
const profileStorage = multer.diskStorage({
  //destination: '../public/uploads/profile',
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check file type
const checkFileType = (file, cb) => {
  // Allowed extensions
  const filetypes = /jpeg|jpg|png/;
  // Check extension
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mimetype
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// Set multer options for profile pictures
module.exports.profileUpload = multer({
  storage: profileStorage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).single('profileImage');

