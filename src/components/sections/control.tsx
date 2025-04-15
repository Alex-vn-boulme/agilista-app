import Link from "next/link";

export default function Control() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Vous gardez le contrôle, à chaque étape
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            L'IA remplace le travail humain répétitif, mais vous restez maître
            du processus.
          </p>
        </div>

        {/* Processus horizontal */}
        <div className="relative mb-16 max-w-4xl mx-auto">
          {/* Ligne pointillée horizontale */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 border-dashed border-2 border-gray-200"></div>

          {/* Points du processus */}
          <div className="flex justify-between relative z-10">
            {[
              {
                icon: "🤖",
                title: "Analyse IA",
                description: "L'IA traite vos données",
              },
              {
                icon: "👁️",
                title: "Validation (si nécessaire)",
                description: "Vous vérifiez et/ou modifiez",
              },
              {
                icon: "⚡",
                title: "Exécution IA",
                description: "Actions automatisées",
              },
              {
                icon: "✅",
                title: "Supervision",
                description: "Contrôle continu",
              },
            ].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-[#7C3AED] mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Points clés en checklist */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-4 inline-block">
            {[
              "Contrôle total sur chaque étape",
              "Transparence complète du processus",
              "Validation humaine à chaque point clé",
              "Automatisation intelligente et maîtrisée",
            ].map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#7C3AED] flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <span className="text-lg">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bouton d'audit */}
        <div className="mt-12 text-center">
          <Link
            href="https://cal.com/rebecca-pari/30min"
            className="inline-block px-6 py-3 text-sm font-medium text-white bg-[#7C3AED] rounded-md hover:bg-[#6D28D9] transition-colors shadow-sm hover:shadow-md"
          >
            Planifier mon audit gratuit
          </Link>
        </div>
      </div>
    </section>
  );
}
