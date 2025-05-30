"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-[#F5F3FF] to-[#EDE9FE] min-h-screen flex items-center pt-10 sm:pt-0">
      {/* Contenu principal */}
      <div className="relative w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Titre avec animation de fade-in et mots rotatifs */}
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight animate-fade-in">
              Des <span className="text-[#7C3AED]">IA sur mesure</span> qui travaillent avec vous.
            </h1>

            <div className="max-w-[680px] mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-3">
                Elles organisent, anticipent et soulagent votre équipe.
                Une solution pensée pour les petites équipes exigeantes.
              </p>
            </div>

            {/* Tags avec hover effect amélioré */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 mt-12">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-medium transition-all hover:bg-[#FF6B6B]/20 hover:scale-105">
                <span className="mr-2">✉️</span>
                Emails pris en charge
              </div>
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium transition-all hover:bg-[#4ECDC4]/20 hover:scale-105">
                <span className="mr-2">📄</span>
                Docs classés sans effort
              </div>
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#FFB156]/10 text-[#F0A202] font-medium transition-all hover:bg-[#FFB156]/20 hover:scale-105">
                <span className="mr-2">🗓️</span>
                Suivi client au carré
              </div>
            </div>

            {/* CTA avec effet de hover amélioré */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="https://cal.com/rebecca-pari/30min"
                className="inline-flex items-center px-8 py-4 text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-all hover:scale-105 hover:shadow-lg shadow-md"
              >
                Demander un audit gratuit
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            {/* Features avec icônes améliorées */}
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-lg text-gray-900 font-bold">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-green-600 text-2xl">✅</span>
                <span>Automatisations complexes et sur-mesure</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-green-600 text-2xl">✅</span>
                <span>
                  Vous gardez la main et décidez quand l'humain intervient.
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="text-green-600 text-2xl">✅</span>
                <span>Données 100 % privées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}