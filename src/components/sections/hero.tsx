"use client";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white min-h-screen flex items-center">
      {/* Background patterns and gradients */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-100"
          style={{
            backgroundSize: "40px 40px",
            maskImage: "linear-gradient(to bottom, white, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
          }}
        />

        {/* Color overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-transparent to-[#7C3AED]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* SVG elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grand engrenage principal */}
        <div
          className="absolute top-[15%] right-[15%] w-40 h-40"
          style={{ animation: "float 30s ease-in-out infinite" }}
        >
          <img
            src="/engrenage.svg"
            alt="Engrenage"
            className="w-full h-full"
            style={{ animation: "spin 30s linear infinite" }}
          />
        </div>

        {/* Engrenage moyen */}
        <div
          className="absolute bottom-[20%] left-[15%] w-32 h-32"
          style={{ animation: "floatReverse 30s ease-in-out infinite" }}
        >
          <img
            src="/engrenage.svg"
            alt="Engrenage"
            className="w-full h-full"
            style={{ animation: "spinReverse 30s linear infinite" }}
          />
        </div>

        {/* Petit engrenage */}
        <div
          className="absolute top-[35%] left-[25%] w-24 h-24"
          style={{ animation: "float 30s ease-in-out infinite" }}
        >
          <img
            src="/engrenage.svg"
            alt="Engrenage"
            className="w-full h-full"
            style={{ animation: "spin 30s linear infinite" }}
          />
        </div>
      </div>

      <div className="relative w-full py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
              Pour les agences qui jonglent avec clients,{" "}
              <span className="text-[#7C3AED]">talents et deadlines</span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              <strong>
                Réduisez jusqu'à 70 % le temps perdu sur les tâches
                répétitives{" "}
              </strong>
              <i>(plannings, briefs, relances créateurs, reporting manuel…)</i>,
              pour que vos chefs de projet puissent gérer plus de clients, sans
              s'épuiser. <br></br>
              <strong>
                L'IA travaille pour vous. Vous gardez le contrôle.
              </strong>
            </p>

            {/* Tags de catégories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FF6B6B]/10 text-[#FF6B6B] font-medium transition-all hover:bg-[#FF6B6B]/20">
                <span className="mr-2">🎥</span>
                Agence d'influence
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#4ECDC4]/10 text-[#4ECDC4] font-medium transition-all hover:bg-[#4ECDC4]/20">
                <span className="mr-2">📱</span>
                Agence social media
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#FFB156]/10 text-[#F0A202] font-medium transition-all hover:bg-[#FFB156]/20">
                <span className="mr-2">💇‍♀️</span>
                Agence de talents
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors text-lg font-medium"
              >
                Réservez votre audit gratuit
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Automatisations complexes et sur-mesure</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>
                  Vous gardez la main et décidez quand l'humain intervient.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Vos données restent 100% privées</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
