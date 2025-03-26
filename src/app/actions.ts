"use server";

import { encodedRedirect } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  // Récupération des données du formulaire
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const firstName = formData.get("first_name")?.toString().trim() || "";
  const lastName = formData.get("last_name")?.toString().trim() || "";
  const fullName = `${firstName} ${lastName}`.trim();

  // Validation des données
  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "L'email et le mot de passe sont obligatoires"
    );
  }

  if (password.length < 6) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Le mot de passe doit contenir au moins 6 caractères"
    );
  }

  if (firstName.length < 2 || lastName.length < 2) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "Le prénom et le nom doivent contenir au moins 2 caractères"
    );
  }

  // Vérifier que l'email a un format valide
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return encodedRedirect(
      "error",
      "/sign-up",
      "L'adresse email n'est pas valide"
    );
  }

  const supabase = await createClient();

  try {
    // Vérifier si l'email existe déjà
    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Cette adresse email est déjà utilisée"
      );
    }

    // Inscription de l'utilisateur
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          email: email,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/email-verified`,
      },
    });

    if (error) {
      console.log("Auth signup error:", error.message);

      // Messages d'erreur personnalisés selon le type d'erreur
      if (error.message.includes("email")) {
        return encodedRedirect(
          "error",
          "/sign-up",
          "Format d'email invalide ou déjà utilisé"
        );
      } else if (error.message.includes("password")) {
        return encodedRedirect(
          "error",
          "/sign-up",
          "Le mot de passe ne respecte pas les critères de sécurité"
        );
      } else {
        return encodedRedirect("error", "/sign-up", error.message);
      }
    }

    if (user) {
      try {
        // Insertion des données utilisateur dans la table users
        const { error: updateError } = await supabase.from("users").insert({
          id: user.id,
          user_id: user.id,
          name: fullName,
          first_name: firstName,
          last_name: lastName,
          email: email,
          token_identifier: user.id,
          role: "org_member",
          status: "active",
          plan: "free",
          created_at: new Date().toISOString(),
          raw_user_meta_data: {
            first_name: firstName,
            last_name: lastName,
          },
        });

        if (updateError) {
          console.log("Error updating user:", updateError.message);

          // Tentative de suppression de l'utilisateur en cas d'échec de l'insertion
          await supabase.auth.admin.deleteUser(user.id);

          return encodedRedirect(
            "error",
            "/sign-up",
            "Erreur lors de la création du profil. Veuillez réessayer."
          );
        }
      } catch (err) {
        console.log("Exception in user update:", err);

        // Tentative de suppression de l'utilisateur en cas d'erreur
        await supabase.auth.admin.deleteUser(user.id);

        return encodedRedirect(
          "error",
          "/sign-up",
          "Erreur lors de la création du profil. Veuillez réessayer."
        );
      }
    } else {
      return encodedRedirect(
        "error",
        "/sign-up",
        "Erreur lors de la création du compte. Veuillez réessayer."
      );
    }
  } catch (error) {
    console.log("Unexpected error during signup:", error);
    return encodedRedirect(
      "error",
      "/sign-up",
      "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
    );
  }

  // Rediriger vers la page de confirmation
  return redirect(`/email-verification?email=${encodeURIComponent(email)}`);
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  try {
    const {
      data: { user },
      error: signInError,
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      return encodedRedirect("error", "/sign-in", signInError.message);
    }

    if (!user) {
      return encodedRedirect("error", "/sign-in", "Utilisateur introuvable");
    }

    // Vérifier que l'email a été confirmé
    if (!user.email_confirmed_at) {
      return encodedRedirect(
        "error",
        "/sign-in",
        "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation."
      );
    }

    // Log user info to debug
    console.log("User authenticated:", user.id);

    // Get user role from the users table - try with both id and user_id
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (userError) {
      console.log("Error fetching user data by id:", userError.message);

      // Try with user_id instead
      const { data: userData2, error: userError2 } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (userError2) {
        console.log("Error fetching user data by user_id:", userError2.message);
        return encodedRedirect(
          "error",
          "/sign-in",
          "Erreur lors de la récupération des données utilisateur"
        );
      }

      if (!userData2) {
        // Create user record if missing
        const { error: insertError } = await supabase.from("users").insert({
          id: user.id,
          user_id: user.id,
          email: user.email,
          token_identifier: user.id,
          role: "org_member",
          status: "active",
          plan: "free",
          created_at: new Date().toISOString(),
        });

        if (insertError) {
          console.log("Error creating user record:", insertError.message);
          return encodedRedirect(
            "error",
            "/sign-in",
            "Erreur lors de la création du profil utilisateur"
          );
        }

        return redirect("/dashboard");
      }

      // Redirect based on role from userData2
      if (userData2.role === "org_member" || userData2.role === "org_admin") {
        return redirect("/dashboard");
      }

      if (userData2.role === "platform_admin") {
        return redirect("/admin/dashboard");
      }
    }

    if (!userData) {
      return encodedRedirect(
        "error",
        "/sign-in",
        "Profil utilisateur introuvable"
      );
    }

    // Redirect based on role from userData
    if (userData.role === "org_member" || userData.role === "org_admin") {
      return redirect("/dashboard");
    }

    if (userData.role === "platform_admin") {
      return redirect("/admin/dashboard");
    }

    // For any other role or if role is not set
    return encodedRedirect("error", "/sign-in", "Accès non autorisé");
  } catch (error) {
    console.log("Unexpected error:", error);
    return encodedRedirect(
      "error",
      "/sign-in",
      "Une erreur s'est produite lors de la connexion"
    );
  }
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  // Get the base URL for reset password
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "";
  const redirectTo = `${origin}/reset-password`;

  if (!email) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "L'email est obligatoire"
    );
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectTo,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Impossible de réinitialiser le mot de passe"
    );
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Vérifiez votre email pour un lien de réinitialisation de mot de passe."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "Le mot de passe et sa confirmation sont obligatoires"
    );
  }

  if (password !== confirmPassword) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "Les mots de passe ne correspondent pas"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return encodedRedirect(
      "error",
      "/reset-password",
      "La mise à jour du mot de passe a échoué"
    );
  }

  return encodedRedirect(
    "success",
    "/sign-in",
    "Mot de passe mis à jour avec succès. Vous pouvez maintenant vous connecter."
  );
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const checkUserSubscription = async (userId: string) => {
  const supabase = await createClient();

  const { data: subscription, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  if (error) {
    return false;
  }

  return !!subscription;
};
