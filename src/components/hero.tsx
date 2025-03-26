import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F8F7FF] via-white to-[#F3F0FF] opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              TPE : libérez du temps pour{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] to-[#9F7AEA]">
                l'essentiel
              </span>
              , automatisez le reste.
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Découvrez comment optimiser votre entreprise et récupérer du temps
              pour ce qui compte vraiment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors text-lg font-medium"
              >
                Réserver un audit gratuit
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>

              <Link
                href="#problemes"
                className="inline-flex items-center px-8 py-4 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
              >
                En savoir plus
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Audit personnalisé gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Solutions adaptées à votre TPE</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Gain de temps immédiat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
