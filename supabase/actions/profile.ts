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
    // 1. Créer ou récupérer l'organisation
    let organisationId = null;

    if (company) {
      // Créer ou mettre à jour l'organisation
      const { data: orgData, error: orgError } = await supabase
        .from("organisations")
        .upsert(
          {
            name: company,
            status: "active",
            industry,
            address,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "name" }
        )
        .select("id")
        .single();

      if (orgError) {
        console.error("Erreur organisation:", orgError);
      } else {
        organisationId = orgData.id;
      }
    }

    // 2. Mettre à jour le profil utilisateur
    const profileUpdate = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      organisation_id: organisationId,
      updated_at: new Date().toISOString(),
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .update(profileUpdate)
      .eq("id", user.id);

    if (profileError) {
      console.error("Erreur mise à jour profil:", profileError);
      throw new Error(
        `Erreur lors de la mise à jour du profil: ${profileError.message}`
      );
    }

    // 3. Mettre à jour les métadonnées auth.users
    const { error: authError } = await supabase.auth.updateUser({
      email,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    });

    if (authError) {
      console.error("Erreur mise à jour auth:", authError);
    }

    // 4. Si l'utilisateur n'a pas de rôle et est lié à une organisation, lui donner le rôle admin
    if (organisationId) {
      const { data: userRole } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (!userRole) {
        const { error: roleError } = await supabase.from("user_roles").insert({
          user_id: user.id,
          role: "adminOrga",
        });

        if (roleError) {
          console.error("Erreur création rôle:", roleError);
        }
      }
    }

    revalidatePath("/dashboard/profile");
  } catch (error) {
    console.error("Erreur mise à jour profil:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la mise à jour du profil"
    );
  }
}

export async function updateProfilePicture(formData: FormData) {
  const supabase = await createClient();
  console.log("🚀 Début de l'upload de la photo de profil");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.error("❌ Utilisateur non authentifié");
    throw new Error("Not authenticated");
  }
  console.log("✅ Utilisateur authentifié:", user.id);

  try {
    const file = formData.get("profile_picture") as File;
    if (!file) {
      console.error("❌ Aucun fichier fourni dans le formData");
      throw new Error("No file provided");
    }
    console.log("📁 Fichier reçu:", {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)}KB`,
    });

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      console.error("❌ Type de fichier invalide:", file.type);
      throw new Error("Le fichier doit être une image");
    }

    // Vérifier la taille du fichier (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      console.error(
        "❌ Fichier trop volumineux:",
        `${(file.size / 1024 / 1024).toFixed(2)}MB`
      );
      throw new Error("L'image ne doit pas dépasser 2MB");
    }

    // 1. Supprimer l'ancienne photo si elle existe
    console.log("🔍 Recherche de l'ancienne photo...");
    const { data: oldProfile, error: profileError } = await supabase
      .from("profiles")
      .select("profile_picture_url")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.error("❌ Erreur lors de la recherche du profil:", profileError);
    }

    if (oldProfile?.profile_picture_url) {
      console.log(
        "🗑️ Suppression de l'ancienne photo:",
        oldProfile.profile_picture_url
      );
      const oldFilePath = oldProfile.profile_picture_url.split("/").pop();
      if (oldFilePath) {
        const { error: removeError } = await supabase.storage
          .from("avatars")
          .remove([`public/${oldFilePath}`]);

        if (removeError) {
          console.error(
            "⚠️ Erreur lors de la suppression de l'ancienne photo:",
            removeError
          );
        } else {
          console.log("✅ Ancienne photo supprimée avec succès");
        }
      }
    }

    // 2. Upload the file to storage
    const fileExt = file.type.split("/")[1];
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;
    console.log("📤 Tentative d'upload du fichier:", {
      bucket: "avatars",
      filePath,
      fileExt,
    });

    const { error: uploadError, data: uploadData } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      console.error("❌ Erreur upload:", uploadError);
      throw new Error(`Erreur lors de l'upload: ${uploadError.message}`);
    }
    console.log("✅ Upload réussi:", uploadData);

    // 3. Get the public URL
    console.log("🔗 Génération de l'URL publique...");
    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    if (!publicUrl?.publicUrl) {
      console.error("❌ Impossible d'obtenir l'URL publique");
      throw new Error("Impossible d'obtenir l'URL publique");
    }

    console.log("✅ URL publique générée:", publicUrl.publicUrl);

    // 4. Update the profile with the new picture URL
    console.log("💾 Mise à jour du profil avec la nouvelle URL...");
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        profile_picture_url: publicUrl.publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      console.error("❌ Erreur mise à jour profil:", updateError);
      throw new Error(
        `Erreur lors de la mise à jour du profil: ${updateError.message}`
      );
    }

    console.log("✅ Profil mis à jour avec succès");
    revalidatePath("/dashboard/profile");
    return { success: true, url: publicUrl.publicUrl };
  } catch (error) {
    console.error("❌ Erreur mise à jour photo de profil:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Une erreur est survenue lors de la mise à jour de la photo de profil"
    );
  }
}
