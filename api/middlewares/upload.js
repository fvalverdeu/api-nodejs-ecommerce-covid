const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(req)
    const path = `./uploads/${req.params.category}/${req.params.id}`;
    // fs.mkdirSync(path, { recursive: true })
    fs.mkdir(path, err => cb(null, path));
  },
  filename: function(req, file, cb) {
    // cb(null, new Date().getTime() + '-' + file.originalname);
    // console.log(file);
    cb(null, file.originalname);
  }
});

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const pdfFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

const maxFileSize = 1024 * 1024 * 5; // 5MB

exports.image = multer({
    storage: storage,
    limits: {
        fileSize: maxFileSize
    },
    fileFilter: imageFileFilter
});
  
exports.pdf = multer({
    storage: storage,
    limits: {
        fileSize: maxFileSize
    },
    fileFilter: pdfFileFilter
});

