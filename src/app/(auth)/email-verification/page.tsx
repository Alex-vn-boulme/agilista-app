import { BotIcon, Check, Mail } from "lucide-react";
import Link from "next/link";

interface EmailVerificationProps {
  searchParams: { email?: string };
}

export default function EmailVerification({
  searchParams,
}: EmailVerificationProps) {
  const email = searchParams.email || "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8F7FF] p-4">
      <div className="w-full max-w-[600px] rounded-xl bg-white p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="mx-auto flex justify-center">
            <div className="rounded-full bg-[#F8F7FF] p-4">
              <Mail className="w-12 h-12 text-[#7C3AED]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              Vérifiez votre boîte de réception
            </h1>
            <p className="text-gray-600">
              Nous avons envoyé un email de confirmation à{" "}
              <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="bg-[#F8F7FF] rounded-lg p-6 text-left">
            <h2 className="font-medium text-lg mb-4">Prochaines étapes :</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#7C3AED] mt-0.5" />
                <div>
                  <p className="font-medium">
                    Consultez votre boîte de réception
                  </p>
                  <p className="text-sm text-gray-600">
                    Vérifiez également vos dossiers spam et promotions si vous
                    ne trouvez pas l'email.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#7C3AED] mt-0.5" />
                <div>
                  <p className="font-medium">
                    Cliquez sur le lien de confirmation
                  </p>
                  <p className="text-sm text-gray-600">
                    Le mail contient un lien unique pour valider votre compte.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#7C3AED] mt-0.5" />
                <div>
                  <p className="font-medium">Connectez-vous à votre compte</p>
                  <p className="text-sm text-gray-600">
                    Une fois votre email vérifié, vous pourrez vous connecter et
                    accéder à la plateforme.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-600">
            Vous n'avez pas reçu l'email ? Vérifiez votre dossier spam ou{" "}
            <Link href="/sign-up" className="text-[#7C3AED] hover:underline">
              réessayez avec une autre adresse
            </Link>
          </p>

          <div className="pt-4 border-t border-gray-100">
            <Link
              href="/sign-in"
              className="inline-flex items-center text-[#7C3AED] hover:underline"
            >
              <BotIcon className="w-4 h-4 mr-2" />
              Revenir à la page de connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
