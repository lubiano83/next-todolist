import multer from "multer";

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/profile");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const productsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/public/products");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadProfile = multer({ storage: profileStorage });
const uploadProducts = multer({ storage: productsStorage });

export { uploadProfile, uploadProducts };