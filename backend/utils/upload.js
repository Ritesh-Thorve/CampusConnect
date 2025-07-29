import { supabase } from '../config/supabase.js';

export const uploadFile = async (bucket, file) => {
  const fileName = `uploads/${Date.now()}-${file.originalname}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { publicUrl } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName).data;

  return publicUrl;
};
