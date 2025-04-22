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
      title: "Gérer les demandes clients sans s'éparpiller",
      description:
        "Chaque jour, votre boîte mail déborde de briefs, retours, ajustements, validations… Et vos chefs de projet passent des heures à reconstituer l'info, souvent dispersée sur plusieurs messages.",
      image: "/images/email-extraction.svg",
      steps: [
        "Détection automatique des demandes clients, briefs et modifications",
        "Extraction des infos clés (dates, deadlines, options…)",
        "Alimentation automatique de vos outils (Notion, ClickUp, Drive)",
      ],
      result:
        "20 minutes de tri, recollage et reformulation deviennent 30 secondes — sans erreur, sans friction",
      example: {
        icon: "💼",
        title: "Focus sur l'essentiel",
        description: [
          "Même quand la demande est morcelée sur 5 mails, tout est regroupé",
          "Vos équipes restent focus sur la relation et la production",
        ],
        benefit: "Vos clients voient juste une agence carrée, rapide et fluide",
      },
    },
    {
      title: "Transformer vos réunions en briefs clairs",
      description:
        "En réunion avec vos talents, créateurs ou partenaires, il faut tout écouter, tout noter, tout reformuler. Et malgré ça, on oublie des points, on perd du temps à tout remettre en forme, ou on oublie d'envoyer le récap…",
      image: "/images/meeting-brief.svg",
      steps: [
        "Transcription de vos échanges (avec accord)",
        "Génération d'un résumé structuré avec actions à mener",
        "Classement automatique dans vos dossiers partagés",
      ],
      result:
        "En quelques minutes, vous obtenez un brief clair, prêt à être partagé — sans travail en plus",
      example: {
        icon: "🧑‍🎤",
        title: "Restez dans la discussion",
        description: [
          "Plus besoin de tout noter pendant les échanges",
          "L'outil s'occupe de la structuration et du suivi",
        ],
        benefit:
          "Vous restez concentré sur l'échange, pendant que l'outil s'occupe du reste",
      },
    },
    {
      title: "Création automatique de reportings de campagne",
      description:
        "Vous passez du temps à récupérer des résultats à la main ou les talents les remplissent dans un Drive ou un formulaire, et vos équipes passent des heures à compiler, reformuler et créer les reportings à la main.",
      image: "/images/reporting.svg",
      steps: [
        "Centralisation automatique des données",
        "Structuration du reporting avec recommandations personnalisées",
        "Préparation d'un livrable clair prêt à être validé",
      ],
      result:
        "Plusieurs heures économisées par campagne, avec des reportings pros et cohérents",
      example: {
        icon: "📊",
        title: "Gardez le contrôle",
        description: [
          "L'IA prépare le reporting complet",
          "Vous validez et ajustez si besoin avant envoi",
        ],
        benefit:
          "Des reportings professionnels en quelques clics, toujours validés par vous",
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
                      <div className="text-xl">✨</div>
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
                      💫
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
