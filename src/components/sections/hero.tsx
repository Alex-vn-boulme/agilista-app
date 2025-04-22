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
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ animation: "spin 20s linear infinite" }}
          >
            {/* Cercle extérieur avec dents */}
            <path
              d="M50 5 L53 0 L57 1 L60 5 L64 2 L67 4 L69 9 L74 7 L76 10 L76 15 L82 14 L83 18 L81 23 L87 23 L87 27 L84 32 L90 33 L89 37 L85 41 L91 43 L89 47 L84 50 L89 53 L86 57 L80 59 L84 63 L80 66 L74 67 L77 72 L72 74 L65 73 L67 78 L62 79 L55 77 L55 82 L50 82 L45 77 L45 82 L40 79 L33 73 L35 78 L28 74 L23 67 L26 72 L20 66 L16 59 L20 63 L15 57 L12 50 L16 53 L11 47 L9 43 L15 43 L11 37 L10 33 L16 33 L13 27 L13 23 L19 23 L17 18 L18 14 L24 15 L24 10 L26 7 L31 9 L33 4 L36 2 L40 5 L43 1 L47 0 L50 5"
              fill="#7C3AED"
              opacity="0.9"
            />
            {/* Cercle intérieur avec motif */}
            <circle cx="50" cy="50" r="25" fill="#7C3AED" opacity="0.7" />
            {/* Rayons intérieurs */}
            <path
              d="M50 25 L50 75 M25 50 L75 50 M35 35 L65 65 M35 65 L65 35"
              stroke="#7C3AED"
              strokeWidth="4"
              opacity="0.8"
            />
            {/* Point central */}
            <circle cx="50" cy="50" r="8" fill="#7C3AED" />
            {/* Effet de brillance */}
            <circle cx="45" cy="45" r="3" fill="#fff" opacity="0.6" />
          </svg>
        </div>

        {/* Engrenage moyen */}
        <div
          className="absolute bottom-[20%] left-[15%] w-32 h-32"
          style={{ animation: "floatReverse 5s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ animation: "spinReverse 15s linear infinite" }}
          >
            {/* Cercle extérieur avec dents */}
            <path
              d="M50 10 L54 5 L58 6 L61 10 L65 8 L68 10 L69 15 L74 14 L75 17 L74 22 L79 22 L79 26 L76 31 L81 32 L80 36 L76 40 L81 42 L79 46 L74 48 L78 51 L75 55 L69 56 L72 60 L68 62 L62 61 L63 66 L58 67 L52 64 L52 69 L47 69 L42 64 L42 69 L37 67 L32 61 L34 66 L29 62 L25 56 L28 60 L24 55 L22 48 L26 51 L22 46 L21 42 L26 42 L23 36 L22 32 L27 32 L24 26 L24 22 L29 22 L28 17 L29 14 L34 15 L34 10 L36 8 L40 10 L42 6 L46 5 L50 10"
              fill="#FFB700"
              opacity="0.9"
            />
            {/* Cercle intérieur avec motif */}
            <circle cx="50" cy="50" r="20" fill="#FFB700" opacity="0.7" />
            {/* Rayons intérieurs */}
            <path
              d="M50 30 L50 70 M30 50 L70 50 M38 38 L62 62 M38 62 L62 38"
              stroke="#FFB700"
              strokeWidth="3"
              opacity="0.8"
            />
            {/* Point central */}
            <circle cx="50" cy="50" r="6" fill="#FFB700" />
            {/* Effet de brillance */}
            <circle cx="45" cy="45" r="2" fill="#fff" opacity="0.6" />
          </svg>
        </div>

        {/* Petit engrenage */}
        <div
          className="absolute top-[35%] left-[25%] w-24 h-24"
          style={{ animation: "float 7s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ animation: "spin 12s linear infinite" }}
          >
            {/* Cercle extérieur avec dents */}
            <path
              d="M50 15 L53 10 L56 11 L58 15 L61 13 L63 15 L64 20 L68 19 L69 22 L68 27 L72 27 L72 31 L69 36 L73 37 L72 41 L68 45 L72 47 L70 51 L65 53 L68 56 L65 60 L59 61 L61 65 L57 67 L51 66 L51 71 L46 71 L41 66 L41 71 L36 67 L31 61 L33 65 L28 60 L24 53 L27 56 L23 51 L21 45 L25 47 L21 41 L20 37 L24 37 L21 31 L21 27 L25 27 L24 22 L25 19 L29 20 L29 15 L31 13 L35 15 L37 11 L41 10 L50 15"
              fill="#4ECDC4"
              opacity="0.9"
            />
            {/* Cercle intérieur avec motif */}
            <circle cx="50" cy="50" r="15" fill="#4ECDC4" opacity="0.7" />
            {/* Rayons intérieurs */}
            <path
              d="M50 35 L50 65 M35 50 L65 50 M40 40 L60 60 M40 60 L60 40"
              stroke="#4ECDC4"
              strokeWidth="2"
              opacity="0.8"
            />
            {/* Point central */}
            <circle cx="50" cy="50" r="4" fill="#4ECDC4" />
            {/* Effet de brillance */}
            <circle cx="45" cy="45" r="1.5" fill="#fff" opacity="0.6" />
          </svg>
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
                  Vous gardez la main et décidez quand l’humain intervient.
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
