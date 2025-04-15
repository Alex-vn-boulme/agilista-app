import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../../../../supabase/supabase";

export async function signUpAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const companyName = formData.get("companyName") as string;

  try {
    // 1. Créer l'utilisateur avec Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (authError) throw authError;

    // 2. Créer l'organisation
    const { data: orgData, error: orgError } = await supabase
      .from("organisations")
      .insert({
        name: companyName,
        status: "active",
      })
      .select("id")
      .single();

    if (orgError) throw orgError;

    // 3. Mettre à jour le profil utilisateur avec l'ID de l'organisation
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        organisation_id: orgData.id,
      })
      .eq("id", authData.user!.id);

    if (profileError) throw profileError;

    // 4. Ajouter le rôle d'administrateur
    const { error: roleError } = await supabase.from("user_roles").insert({
      user_id: authData.user!.id,
      role: "adminOrga",
    });

    if (roleError) throw roleError;

    revalidatePath("/");
    redirect("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    return {
      error: "Une erreur est survenue lors de la création du compte.",
    };
  }
}
