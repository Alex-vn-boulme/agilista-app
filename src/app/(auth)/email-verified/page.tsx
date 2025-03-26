import {
  BotIcon,
  CheckCircle2,
  Lock,
  LucideShield,
  Rocket,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function EmailVerified() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      {/* Colonne gauche - Formulaire */}
      <div className="flex flex-col items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center">
            <Image
              src="/logo-agilista.png"
              alt="Agilista Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <BotIcon className="h-6 w-6 text-[#7C3AED]" />
          </div>

          <div className="text-center space-y-6">
            <div className="mx-auto flex justify-center">
              <div className="rounded-full bg-green-50 p-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl font-bold">
                Email vérifié avec succès !
              </h1>
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

      {/* Colonne droite - Informations complémentaires */}
      <div className="hidden md:flex flex-col justify-center p-8 bg-[#F8F7FF]">
        <div className="max-w-md mx-auto space-y-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Bienvenue chez Agilista
          </h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <Rocket className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Commencez rapidement</h3>
                <p className="text-gray-600">
                  Notre interface intuitive vous permet de prendre en main
                  Agilista en quelques minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Compte sécurisé</h3>
                <p className="text-gray-600">
                  Votre compte est maintenant actif et sécurisé. Vos données
                  sont protégées selon les standards les plus stricts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#7C3AED]">
                <LucideShield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  Optimisez votre workflow
                </h3>
                <p className="text-gray-600">
                  Découvrez nos outils pour améliorer l'efficacité de vos
                  équipes et simplifier votre gestion de projet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
