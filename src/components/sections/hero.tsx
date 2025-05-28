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
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8 tracking-tight animate-fade-in">
<<<<<<< HEAD
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <span>Gérez plus de</span>
                <span className="flex items-center">
                  <div className="inline-block relative h-[1.2em] w-[190px] overflow-hidden">
                    <div className="words-rotate absolute left-0 right-0">
                      <div className="flex items-center justify-center h-[1.2em] text-[#7C3AED]">
                        clients
                      </div>
                      <div className="flex items-center justify-center h-[1.2em] text-[#FF9F87]">
                        talents
                      </div>
                      <div className="flex items-center justify-center h-[1.2em] text-[#64B5F6]">
                        briefs
                      </div>
                    </div>
                  </div>
                  <span>,</span>
                </span>
              </div>
              <div className="flex items-center justify-center mt-2">
                <span className="relative">
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
              </div>
=======
              <span>
                Votre équipe d'assistants IA, prête à renforcer la vôtre
              </span>
>>>>>>> landing-tpe
            </h1>

            <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ils organisent, anticipent et soulagent votre équipe.{" "}
              <strong>Jusqu'à 30 % de votre temps récupéré</strong>, sans
              embaucher tout de suite.
            </p>

            {/* Tags avec hover effect amélioré */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-medium transition-all hover:bg-[#FF6B6B]/20 hover:scale-105">
                <span className="mr-2">✉️</span>
                Traitement des emails
              </div>
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium transition-all hover:bg-[#4ECDC4]/20 hover:scale-105">
                <span className="mr-2">📄</span>
                Gestion administrative
              </div>
              <div className="inline-flex items-center px-6 py-2 rounded-full bg-[#FFB156]/10 text-[#F0A202] font-medium transition-all hover:bg-[#FFB156]/20 hover:scale-105">
                <span className="mr-2">🗓️</span>
                Organisation & Planning
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

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.5;
          }
        }
        @keyframes pulse-slow-delayed {
          0%,
          100% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1);
            opacity: 0.5;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite ease-in-out;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 10s infinite ease-in-out;
          animation-delay: 5s;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(10px);
          }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
        .animate-float-delayed {
          animation: float 6s infinite ease-in-out;
          animation-delay: 3s;
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
        .words-rotate {
          animation: rotate 8s cubic-bezier(0.4, 0.1, 0.2, 1) infinite;
        }
        @keyframes rotate {
          0%,
          32% {
            transform: translateY(0);
          }
          35%,
          65% {
            transform: translateY(-1.2em);
          }
          68%,
          98% {
            transform: translateY(-2.4em);
          }
          100% {
            transform: translateY(-3.6em);
          }
        }
      `}</style>
    </div>
  );
}
