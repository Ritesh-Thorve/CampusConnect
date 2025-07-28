import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory before uploading to Supabase
const upload = multer({ storage });

export const uploadFiles = upload.fields([
  { name: 'profileImg', maxCount: 1 },
  { name: 'collegeImage', maxCount: 1 },
  { name: 'collegeIdCard', maxCount: 1 }
]);
