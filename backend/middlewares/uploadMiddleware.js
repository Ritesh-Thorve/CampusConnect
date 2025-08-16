import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

export const profileUpload = upload.fields([
  { name: "profileImg", maxCount: 1 },
  { name: "collegeImage", maxCount: 1 },
  { name: "collegeIdCard", maxCount: 1 },
]);

// Error handler middleware
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("Multer error:", err.message);
    return res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    console.error("Upload error:", err.message);
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  next();
};
