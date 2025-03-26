import { BotIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function EmailVerified() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7FF] p-4">
      <div className="w-full max-w-[500px] rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="mx-auto flex justify-center">
            <div className="rounded-full bg-green-50 p-4">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Email vérifié avec succès !</h1>
            <p className="text-gray-600">
              Votre adresse email a été confirmée. Vous pouvez maintenant vous
              connecter à votre compte.
            </p>
          </div>

          <div className="bg-[#F8F7FF] rounded-lg p-6 text-left">
            <h2 className="font-medium text-lg mb-4 flex items-center">
              <BotIcon className="w-5 h-5 text-[#7C3AED] mr-2" />
              Que se passe-t-il maintenant ?
            </h2>
            <p className="text-gray-600 mb-4">
              Vous avez maintenant accès à toutes les fonctionnalités
              d'Agilista. Connectez-vous pour commencer à utiliser notre
              plateforme.
            </p>

            <Link
              href="/sign-in"
              className="w-full inline-flex justify-center items-center px-6 py-3 text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors font-medium"
            >
              Se connecter
            </Link>
          </div>

          <div className="pt-4 border-t border-gray-100 text-sm text-gray-500">
            Besoin d'aide ?{" "}
            <Link href="#" className="text-[#7C3AED] hover:underline">
              Contactez notre support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
