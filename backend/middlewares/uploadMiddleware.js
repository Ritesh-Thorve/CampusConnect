import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

export const profileUpload = upload.fields([
  { name: "profileImg", maxCount: 1 },
  { name: "collegeImage", maxCount: 1 },
  { name: "collegeIdCard", maxCount: 1 }
]);
