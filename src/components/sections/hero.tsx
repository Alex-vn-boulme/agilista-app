"use client";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white min-h-screen flex items-center">
      {/* Background avec éléments animés */}
      <div className="absolute inset-0">
        {/* Cercles décoratifs flottants */}
        <div className="w-[500px] h-[500px] bg-[#7C3AED]/1 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#4ECDC4]/10 rounded-full blur-3xl animate-pulse-slow" />

        {/* Lignes décoratives */}
        <div className="absolute top-1/4 left-1/4 w-1 h-32 bg-gradient-to-b from-[#7C3AED]/20 to-transparent animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-32 bg-gradient-to-t from-[#4ECDC4]/20 to-transparent animate-float-delayed" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white/90" />
      </div>

      {/* Contenu principal */}
      <div className="relative w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            {/* Titre avec animation de fade-in */}
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight animate-fade-in">
              Gérez plus de clients, <br />
              <span className="text-[#7C3AED] relative">
                sans épuiser vos équipes
                <svg
                  className="absolute -right-8 top-0 w-6 h-6 text-[#7C3AED]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Fini de jongler entre clients, talents et deadlines, l'IA gère
              pour vous{" "}
              <i>(plannings, briefs, relances créateurs, reporting manuel…)</i>{" "}
              <strong>et vous gardez le contrôle. </strong>
            </p>

            {/* Tags avec hover effect amélioré */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-medium transition-all hover:bg-[#FF6B6B]/20 hover:scale-105">
                <span className="mr-2">🎥</span>
                Agence d'influence
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium transition-all hover:bg-[#4ECDC4]/20 hover:scale-105">
                <span className="mr-2">📱</span>
                Agence social media
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFB156]/10 text-[#F0A202] font-medium transition-all hover:bg-[#FFB156]/20 hover:scale-105">
                <span className="mr-2">💇‍♀️</span>
                Agence de talents
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
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2 whitespace-nowrap group hover:text-[#7C3AED] transition-colors">
                <div className="p-1 rounded-full bg-[#7C3AED]/10 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Check className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <span>Automatisations complexes et sur-mesure</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap group hover:text-[#7C3AED] transition-colors">
                <div className="p-1 rounded-full bg-[#7C3AED]/10 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Check className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <span>
                  Vous gardez la main et décidez quand l'humain intervient
                </span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap group hover:text-[#7C3AED] transition-colors">
                <div className="p-1 rounded-full bg-[#7C3AED]/10 group-hover:bg-[#7C3AED]/20 transition-colors">
                  <Check className="w-4 h-4 text-[#7C3AED]" />
                </div>
                <span>Vos données restent 100% privées</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 4s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float 4s infinite ease-in-out;
          animation-delay: 2s;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
