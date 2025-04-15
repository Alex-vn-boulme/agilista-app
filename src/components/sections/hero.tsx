import { ArrowUpRight, Calendar, Check, FileText, Mail } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
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

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
              Libérez-vous des tâches répétitives,{" "}
              <span className="text-[#7C3AED]">
                recentrez-vous sur votre métier
              </span>
            </h1>

            <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Nous automatisons les tâches qui mobilisent vos équipes au
              quotidien avec une{" "}
              <strong>
                précision et une personnalisation rendues possibles par l'IA
              </strong>
              . <br></br>Vous <strong>gagnez plus de 10h par semaine</strong>,
              sans rien perdre en <strong>qualité</strong> ni en{" "}
              <strong>contrôle</strong>.
            </p>

            {/* Tags de catégories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-medium">
                <Mail className="w-4 h-4 mr-2" />
                Traitement des emails
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-medium">
                <FileText className="w-4 h-4 mr-2" />
                Gestion administrative
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] font-medium">
                <Calendar className="w-4 h-4 mr-2" />
                Organisation & Planning
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
                <span>Automatisation complexes et personnalisée</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Vous gardez la main en permanence</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-[#7C3AED]" />
                <span>Vos données restent privées</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://cal.com/rebecca-pari/30min"
                className="px-6 py-3 text-sm font-medium text-white bg-[#7C3AED] rounded-md hover:bg-[#6D28D9] transition-colors shadow-sm hover:shadow-md"
              >
                Planifier mon audit gratuit
              </Link>
              <Link
                href="#how-it-works"
                className="px-6 py-3 text-sm font-medium text-[#7C3AED] border border-[#7C3AED] rounded-md hover:bg-[#7C3AED] hover:text-white transition-colors"
              >
                Découvrir le processus
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
