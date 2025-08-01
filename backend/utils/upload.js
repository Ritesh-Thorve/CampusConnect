import { supabase } from "../config/supabase.js";
import { v4 as uuid } from "uuid";

export const uploadFile = async (bucket, file) => {
  const ext = file.originalname.split(".").pop();
  const fileName = `${uuid()}.${ext}`;
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, { contentType: file.mimetype });

  if (error) throw new Error("File upload failed: " + error.message);

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return publicUrl.publicUrl;
};
