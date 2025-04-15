"use server";

import { createRedirectUrl } from "@/utils/utils";
import { redirect } from "next/navigation";
import { createClient } from "../../supabase/server";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  const firstName = formData.get("first_name")?.toString().trim() || "";
  const lastName = formData.get("last_name")?.toString().trim() || "";

  if (!email || !password) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/sign-up",
        "L'email et le mot de passe sont obligatoires"
      )
    );
  }

  if (password.length < 6) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/sign-up",
        "Le mot de passe doit contenir au moins 6 caractères"
      )
    );
  }

  if (firstName.length < 2 || lastName.length < 2) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/sign-up",
        "Le prénom et le nom doivent contenir au moins 2 caractères"
      )
    );
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw redirect(
      createRedirectUrl("error", "/sign-up", "L'adresse email n'est pas valide")
    );
  }

  const supabase = await createClient();

  try {
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-up",
          "Cette adresse email est déjà utilisée"
        )
      );
    }

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
          email: email,
          status: "active",
          raw_user_meta_data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/email-verified`
          : `/email-verified`,
      },
    });

    if (error) {
      console.log("Auth signup error:", error.message);

      if (error.message.includes("redirect") || error.message.includes("URL")) {
        console.error(
          "Redirection URL error:",
          process.env.NEXT_PUBLIC_SITE_URL
        );

        const retrySignup = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
              email: email,
              status: "active",
              raw_user_meta_data: {
                first_name: firstName,
                last_name: lastName,
              },
            },
          },
        });

        if (retrySignup.error) {
          throw redirect(
            createRedirectUrl(
              "error",
              "/sign-up",
              "Erreur lors de l'inscription. Veuillez réessayer."
            )
          );
        }

        if (!retrySignup.data.user) {
          throw redirect(
            createRedirectUrl(
              "error",
              "/sign-up",
              "Erreur lors de l'inscription. Veuillez réessayer."
            )
          );
        }
      } else {
        if (error.message.includes("email")) {
          throw redirect(
            createRedirectUrl(
              "error",
              "/sign-up",
              "Format d'email invalide ou déjà utilisé"
            )
          );
        } else if (error.message.includes("password")) {
          throw redirect(
            createRedirectUrl(
              "error",
              "/sign-up",
              "Le mot de passe ne respecte pas les critères de sécurité"
            )
          );
        } else {
          throw redirect(createRedirectUrl("error", "/sign-up", error.message));
        }
      }
    }

    // Créer l'entrée dans la table profiles
    if (user?.id) {
      console.log("Creating profile for user:", user.id);
      const { error: userError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          status: "active",
        },
      ]);

      if (userError) {
        console.error("Error creating profile entry:", userError);
        console.error(
          "Full error details:",
          JSON.stringify(userError, null, 2)
        );
        throw redirect(
          createRedirectUrl(
            "error",
            "/sign-up",
            "Erreur lors de la création du profil utilisateur"
          )
        );
      }

      // Créer un rôle par défaut pour l'utilisateur
      console.log("Creating role for user:", user.id);
      const { error: roleError } = await supabase.from("user_roles").insert([
        {
          user_id: user.id,
          role: "member" as const,
          created_at: new Date().toISOString(),
        },
      ]);

      if (roleError) {
        console.error("Error creating user role:", roleError);
        console.error(
          "Full role error details:",
          JSON.stringify(roleError, null, 2)
        );
        throw redirect(
          createRedirectUrl(
            "error",
            "/sign-up",
            "Erreur lors de la création du rôle utilisateur"
          )
        );
      }
    }

    console.log("User created successfully:", email);
  } catch (error) {
    if (error instanceof Error) {
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-up",
          "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
        )
      );
    }
    throw error;
  }

  throw redirect(
    createRedirectUrl(
      "success",
      "/email-verification",
      `Inscription réussie. Un email de confirmation a été envoyé à ${email}`
    )
  );
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/sign-in",
        "L'email et le mot de passe sont obligatoires"
      )
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
      throw redirect(
        createRedirectUrl("error", "/sign-in", signInError.message)
      );
    }

    if (!user) {
      throw redirect(
        createRedirectUrl("error", "/sign-in", "Utilisateur introuvable")
      );
    }

    if (!user.email_confirmed_at) {
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-in",
          "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation."
        )
      );
    }

    const { data: userData, error: userError } = await supabase
      .from("profiles")
      .select("status")
      .eq("id", user.id)
      .single();

    if (userError) {
      console.error("Error fetching user status:", userError);
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-in",
          "Une erreur est survenue lors de la vérification de votre compte"
        )
      );
    }

    if (userData?.status === "inactive") {
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-in",
          "Votre compte a été désactivé. Veuillez contacter le support."
        )
      );
    }

    throw redirect(
      createRedirectUrl("success", "/dashboard", "Connexion réussie")
    );
  } catch (error) {
    if (error instanceof Error && !error.message.includes("NEXT_REDIRECT")) {
      console.error("Unexpected error during sign in:", error);
      throw redirect(
        createRedirectUrl(
          "error",
          "/sign-in",
          "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
        )
      );
    }
    throw error;
  }
};

// Fonction pour demander la réinitialisation du mot de passe
export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email") as string;

  if (!email) {
    throw redirect(
      createRedirectUrl("error", "/forgot-password", "L'email est obligatoire")
    );
  }

  // Vérifier que l'email a un format valide
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/forgot-password",
        "L'adresse email n'est pas valide"
      )
    );
  }

  const supabase = await createClient();

  try {
    // Vérifier si l'utilisateur existe
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (!existingUser) {
      // Ne pas révéler que l'utilisateur n'existe pas pour des raisons de sécurité
      throw redirect(
        createRedirectUrl(
          "success",
          "/forgot-password",
          "Si cet email existe dans notre base de données, un lien de réinitialisation a été envoyé."
        )
      );
    }

    // Définir l'URL de redirection
    const redirectTo = process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`
      : `http://localhost:3000/reset-password`;

    // Envoyer l'email de réinitialisation
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      console.error("Error sending reset password email:", error);

      // Message d'erreur générique pour ne pas révéler trop d'informations
      throw redirect(
        createRedirectUrl(
          "error",
          "/forgot-password",
          "Une erreur est survenue. Veuillez réessayer ultérieurement."
        )
      );
    }

    throw redirect(
      createRedirectUrl(
        "success",
        "/forgot-password",
        "Un email de réinitialisation a été envoyé à votre adresse email."
      )
    );
  } catch (error) {
    console.error("Unexpected error during password reset:", error);
    throw redirect(
      createRedirectUrl(
        "error",
        "/forgot-password",
        "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
      )
    );
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPasswordAction = async (formData: FormData) => {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/reset-password",
        "Tous les champs sont obligatoires"
      )
    );
  }

  if (password.length < 6) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/reset-password",
        "Le mot de passe doit contenir au moins 6 caractères"
      )
    );
  }

  if (password !== confirmPassword) {
    throw redirect(
      createRedirectUrl(
        "error",
        "/reset-password",
        "Les mots de passe ne correspondent pas"
      )
    );
  }

  const supabase = await createClient();

  try {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      console.error("Error resetting password:", error);
      throw redirect(
        createRedirectUrl(
          "error",
          "/reset-password",
          "Une erreur est survenue lors de la réinitialisation du mot de passe"
        )
      );
    }

    throw redirect(
      createRedirectUrl(
        "success",
        "/sign-in",
        "Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter."
      )
    );
  } catch (error) {
    console.error("Unexpected error during password update:", error);
    throw redirect(
      createRedirectUrl(
        "error",
        "/reset-password",
        "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement."
      )
    );
  }
};

export async function checkUserSubscription(userId: string) {
  const supabase = await createClient();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .single();

  return subscription?.status === "active";
}
