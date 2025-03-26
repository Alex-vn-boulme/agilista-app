"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BotIcon, Lock, Shield, UserPlus, Zap } from "lucide-react";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

interface SignUpProps {
  searchParams: {
    message?: string;
    error?: string;
    success?: string;
    redirect?: string;
  };
}

export default function SignUp({ searchParams }: SignUpProps) {
  const { message, error, success } = searchParams;

  // Construire l'objet message pour FormMessage
  let messageObj: Message | null = null;

  if (error) {
    messageObj = { error };
  } else if (success) {
    messageObj = { success };
  } else if (message) {
    messageObj = { message };
  }

  if (messageObj) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={messageObj} />
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Colonne gauche - Formulaire */}
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <BotIcon className="w-8 h-8 text-[#7C3AED]" />
            <span className="text-xl font-semibold">Agilista</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Créez votre compte</h1>
              <p className="text-gray-600">
                Rejoignez notre plateforme d'automatisation
              </p>
            </div>

            <form
              action={signUpAction}
              className="space-y-4 w-full"
              onSubmit={(e) => {
                const form = e.target as HTMLFormElement;
                const passwordInput = form.querySelector(
                  'input[name="password"]'
                ) as HTMLInputElement;
                if (passwordInput.value.length < 6) {
                  e.preventDefault();
                  alert("Le mot de passe doit contenir au moins 6 caractères");
                  return false;
                }

                const emailInput = form.querySelector(
                  'input[name="email"]'
                ) as HTMLInputElement;
                const emailRegex =
                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(emailInput.value)) {
                  e.preventDefault();
                  alert("Veuillez entrer une adresse email valide");
                  return false;
                }

                const firstNameInput = form.querySelector(
                  'input[name="first_name"]'
                ) as HTMLInputElement;
                const lastNameInput = form.querySelector(
                  'input[name="last_name"]'
                ) as HTMLInputElement;
                if (
                  firstNameInput.value.length < 2 ||
                  lastNameInput.value.length < 2
                ) {
                  e.preventDefault();
                  alert(
                    "Le prénom et le nom doivent contenir au moins 2 caractères"
                  );
                  return false;
                }
              }}
            >
              {searchParams.redirect && (
                <input
                  type="hidden"
                  name="redirect"
                  value={searchParams.redirect}
                />
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="first_name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Prénom
                </Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="Jean"
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="last_name"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Nom
                </Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Dupont"
                  required
                  minLength={2}
                  maxLength={50}
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Email professionnel
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jean.dupont@entreprise.com"
                  required
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Veuillez entrer une adresse email valide"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <div className="absolute right-3 top-2.5 text-gray-400">
                    <Lock size={16} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">Au moins 6 caractères</p>
              </div>

              <SubmitButton
                className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium mt-6"
                pendingText="Création en cours..."
              >
                Créer mon compte
              </SubmitButton>

              <div className="text-center text-sm mt-4">
                Déjà inscrit?{" "}
                <Link
                  className="text-[#7C3AED] font-medium hover:underline transition-all"
                  href="/sign-in"
                >
                  Connectez-vous
                </Link>
              </div>
            </form>

            {messageObj && <FormMessage message={messageObj} />}
          </div>
        </div>
      </div>

      {/* Colonne droite - Informations complémentaires */}
      <div className="hidden md:flex flex-col justify-center p-8 bg-[#F8F7FF]">
        <div className="max-w-md mx-auto space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Pourquoi nous rejoindre
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Inscription simple</h3>
                <p className="text-gray-600">
                  Créez votre compte en quelques secondes et commencez
                  immédiatement
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Sécurité garantie</h3>
                <p className="text-gray-600">
                  Vos données sont protégées et sécurisées selon les standards
                  les plus stricts
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Automatisations puissantes
                </h3>
                <p className="text-gray-600">
                  Accédez à des outils performants pour transformer votre
                  productivité
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden">
        <SmtpMessage />
      </div>
    </div>
  );
}
