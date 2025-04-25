import { ArrowRight } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      title: "Audit complet",
      subtitle:
        "Nous analysons votre organisation pour cibler les automatisations à fort impact.",
      points: [
        "Analyse approfondie de vos outils et processus actuels",
        "Échanges ciblés avec vos équipes pour identifier les besoins réels",
        "Cartographie des tâches répétitives à fort impact",
      ],
      color: "bg-white",
      textColor: "text-[#7C3AED]",
      iconBg: "bg-white",
      numberColor: "text-[#7C3AED]",
    },
    {
      title: "Conception",
      subtitle:
        "On crée un système intelligent qui s'intègre à vos outils et à votre façon de travailler.",
      points: [
        "Connexion fluide à vos outils existants (drive, emails, plannings, etc.)",
        "Mise en place de solutions simples et adaptées à vos process internes",
        "Automatisation de tâches complexes sans bouleverser vos méthodes",
      ],
      color: "bg-white",
      textColor: "text-[#7C3AED]",
      iconBg: "bg-[#FF9F87]",
      numberColor: "text-white",
    },
    {
      title: "Pilotage & accompagnement",
      subtitle:
        "Votre système fonctionne en autonomie, tout en vous laissant le contrôle total.",
      points: [
        "Validation humaine possible à chaque étape, sans obligation.",
        "Tableau de bord intuitif pour suivre et ajuster vos automatisations",
        "Maintenance, mises à jour et support inclus dans l'abonnement",
      ],
      color: "bg-white",
      textColor: "text-[#7C3AED]",
      iconBg: "bg-[#4ECDC4]",
      numberColor: "text-white",
    },
  ];

  return (
    <section className="py-24 bg-[#7C3AED]" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Comment ça marche ?
          </h2>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Nous comprenons votre réalité, construisons un système sur mesure,
            et vous accompagnons à chaque étape.
          </p>
        </div>

        <div className="relative">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/50 -translate-x-1/2 hidden md:block"></div>

          {steps.map((step, index) => (
            <div key={index} className="mb-28 relative">
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-0 w-14 h-14 rounded-full ${step.iconBg} flex items-center justify-center z-10 hidden md:flex shadow-lg`}
              >
                <span className={`text-2xl font-bold ${step.numberColor}`}>
                  {index + 1}
                </span>
              </div>

              <div
                className={`md:w-[45%] ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}
                style={{ marginTop: "2rem" }}
              >
                <div
                  className={`${step.color} rounded-xl shadow-xl p-8 border border-white/20 hover:shadow-2xl transition-shadow`}
                >
                  <div className="flex items-center mb-4 gap-3">
                    <h3 className={`text-2xl font-bold ${step.textColor}`}>
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-gray-700 mb-6 text-md font-medium text-left">
                    {step.subtitle}
                  </p>

                  <ul className="space-y-4 text-left">
                    {step.points.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <span
                          className={`${step.textColor} text-lg font-bold mt-0.5 flex-shrink-0`}
                        >
                          →
                        </span>
                        <span className="text-base">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {index < steps.length - 1 && (
                    <div className="flex justify-center mt-8 md:hidden">
                      <ArrowRight className="w-6 h-6 text-[#7C3AED]" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="text-center text-white mt-12 relative z-10 bg-[#7C3AED] py-6">
            <div className="text-2xl mb-3">🧘</div>
            <p className="max-w-2xl mx-auto text-xl font-medium">
              Vous gagnez du temps. Votre système travaille pour vous.
              <br />
              Et vous restez maître du jeu, sans effort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
