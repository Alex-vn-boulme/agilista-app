import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { BotIcon, KeyRound, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface ResetPasswordProps {
  searchParams: Promise<Message>;
}

export default async function ResetPassword({
  searchParams,
}: ResetPasswordProps) {
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
        {/* Left Section - Reset Password Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <BotIcon className="w-8 h-8 text-[#7C3AED]" />
            <span className="text-xl font-semibold">Agilista</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-medium">
              Réinitialisez votre mot de passe
            </h1>
            <p className="text-sm text-gray-600">
              Veuillez entrer votre nouveau mot de passe ci-dessous
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Nouveau mot de passe
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full h-11"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-600">
                  Confirmer le mot de passe
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full h-11"
                  required
                />
              </div>
            </div>

            <SubmitButton
              className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium"
              pendingText="Réinitialisation en cours..."
              formAction={resetPasswordAction}
            >
              Réinitialiser
            </SubmitButton>

            <div className="text-center text-sm">
              <Link
                className="text-[#7C3AED] font-medium hover:underline transition-all"
                href="/sign-in"
              >
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>

        {/* Right Section - Security info */}
        <div className="bg-[#F8F7FF] rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Sécurité du compte</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <ShieldCheck className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Protection renforcée</h3>
                <p className="text-sm text-gray-600">
                  Votre compte est protégé par des mesures de sécurité avancées
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Lock className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Mot de passe fort</h3>
                <p className="text-sm text-gray-600">
                  Utilisez un mot de passe unique avec des caractères variés
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <KeyRound className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Accès sécurisé</h3>
                <p className="text-sm text-gray-600">
                  Votre connexion est cryptée et sécurisée
                </p>
              </div>
            </div>
          </div>
        </div>

        <FormMessage message={message} />
      </div>
    </div>
  );
}
