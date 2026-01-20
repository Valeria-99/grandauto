import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // папка для збереження
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // унікальна назва
  },
});

const upload = multer({ storage });

export default upload;
