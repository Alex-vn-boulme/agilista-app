"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../server";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  // Get form data
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;
  const industry = formData.get("industry") as string;
  const address = formData.get("address") as string;

  // Update user profile
  const { error } = await supabase
    .from("users")
    .update({
      name: `${firstName} ${lastName}`.trim(),
      full_name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      company,
      industry,
      address,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  // Revalidate the profile page
  revalidatePath("/dashboard/profile");
}
