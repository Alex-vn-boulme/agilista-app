"use client";

import { motion } from "framer-motion";

type Automation = {
  icon: string;
  title: string;
  description: string;
  timeSaved: string;
};

export default function AutomationGrid() {
  const automations: Automation[] = [
    {
      icon: "👥",
      title: "Mise à jour automatique du CRM ou suivi client",
      description: "10 à 15 min économisées par mise à jour",
      timeSaved: "⏱️",
    },
    {
      icon: "💬",
      title: "Résumé automatique de vos réunions ou échanges clients",
      description: "20 à 30 min gagnées par réunion ou échange",
      timeSaved: "⏱️",
    },
    {
      icon: "🗂",
      title: "Classement intelligent de vos documents clients",
      description: "10 à 15 min gagnées par livraison",
      timeSaved: "⏱️",
    },
    {
      icon: "📚",
      title: "Organisation automatique des notes et idées d'équipe",
      description: "1 à 2 heures gagnées par semaine",
      timeSaved: "⏱️",
    },
    {
      icon: "📅",
      title: "Relances client automatiques avant / après deadline",
      description: "20 à 30 min économisées par projet ou commande",
      timeSaved: "⏱️",
    },
    {
      icon: "🛠",
      title: "Préparation automatique de reporting hebdo ou mensuel",
      description: "1h ou plus selon la fréquence",
      timeSaved: "⏱️",
    },
    {
      icon: "⏰",
      title: "Alertes IA sur les tâches critiques et les urgences à suivre",
      description: "Jusqu'à 40 min gagnées selon les cas",
      timeSaved: "⏱️",
    },
    {
      icon: "📩",
      title: "Réponse automatique aux demandes fréquentes par mail",
      description: "15 à 20 min économisées par échange",
      timeSaved: "⏱️",
    },
    {
      icon: "🧾",
      title: "Préparation automatique de devis, contrats ou factures",
      description: "15 à 30 min gagnées par document",
      timeSaved: "⏱️",
    },
  ];

  // Créer 2 rangées d'éléments avec suffisamment d'éléments pour l'animation
  const firstRow = automations.slice(0, 5);
  const secondRow = [...automations.slice(5)].reverse();

  // Dupliquer les éléments pour créer l'effet de boucle
  const rows = [
    [
      ...firstRow,
      ...firstRow,
      ...firstRow,
      ...firstRow,
      ...firstRow,
      ...firstRow,
      ...firstRow,
      ...firstRow,
    ],
    [
      ...secondRow,
      ...secondRow,
      ...secondRow,
      ...secondRow,
      ...secondRow,
      ...secondRow,
      ...secondRow,
      ...secondRow,
    ],
  ];

  return (
    <section
      className="py-24 bg-gradient-to-b from-white to-[#F8F7FF] overflow-hidden"
      id="automations"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Toutes vos tâches automatisées
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez toutes les possibilités d'automatisation pour votre
            agence. Chaque solution est personnalisée selon votre façon de
            travailler.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto h-[120px]">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="relative h-16"
              style={{
                top: `${rowIndex * 20}px`,
              }}
            >
              <motion.div
                className="flex gap-6 items-center absolute left-0"
                initial={{ x: rowIndex === 0 ? "0%" : "-100%" }}
                animate={{
                  x: rowIndex === 0 ? "-100%" : "0%",
                }}
                transition={{
                  duration: 500,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: "200%",
                  flexDirection: rowIndex === 0 ? "row" : "row",
                }}
              >
                {row.map((automation, index) => (
                  <div
                    key={`${rowIndex}-${index}`}
                    className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-[#7C3AED]/20 flex items-center gap-4 whitespace-nowrap group"
                    style={{
                      minWidth: "fit-content",
                    }}
                  >
                    <span className="text-2xl">{automation.icon}</span>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-[#7C3AED] transition-colors">
                        {automation.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <p className="text-[11px] text-gray-500">
                          {automation.description}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-medium text-[#7C3AED]">
                            {automation.timeSaved}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <div className="text-center mt-32">
          <p className="text-gray-600 max-w-2xl mx-auto italic">
            Ces exemples ne sont qu'un début : tout est possible, selon{" "}
            <em>votre</em> façon de travailler. On imagine chaque automatisation
            sur-mesure, même (et surtout) quand c'est complexe.
          </p>
        </div>
      </div>
    </section>
  );
}
