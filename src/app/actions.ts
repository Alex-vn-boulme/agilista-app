"use server";

import { encodedRedirect } from "@/utils/utils";
import console from "console";
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

    // 1. Créer d'abord l'utilisateur dans auth.users
    // en incluant les métadonnées
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          // Ces données vont dans les raw_user_meta_data de auth.users
          name: firstName + " " + lastName,
          email: email,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/email-verified`
          : `/email-verified`,
      },
    });

    if (error) {
      console.log("Auth signup error:", error.message);

      // Vérifier si l'erreur est liée à l'URL de redirection
      if (error.message.includes("redirect") || error.message.includes("URL")) {
        console.error(
          "Redirection URL error:",
          process.env.NEXT_PUBLIC_SITE_URL
        );

        // Réessayer sans URL de redirection si c'est la cause de l'erreur
        const retrySignup = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: firstName + " " + lastName,
              email: email,
            },
          },
        });

        if (retrySignup.error) {
          return encodedRedirect(
            "error",
            "/sign-up",
            "Erreur lors de l'inscription. Veuillez réessayer."
          );
        }

        if (!retrySignup.data.user) {
          return encodedRedirect(
            "error",
            "/sign-up",
            "Erreur lors de l'inscription. Veuillez réessayer."
          );
        }
      } else {
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
    }

    // NOTE IMPORTANTE: Nous n'insérons plus manuellement dans la table users
    // Cette opération est maintenant gérée par le trigger 'on_auth_user_created'
    // défini dans les migrations SQL, qui copie les données de auth.users dans public.users

    // Si nous arrivons ici, l'inscription a réussi
    console.log("User created successfully:", email);
  } catch (error) {
    console.log("Unexpected error during signup:", error);
    return encodedRedirect(
      "error",
      "/sign-up",
      "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
    );
  }

  // Rediriger vers la page de confirmation
  console.log("Signup successful, redirecting to email verification page...");
  return encodedRedirect(
    "success",
    "/email-verification",
    `Inscription réussie. Un email de confirmation a été envoyé à ${email}`
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "L'email et le mot de passe sont obligatoires"
    );
  }

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

    // Vérifier le statut de l'utilisateur - Corriger la requête en vérifiant par ID et non par user_id
    try {
      // Tenter d'abord avec user_id
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle();

      // Si la première tentative échoue, essayer avec id
      if (userError || !userData) {
        const { data: userDataById, error: userErrorById } = await supabase
          .from("users")
          .select("status")
          .eq("id", user.id)
          .maybeSingle();

        // Si les deux tentatives échouent, considérer l'utilisateur comme actif
        if (userErrorById || !userDataById) {
          console.log(
            "Utilisateur non trouvé dans la table users, mais authentifié. Considéré comme actif."
          );
        } else if (userDataById?.status === "inactive") {
          return encodedRedirect(
            "error",
            "/sign-in",
            "Votre compte a été désactivé. Veuillez contacter le support."
          );
        }
      } else if (userData?.status === "inactive") {
        return encodedRedirect(
          "error",
          "/sign-in",
          "Votre compte a été désactivé. Veuillez contacter le support."
        );
      }
    } catch (userQueryError) {
      console.error("Error querying user status:", userQueryError);
      // Ne pas bloquer la connexion en cas d'erreur de vérification du statut
      // Laisser l'utilisateur se connecter quand même
    }

    // Tentative de redirection vers le dashboard avec URL complète et sans query params
    // Utiliser le chemin relatif pour éviter les problèmes de redirection cross-origin
    console.log("Authentication successful, redirecting to dashboard...");

    // Utiliser encodedRedirect pour la redirection avec un statut "success"
    return encodedRedirect("success", "/dashboard", "Connexion réussie");
  } catch (error) {
    console.error("Unexpected error during sign in:", error);
    return encodedRedirect(
      "error",
      "/sign-in",
      "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
    );
  }
};
