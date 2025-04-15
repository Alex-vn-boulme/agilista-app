export default function Features() {
  return (
    <section className="py-24 bg-[#F8F7FF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Des systèmes entièrement personnalisés
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nous partons d'un audit poussé de vos process, de vos outils et de
            vos contraintes pour identifier ce qui peut réellement être
            automatisé.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "🧐 Audit en profondeur",
              description:
                "On analyse vos process, outils et contraintes réelles.",
            },
            {
              title: "⚙️ Adaptées à votre organisation",
              description:
                "On s'intègre à l'existant, pas besoin de tout changer.",
            },
            {
              title: "🧠 Automatisations intelligentes",
              description:
                "Conçues pour traiter des tâches complexes avec l'IA.",
            },
            {
              title: "🧩 Zéro solution générique",
              description:
                "Chaque système est pensé pour vous, pas copié-collé.",
            },
            {
              title: "🔁 Évolutif dans le temps",
              description:
                "Votre système s'adapte à vos besoins, même quand ils changent.",
            },
            {
              title: "🔍 Focus sur l'impact",
              description: "On automatise là où ça vous fait gagner le plus.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
