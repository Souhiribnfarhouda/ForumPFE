const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/'); // save uploaded images to the public/images directory
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`); // generate a unique filename for each uploaded image
  },
});

const upload = multer({ storage })