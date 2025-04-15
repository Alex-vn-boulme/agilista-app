import {
  AlertCircle,
  BotIcon,
  Check,
  Clock,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

interface EmailVerificationProps {
  searchParams: { email?: string };
}

export default function EmailVerification({
  searchParams,
}: EmailVerificationProps) {
  const email = searchParams.email || "";

  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Colonne gauche - Formulaire */}
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <BotIcon className="w-8 h-8 text-[#7C3AED]" />
            <span className="text-xl font-semibold">Agilista</span>
          </div>

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
                      Une fois votre email vérifié, vous pourrez vous connecter
                      et accéder à la plateforme.
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

      {/* Colonne droite - Informations complémentaires */}
      <div className="hidden md:flex flex-col justify-center p-8 bg-[#F8F7FF]">
        <div className="max-w-md mx-auto space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Quelques informations utiles
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Délai d'envoi</h3>
                <p className="text-gray-600">
                  Le mail peut prendre jusqu'à 5 minutes pour arriver. Soyez
                  patient.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Vérifiez tous vos dossiers
                </h3>
                <p className="text-gray-600">
                  Les filtres anti-spam peuvent parfois intercepter nos emails.
                  Vérifiez vos dossiers spam, promotions et indésirables.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Sécurité renforcée</h3>
                <p className="text-gray-600">
                  Cette étape de vérification nous permet de garantir la
                  sécurité de votre compte et de protéger vos données.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
