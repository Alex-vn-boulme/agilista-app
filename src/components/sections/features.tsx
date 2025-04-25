export default function Features() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6">
            Des systèmes entièrement{" "}
            <span className="text-[#7C3AED]">personnalisés</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Nous partons d'un audit poussé de vos process, de vos outils et de
            vos contraintes pour identifier ce qui peut réellement être
            automatisé.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {[
            {
              title: "🧐 Audit ciblé de vos process",
              description:
                "On analyse vos outils, vos méthodes et vos points de friction concrets.",
              color: "#7C3AED",
            },
            {
              title: "⚙️ Adaptées à votre organisation",
              description:
                "On s'intègre à l'existant, pas besoin de tout changer.",
              color: "#FF9F87",
            },
            {
              title: "🧠 Automatisations intelligentes",
              description:
                "Conçues pour traiter des tâches complexes avec l'IA.",
              color: "#4ECDC4",
            },
            {
              title: "🔁 Évolutif dans le temps",
              description:
                "Votre système s'adapte à vos besoins, même quand ils changent.",
              color: "#7C3AED",
            },
            {
              title: "🔍 Focus sur l'impact",
              description: "On automatise là où ça vous fait gagner le plus.",
              color: "#FF9F87",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 transition-all duration-300 hover:shadow-xl"
            >
              {/* Cercle décoratif */}
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                style={{ backgroundColor: feature.color }}
              />

              {/* Contenu */}
              <div className="relative">
                <h3 className="text-lg font-semibold mb-4 group-hover:text-[#7C3AED] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Ligne décorative */}
              <div
                className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: feature.color }}
              />
            </div>
          ))}
        </div>

        {/* Ligne de connexion décorative */}
        <div className="hidden md:block relative mt-12">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#7C3AED] via-[#FF9F87] to-[#4ECDC4] opacity-20" />
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-[#7C3AED] via-[#FF9F87] to-[#4ECDC4] opacity-20 blur-sm" />
        </div>
      </div>
    </section>
  );
}
