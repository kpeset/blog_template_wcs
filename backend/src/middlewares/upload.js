// Un lien qui vous explique l'utilisation de multer
// https://medium.com/@svibhuti22/file-upload-with-multer-in-node-js-and-express-5bc76073419f

const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename(req, file, cb) {
    const pictureName = uuidv4() + path.extname(file.originalname);
    cb(null, `img-${pictureName}`);
  },
});

const uploadFile = (req, res, next) => {
  const upload = multer({ storage });
  return upload.single("image")(req, res, next);
};

module.exports = { uploadFile };
