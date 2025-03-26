import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { BotIcon, Lock, Shield, UserPlus, Zap } from "lucide-react";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

interface SignUpProps {
  searchParams: Promise<Message>;
}

export default async function SignUp({ searchParams }: SignUpProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7FF] p-4">
      <div className="w-full max-w-[1000px] rounded-xl bg-white p-8 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Section - Sign Up Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <BotIcon className="w-8 h-8 text-[#7C3AED]" />
            <span className="text-xl font-semibold">Agilista</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-medium">Créez votre compte</h1>
            <p className="text-sm text-gray-600">
              Rejoignez notre plateforme d'automatisation
            </p>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              const form = e.currentTarget;
              // Vérification des mots de passe
              const password = form.password.value;
              if (password.length < 6) {
                e.preventDefault();
                alert("Le mot de passe doit contenir au moins 6 caractères.");
                return;
              }
            }}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Prénom</label>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="Jean"
                    className="w-full h-11"
                    required
                    minLength={2}
                    maxLength={50}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-gray-600">Nom</label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Dupont"
                    className="w-full h-11"
                    required
                    minLength={2}
                    maxLength={50}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Email professionnel
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="votreemail@entreprise.com"
                  className="w-full h-11"
                  required
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <p className="text-xs text-gray-500">
                  Utilisez un email valide que vous consultez régulièrement
                </p>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="w-full h-11 pr-10"
                    minLength={6}
                    required
                  />
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">Minimum 6 caractères</p>
              </div>
            </div>

            <SubmitButton
              className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium"
              pendingText="Création en cours..."
              formAction={signUpAction}
            >
              Créer mon compte
            </SubmitButton>

            <div className="text-center text-sm">
              Déjà inscrit?{" "}
              <Link
                className="text-[#7C3AED] font-medium hover:underline transition-all"
                href="/sign-in"
              >
                Connectez-vous
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section - Benefits */}
        <div className="bg-[#F8F7FF] rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Pourquoi nous rejoindre</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <UserPlus className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Inscription simple</h3>
                <p className="text-sm text-gray-600">
                  Créez votre compte en quelques secondes
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Shield className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Sécurité garantie</h3>
                <p className="text-sm text-gray-600">
                  Vos données sont protégées et sécurisées
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Zap className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Automatisations puissantes</h3>
                <p className="text-sm text-gray-600">
                  Accédez à des outils pour transformer votre productivité
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormMessage message={message} />
      </div>
      <div className="hidden">
        <SmtpMessage />
      </div>
    </div>
  );
}
