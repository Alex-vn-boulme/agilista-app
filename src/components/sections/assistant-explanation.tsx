export const AssistantExplanation = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F8F7FF]">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">
          Une équipe d'assistants IA pour chaque rouage de votre entreprise
        </h2>
        <p className="text-xl text-gray-700 mb-8">
          Récupérez jusqu'à 30 % de temps opérationnel{" "}
          <strong>pour décaler un recrutement</strong> ou rediriger vos équipes
          là où la présence humaine est essentielle.
        </p>

        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-green-600 text-2xl">✅</span> Chaque assistant a
          une mission précise :
        </h3>
        <ul className="space-y-6 mb-10">
          <li>
            <span className="font-bold">Suivi client</span>
            <div className="text-gray-600 ml-2">
              Il répond, relance, anticipe les oublis pour que rien ne vous
              échappe.
            </div>
          </li>
          <li>
            <span className="font-bold">Organisation interne</span>
            <div className="text-gray-600 ml-2">
              Il synthétise les infos, classe les documents, vous alerte sur les
              priorités.
            </div>
          </li>
          <li>
            <span className="font-bold">
              Préparation de livrables ou d'analyses
            </span>
            <div className="text-gray-600 ml-2">
              Il génère vos devis, rapports, mails récurrents à partir de vos
              données.
            </div>
          </li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <span className="text-[#7C3AED] text-2xl">🧠</span> Chacun est{" "}
          <span className="italic">formé à votre façon de travailler</span>
        </h3>
        <p className="text-lg text-gray-700 mb-2">
          Pas de script générique, pas de réponses robotiques.
          <br />
          Chaque assistant IA apprend de vos process, vos outils, votre langage.
        </p>
        <p className="text-lg text-gray-900 font-bold mb-2">
          Comme un vrai collaborateur.
        </p>
        <p className="text-lg text-[#7C3AED] font-semibold">
          Vous imaginez le rôle, on lui donne vie.
        </p>
      </div>
    </section>
  );
};

export default AssistantExplanation;
