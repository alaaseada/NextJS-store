import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
)

const bucketName = 'main-bucket'

export const uploadImage = async (file: File) => {
  const filePath = Date.now() + '-' + file.name
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, { cacheControl: '3600' })
  const { data: uploadedImage } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath)
  if (error) {
    throw new Error(error.message)
  }
  return uploadedImage.publicUrl
}

export const deleteImage = async (imageURL: string) => {
  const imageName = imageURL.split('/').pop()
  if (!imageName) throw new Error('Invalid URL')
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([imageName])
  console.log(data)
  if (error) {
    throw new Error(error.message)
  }
}
