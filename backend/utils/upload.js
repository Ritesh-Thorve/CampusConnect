import { supabase } from '../config/supabase.js';

export const uploadFile = async (bucket, file) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`uploads/${Date.now()}-${file.originalname}`, file.buffer, {
      contentType: file.mimetype,
    });
  if (error) throw error;
  return supabase.storage.from(bucket).getPublicUrl(data.path).data.publicUrl;
};
