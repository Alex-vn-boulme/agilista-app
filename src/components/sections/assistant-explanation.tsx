export const AssistantExplanation = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Une équipe d'assistants IA pour chaque rouage de votre entreprise
        </h2>
        <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto">
          Récupérez jusqu'à 30 % de temps opérationnel{" "}
          <strong>pour décaler un recrutement</strong> ou rediriger vos équipes
          là où la présence humaine est essentielle.
        </p>

        <h3 className="text-2xl font-semibold mb-8 flex items-center justify-center gap-2">
          <span className="text-green-600 text-2xl">✅</span> Chaque assistant a
          une mission précise :
        </h3>
        <ul className="space-y-8 mb-16 max-w-3xl mx-auto">
          <li className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#7C3AED] text-lg">•</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-lg block mb-2">Suivi client</span>
              <div className="text-gray-600">
                Il répond, relance, anticipe les oublis pour que rien ne vous
                échappe.
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#7C3AED] text-lg">•</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-lg block mb-2">
                Organisation interne
              </span>
              <div className="text-gray-600">
                Il synthétise les infos, classe les documents, vous alerte sur
                les priorités.
              </div>
            </div>
          </li>
          <li className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#7C3AED] text-lg">•</span>
            </div>
            <div className="text-left">
              <span className="font-bold text-lg block mb-2">
                Préparation de livrables ou d'analyses
              </span>
              <div className="text-gray-600">
                Il génère vos devis, rapports, mails récurrents à partir de vos
                données.
              </div>
            </div>
          </li>
        </ul>

        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 flex items-center justify-center gap-2">
            <span className="text-[#7C3AED] text-2xl">🧠</span> Chacun est{" "}
            <span className="italic">formé à votre façon de travailler</span>
          </h3>
          <div className="space-y-4 text-lg text-gray-700">
            <p>Pas de script générique, pas de réponses robotiques.</p>
            <p>
              Chaque assistant IA apprend de vos process, vos outils, votre
              langage.
            </p>
            <p className="text-gray-900 font-bold">
              Comme un vrai collaborateur.
            </p>
            <p className="text-[#7C3AED] font-semibold">
              Vous imaginez le rôle, on lui donne vie.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssistantExplanation;
