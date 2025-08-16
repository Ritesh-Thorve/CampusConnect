import { supabase } from "../config/supabase.js";
import { v4 as uuid } from "uuid";

//Upload a file to Supabase storage and return its public URL
export const uploadFile = async (bucket, file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  // Extra file size check (2MB max)
  const MAX_SIZE = 2 * 1024 * 1024; // 2MB
  if (file.size > MAX_SIZE) {
    throw new Error(`File size exceeds 2MB: ${file.originalname}`);
  }

  const ext = file.originalname.split(".").pop();
  const fileName = `${uuid()}.${ext}`;

  console.log(
    `Uploading to Supabase: ${file.originalname} (${file.size} bytes, ${file.mimetype})`
  );

  // Upload to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: true, // optional: overwrite if same name
    });

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  // Get public URL
  const { data, error: publicUrlError } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  if (publicUrlError) {
    throw new Error(
      `Failed to retrieve public URL: ${publicUrlError.message}`
    );
  }

  return data.publicUrl;
};
