import Link from "next/link";

export default function Security() {
  return (
    <section className="py-24 bg-[#F8F7FF]" id="security">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Parce que dans votre métier, la discrétion est aussi importante que
            la performance, vos données restent chez vous !
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contrairement à la plupart des solutions, Agilista ne partage jamais
            vos informations avec des tiers.
          </p>
        </div>

        <div className="flex flex-col space-y-6 max-w-3xl mx-auto">
          {[
            {
              icon: "🔐",
              title: "Serveur privé, pour vous seul",
              description:
                "Un environnement dédié et exclusif pour vos données. Aucune information ne transite vers d'autres entreprises ou services externes.",
            },
            {
              icon: "🇪🇺",
              title: "100% conforme RGPD",
              description:
                "Hébergement en Europe sous normes strictes de protection des données. Vous gardez le contrôle total sur vos informations à tout moment.",
            },
            {
              icon: "🖥️",
              title: "IA en local, jamais dans le cloud",
              description:
                "Notre différence majeure : l'IA fonctionne directement dans votre environnement. Aucune donnée sensible n'est envoyée vers des systèmes externes.",
            },
          ].map((security, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-start"
            >
              <div className="text-3xl mr-5">{security.icon}</div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{security.title}</h3>
                <p className="text-gray-600">{security.description}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-gray-600">
          Chaque brief, contrat ou reporting peut contenir des informations
          confidentielles — voire stratégiques. Nous mettons en place votre
          propre serveur dédié : un système 100 % privé et conforme à la RGPD.
        </p>

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
