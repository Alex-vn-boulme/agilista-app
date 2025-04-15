import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("User not authenticated, redirecting to sign-in");
    return redirect("/sign-in");
  }

  console.log("Authenticated user ID:", user.id);

  // Fetch user profile data - essayer d'abord avec user_id
  const { data: profileByUserId, error: errorByUserId } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  console.log("Profile by user_id query result:", {
    profileByUserId,
    errorByUserId,
  });

  // Si le profil n'est pas trouvé via user_id, essayer avec id
  let profile = profileByUserId;
  if (!profile) {
    const { data: profileById, error: errorById } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    console.log("Profile by id query result:", { profileById, errorById });
    profile = profileById;
  }

  // Si le profil n'est toujours pas trouvé, tenter de retrouver par email
  if (!profile) {
    const { data: profileByEmail, error: errorByEmail } = await supabase
      .from("users")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    console.log("Profile by email query result:", {
      profileByEmail,
      errorByEmail,
    });
    profile = profileByEmail;
  }

  // Si après toutes les tentatives, le profil n'est toujours pas trouvé
  if (!profile) {
    console.error("Profile not found for user:", user.id, user.email);

    // Extraire firstName et lastName des métadonnées utilisateur
    const userMetadata = user.user_metadata || {};
    const firstName = userMetadata.first_name || userMetadata.firstName || "";
    const lastName = userMetadata.last_name || userMetadata.lastName || "";
    const fullName =
      userMetadata.full_name ||
      userMetadata.name ||
      `${firstName} ${lastName}`.trim() ||
      user.email;

    // Au lieu de rediriger, créer un profil minimal pour permettre la navigation
    profile = {
      id: user.id,
      user_id: user.id,
      email: user.email,
      name: fullName,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
      role: "user",
      status: "active",
      created_at: new Date().toISOString(),
      organization_id: null,
    };

    console.log("Created minimal profile:", profile);
  } else {
    // Si un profil a été trouvé, chercher l'organisation associée si elle existe
    if (profile.organization_id) {
      try {
        const { data: organizationData, error: orgError } = await supabase
          .from("organizations")
          .select("*")
          .eq("id", profile.organization_id)
          .single();

        if (!orgError && organizationData) {
          // Enrichir le profil avec les données de l'organisation
          profile.organization = organizationData;
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      }
    }
  }

  // Make the profile available in page props using a hidden data attribute
  return <div data-profile={JSON.stringify(profile)}>{children}</div>;
}
