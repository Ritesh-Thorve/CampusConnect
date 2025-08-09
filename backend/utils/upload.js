import { supabase } from "../config/supabase.js";
import { v4 as uuid } from "uuid"; 

/**
 * Upload a file to a specific Supabase storage bucket and return its public URL.
 * @param {string} bucket - The name of the Supabase storage bucket.
 * @param {object} file - The file object, usually from multer, containing buffer, mimetype, etc.
 * @returns {Promise<string>} - Public URL of the uploaded file.
 */
export const uploadFile = async (bucket, file) => {
  console.log(`Uploading to bucket: "${bucket}"`);
  console.log(`File: ${file.originalname}, Type: ${file.mimetype}`);

  // Extract the file extension from the original filename
  const ext = file.originalname.split(".").pop();

  // Generate a unique filename using UUID to avoid name collisions
  const fileName = `${uuid()}.${ext}`;

  // Upload the file buffer to the specified bucket with correct content type
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, { contentType: file.mimetype });

  // If upload fails, throw an error with details
  if (error) {
    throw new Error(`File upload failed for bucket "${bucket}": ${error.message}`);
  }

  // Get the public URL for the uploaded file
  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(fileName);

  // Ensure public URL retrieval is successful
  if (!publicUrl || !publicUrl.publicUrl) {
    throw new Error(`Failed to retrieve public URL for uploaded file in bucket "${bucket}"`);
  }

  // Return the publicly accessible URL of the uploaded file
  return publicUrl.publicUrl;
};
