import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { AlertCircle, BotIcon, HelpCircle, Mail } from "lucide-react";
import Link from "next/link";
import { SmtpMessage } from "../smtp-message";

interface ForgotPasswordProps {
  searchParams: Promise<Message>;
}

export default async function ForgotPassword({
  searchParams,
}: ForgotPasswordProps) {
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
        {/* Left Section - Forgot Password Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-8">
            <BotIcon className="w-8 h-8 text-[#7C3AED]" />
            <span className="text-xl font-semibold">Agilista</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-medium">Mot de passe oublié</h1>
            <p className="text-sm text-gray-600">
              Entrez votre email pour recevoir un lien de réinitialisation
            </p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
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
                />
              </div>
            </div>

            <SubmitButton
              className="w-full h-11 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium"
              pendingText="Envoi en cours..."
              formAction={forgotPasswordAction}
            >
              Envoyer le lien
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

        {/* Right Section - Information */}
        <div className="bg-[#F8F7FF] rounded-lg p-6">
          <h2 className="text-lg font-medium mb-6">Comment ça marche</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <Mail className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Email de réinitialisation</h3>
                <p className="text-sm text-gray-600">
                  Vous recevrez un email avec un lien sécurisé
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <AlertCircle className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Validité limitée</h3>
                <p className="text-sm text-gray-600">
                  Le lien est valide pendant 24 heures seulement
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow">
              <HelpCircle className="w-6 h-6 text-[#7C3AED]" />
              <div>
                <h3 className="font-medium">Besoin d'aide?</h3>
                <p className="text-sm text-gray-600">
                  Contactez notre support technique
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
