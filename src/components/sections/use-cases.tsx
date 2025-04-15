import Image from "next/image";

type UseCase = {
  title: string;
  description: string;
  steps: string[];
  result: string;
  image: string;
  example: {
    icon: string;
    title: string;
    description: string[];
    benefit: string;
  };
};

export default function UseCases() {
  const useCases: UseCase[] = [
    {
      title: "Extraire et organiser automatiquement vos emails",
      description:
        "Fini le temps perdu à trier et organiser manuellement vos briefs et demandes clients.",
      image: "/images/email-extraction.svg",
      steps: [
        "Reconnaissance automatique des demandes, briefs et modifications",
        "Extraction des données clés (dates, lieux, échéances, options)",
        "Remplissage automatique de vos outils et systèmes existants",
      ],
      result:
        "Ce qui prenait 20 minutes de tri... se fait en 30 secondes, sans erreur",
      example: {
        icon: "📸",
        title: "Studio créatif ou agence événementielle",
        description: [
          "De nombreux échanges se croisent entre clients, freelances et partenaires",
          "Agilista centralise les infos, organise les fichiers et enrichit la donnée automatiquement",
        ],
        benefit:
          "Vos projets avancent sans friction, tout est à sa place — et vous n'avez plus besoin de courir après l'info",
      },
    },
    {
      title: "Transformer vos réunions en briefs actionnables",
      description:
        "Ne perdez plus le fil de vos conversations et réunions importantes.",
      image: "/images/meeting-brief.svg",
      steps: [
        "Transcription automatique de vos échanges (avec accord)",
        "Création d'un résumé structuré avec points d'action clairs",
        "Classement et partage automatique des documents générés",
      ],
      result:
        "Un brief clair et actionnable en quelques minutes, sans travail supplémentaire",
      example: {
        icon: "🎤",
        title: "Agent artistique ou manager de talents",
        description: [
          "Lors d'une réunion, vous discutez d'opportunités et de projets à venir",
          "Agilista transforme l'échange en un brief clair avec toutes les informations essentielles",
        ],
        benefit:
          "Plus besoin de tout noter, plus de confusion sur 'ce qui a été dit', un brief professionnel prêt à être partagé",
      },
    },
  ];

  return (
    <section className="py-24 bg-white" id="use-cases">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Cas d'usages</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des solutions concrètes pour vos défis quotidiens. Voici comment nos
            clients transforment leurs processus avec Agilista.
          </p>
        </div>

        <div className="space-y-24">
          {useCases.map((useCase, index) => (
            <div key={index} className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-8">
                <div className={`${index % 2 !== 0 ? "md:order-2" : ""}`}>
                  <h3 className="text-2xl font-bold mb-4 text-[#7C3AED]">
                    {useCase.title}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8">
                    {useCase.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {useCase.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 text-[#7C3AED]">
                          ⚡
                        </div>
                        <div className="text-gray-700 font-medium">{step}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#F8F7FF] p-6 rounded-lg border border-[#7C3AED]/20">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">🔥</div>
                      <div className="font-medium text-gray-800">
                        Résultat :{" "}
                        <span className="font-bold text-[#7C3AED]">
                          {useCase.result}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`${index % 2 !== 0 ? "md:order-1" : ""} relative h-64 md:h-[320px] rounded-xl overflow-hidden`}
                >
                  <Image
                    src={useCase.image}
                    alt={useCase.title}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{useCase.example.icon}</div>
                  <h4 className="text-xl font-semibold">
                    {useCase.example.title}
                  </h4>
                </div>

                <ul className="space-y-3 mb-6">
                  {useCase.example.description.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2">
                      <span className="text-[#7C3AED] mt-1 font-bold">→</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-[#7C3AED] mt-1">
                      💥
                    </span>
                    <span className="text-gray-700 font-medium">
                      {useCase.example.benefit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
