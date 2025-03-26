import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Mail,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F7FF]">
      <Navbar />
      <Hero />

      {/* Problèmes Section */}
      <section className="py-24 bg-white" id="problemes">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Vous vous reconnaissez dans ces situations ?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les défis quotidiens que rencontrent la plupart des TPE
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Clock className="w-6 h-6" />,
                title: "⏰ Trop de temps perdu à traiter les demandes clients",
                description: [
                  "Demandes reçues par e-mail, téléphone, formulaire, à trier manuellement.",
                  "Risque d'oublis, manque de suivi des prospects.",
                  "Ressaisie des informations dans plusieurs outils.",
                ],
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title:
                  "💰 Une gestion de facturation chronophage et source d'erreurs",
                description: [
                  "Factures créées manuellement, relances fastidieuses.",
                  "Retards de paiement fréquents, pertes financières.",
                  "Données ressaisies entre comptabilité, CRM et gestion de projet.",
                ],
              },
              {
                icon: <Calendar className="w-6 h-6" />,
                title:
                  "📆 Une organisation interne inefficace et trop de double saisie",
                description: [
                  "Échanges multiples pour fixer un rendez-vous.",
                  "Conflits d'agenda, manque de visibilité sur les disponibilités.",
                  "Rappels et annulations gérés manuellement.",
                ],
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "📩 Un suivi client inexistant ou trop manuel",
                description: [
                  "Aucun process de fidélisation après une prestation.",
                  "Opportunités de vente perdues faute de relance.",
                  "Oubli d'envoi d'enquêtes de satisfaction et de collecte d'avis.",
                ],
              },
            ].map((problem, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="text-[#7C3AED] mb-4">{problem.icon}</div>
                <h3 className="text-xl font-semibold mb-4">{problem.title}</h3>
                <ul className="space-y-2">
                  {problem.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#7C3AED] mt-1">•</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-[#7C3AED] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6">
              Optimisez votre entreprise sans effort supplémentaire
            </h2>
            <p className="text-xl">
              Avec <strong>Agilista</strong>,{" "}
              <strong>identifiez où vous perdez du temps</strong> et automatisez
              ce qui peut l'être, sans bouleverser votre organisation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg mb-8">
              Grâce à un accompagnement sur mesure, vous bénéficiez d'
              <strong>
                un audit précis, de solutions adaptées et d'un suivi continu,
                sans avoir à gérer des outils complexes
              </strong>{" "}
              ni embaucher du personnel dédié.
            </p>
            <p className="text-lg font-medium">
              Une approche simple et efficace pour fluidifier votre quotidien et
              vous concentrer sur l'essentiel.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white" id="services">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Notre Approche</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comment nous vous aidons à optimiser votre entreprise
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">
                Audit de vos processus internes
              </h3>
              <p className="text-gray-600 italic mb-4">
                Avant d'automatiser, il faut comprendre ce qui ralentit votre
                entreprise.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Analyse de vos tâches répétitives et chronophages
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Diagnostic des process inefficaces et des outils existants
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Identification des opportunités d'automatisation adaptées à
                    votre activité
                  </span>
                </li>
              </ul>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">
                Mise en place d'automatisations sur mesure
              </h3>
              <p className="text-gray-600 italic mb-4">
                Solutions adaptées à votre mode de fonctionnement.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Connexion et synchronisation de vos outils
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Automatisation des tâches administratives, clients et
                    internes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Mise en place de process optimisés pour gagner en efficacité
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-center font-medium text-[#7C3AED]">
                Moyenne du temps gagné par les TPE accompagnées : 20h par
                semaine
              </p>
            </div>

            <div className="p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <h3 className="text-xl font-semibold mb-4">
                Suivi et ajustements
              </h3>
              <p className="text-gray-600 italic mb-4">
                Suivi via un tableau de bord et accompagnement sur le long
                terme.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Suivi des automatisations mises en place via votre tableau
                    de bord dédié
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Ajustements selon l'évolution de vos besoins
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <span className="text-gray-600">
                    Possibilité d'ajouter simplement des nouvelles
                    automatisations
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#F8F7FF]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à libérer du temps pour votre entreprise ?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Réservez votre audit gratuit dès maintenant et découvrez comment
            Agilista peut transformer votre quotidien.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-[#7C3AED] hover:bg-[#6D28D9] rounded-lg transition-colors"
          >
            Réserver un audit gratuit
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
