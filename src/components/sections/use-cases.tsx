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
      title: "Gérer les relances clients sans s'éparpiller (Cabinet comptable)",
      description:
        "Chaque début de mois, c'est la chasse aux pièces comptables : mails, pièces jointes éparpillées, réponses incomplètes. Un collaborateur passe parfois la matinée à relancer et rassembler les éléments.",
      image: "/images/reporting-automation.svg",
      steps: [
        "Relance automatique des clients avec détection des pièces manquantes",
        "Centralisation des documents dans le bon dossier Drive",
        "Alerte IA en cas d'élément critique manquant avant clôture",
      ],
      result: "50 % de temps gagné sur la préparation de chaque dossier client",
      example: {
        icon: "📦",
        title: "Témoignage",
        description: [
          "Vous le savez j'étais sceptique au début, mais je suis plus que convaincu ! Nous avons décidé de créer un assistant pour gérer une partie de notre travail avec nos clients (relance pour des documents, réponses types, classement dans les bons dossiers …), pendant la période des bilans ça nous sauve la vie :)",
        ],
        benefit: "— Nicolas expert comptable (5 personnes)",
      },
    },
    {
      title: "Suivre les candidats sans perdre de temps (Cabinet RH)",
      description:
        "Chaque semaine, des dizaines de CV, mails de suivi, ajustements clients ou briefs s'accumulent. Résultat : les consultants passent des heures à trier, reformuler, copier-coller dans le CRM ou Trello.",
      image: "/images/email-extraction.svg",
      steps: [
        "Analyse des candidatures et extraction automatique des points-clés (profil, dispo, prétentions)",
        "Génération automatique de messages de suivi personnalisés",
        "Mise à jour du tableau de suivi pour chaque mission",
      ],
      result:
        "Plusieurs heures de gestion économisées par semaine et un suivi client plus fluide",
      example: {
        icon: "🧑‍💼",
        title: "Témoignage",
        description: [
          "Les échanges avec les candidats et les clients, c'est la base de notre métier. Mais honnêtement, y'a plein de moments où on répétait les mêmes choses. Comme c'est de l'humain, ça fait un peu peur d'automatiser. Finalement, on a lancé deux assistants IA avec Agilista, et c'est hyper fluide.",
        ],
        benefit:
          "— Claire co-fondatrice d'un cabinet de recrutement (4 personnes)",
      },
    },
    {
      title: "Simplifier le suivi post-formation (Organisme de formation)",
      description:
        "Après chaque session, il faut envoyer les attestations, récupérer les évaluations, compiler les retours. L'équipe perd du temps à répéter les mêmes actions pour chaque groupe.",
      image: "/images/meeting-brief.svg",
      steps: [
        "Envoi automatisé des certificats + mails de remerciement",
        "Relance des participants pour les questionnaires de satisfaction",
        "Génération automatique d'un rapport synthétique par session",
      ],
      result:
        "30 minutes économisées par session — et un meilleur suivi qualité",
      example: {
        icon: "🎓",
        title: "Témoignage",
        description: [
          "Je voulais garder la tranquillité de travailler seule mais j'étais débordée notamment sur la partie  CPF et les demandes de mes clients qui arrivent partout WhatsApp, mail ou formulaire... L'assistant que j'ai imaginé avec Agilista m'a vraiment déchargé et nous sommes en train d'en créer un autre sur la partie acquisition, donc je suis ravie :) ",
        ],
        benefit: "— Élodie coach formatrice (1 personne)",
      },
    },
    {
      title:
        "Automatiser les relances et reporting client (Agence de communication)",
      description:
        "Les chefs de projet jonglent entre les briefs, les mails clients, les validations… et les oublis arrivent vite. Chaque fin de semaine, c'est le rush pour tout remettre au propre.",
      image: "/images/reporting-automation.svg",
      steps: [
        "Relance automatique des clients pour validations ou retours",
        "Organisation des assets visuels dans un espace partagé",
        "Préparation automatique des reportings hebdos",
      ],
      result:
        "Plusieurs heures gagnée par chef de projet chaque semaine — sans stress",
      example: {
        icon: "🎨",
        title: "Témoignage",
        description: [
          "On est une petite équipe donc on fait tous un peu de tout. Personnellement, j'avais une charge mentale constante la majeur partie du temps : une relance client, un fichier à renvoyer, un suivi avec les équipes … Là, les assistants gèrent une grande partie des tâches quotidiennes de l'agence, il me notifie (ou un membre de l'équipe) si besoin, sinon je pense même plus à ça.",
        ],
        benefit: "— Ariane - fondatrice agence de communication (5 personnes)",
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
                  <h3 className="text-2xl font-bold mb-4">{useCase.title}</h3>
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

                  <div className="bg-[#F8F7FF] p-6 rounded-lg border border-[#7C3AED]/20 mb-6">
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

              {/* Témoignage pleine largeur */}
              <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm mb-20">
                <div className="flex items-start gap-3 mb-2 max-w-4xl mx-auto">
                  <span className="text-2xl">{useCase.example.icon}</span>
                  <div>
                    <p className="italic text-gray-700 mb-2">
                      {useCase.example.description[0]}
                    </p>
                    <div className="text-sm text-gray-500 font-semibold">
                      {useCase.example.benefit}
                    </div>
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
