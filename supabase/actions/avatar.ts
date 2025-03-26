"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../server";

export async function updateAvatar(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const file = formData.get("avatar") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  // Check file type
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Check file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("File size must be less than 2MB");
  }

  // Convert file to ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = new Uint8Array(arrayBuffer);

  // Create a unique file name
  const fileExt = file.type.split("/")[1];
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;

  // Upload file to storage
  const { error: uploadError, data: uploadData } = await supabase.storage
    .from("avatars")
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    throw new Error("Error uploading file");
  }

  // Get the public URL
  const { data: publicUrl } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  if (!publicUrl) {
    throw new Error("Error getting public URL");
  }

  // Delete old avatar if it exists
  const { data: oldAvatar } = await supabase
    .from("users")
    .select("avatar_url")
    .eq("user_id", user.id)
    .single();

  if (oldAvatar?.avatar_url) {
    const oldFileName = oldAvatar.avatar_url.split("/").pop();
    if (oldFileName) {
      await supabase.storage
        .from("avatars")
        .remove([`${user.id}/${oldFileName}`]);
    }
  }

  // Update user profile with new avatar URL
  const { error: updateError } = await supabase
    .from("users")
    .update({
      avatar_url: publicUrl.publicUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (updateError) {
    throw new Error("Error updating profile");
  }

  // Revalidate the profile page
  revalidatePath("/dashboard/profile");

  // Return the new avatar URL
  return publicUrl.publicUrl;
}
