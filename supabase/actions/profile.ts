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

  try {
    // 1. Mettre à jour le profil utilisateur dans la table users
    const { error: usersError } = await supabase
      .from("users")
      .update({
        name: `${firstName} ${lastName}`.trim(),
        full_name: `${firstName} ${lastName}`.trim(),
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        industry,
        address,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (usersError) {
      console.error("Error updating users table:", usersError);

      // Essayer avec id au lieu de user_id
      const { error: usersIdError } = await supabase
        .from("users")
        .update({
          name: `${firstName} ${lastName}`.trim(),
          full_name: `${firstName} ${lastName}`.trim(),
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          company,
          industry,
          address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (usersIdError) {
        throw new Error(
          `Erreur lors de la mise à jour du profil: ${usersIdError.message}`
        );
      }
    }

    // 2. Mettre à jour les métadonnées utilisateur dans auth.users pour les garder synchronisées
    const { error: authError } = await supabase.auth.updateUser({
      email,
      data: {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim(),
        name: `${firstName} ${lastName}`.trim(),
      },
    });

    if (authError) {
      console.error("Error updating auth user metadata:", authError);
      // Ne pas bloquer la mise à jour du profil si la mise à jour des métadonnées échoue
    }

    // Revalidate the profile page
    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error("Profile update error:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la mise à jour du profil"
    );
  }
}
