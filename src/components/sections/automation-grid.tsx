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
      icon: "🧾",
      title: "Préparation automatique des contrats",
      description: "Génération et complétion automatique",
      timeSaved: "-20 min",
    },
    {
      icon: "✅",
      title: "Suivi des validations de contenu",
      description: "Centralisation et suivi automatique",
      timeSaved: "-20 min",
    },
    {
      icon: "📲",
      title: "Regroupement des retours client",
      description: "Synthèse et classement automatique",
      timeSaved: "-40 min",
    },
    {
      icon: "📅",
      title: "Relance automatique des deadlines",
      description: "Suivi et relances programmées",
      timeSaved: "-30 min",
    },
    {
      icon: "📈",
      title: "Centralisation des KPIs post-campagne",
      description: "Compilation et mise en forme auto",
      timeSaved: "-2h",
    },
    {
      icon: "📚",
      title: "Organisation automatique des assets",
      description: "Tri et classement intelligent",
      timeSaved: "-30 min",
    },
    {
      icon: "💬",
      title: "Résumé d'échanges en to-do",
      description: "Conversion auto en actions",
      timeSaved: "-20 min",
    },
    {
      icon: "🗂️",
      title: "Classement intelligent des documents",
      description: "Organisation automatisée",
      timeSaved: "-10 min",
    },
    {
      icon: "👥",
      title: "Mise à jour automatique du CRM",
      description: "Synchronisation en temps réel",
      timeSaved: "-1 min",
    },
  ];

  // Créer 2 rangées d'éléments avec suffisamment d'éléments pour l'animation
  const firstRow = automations.slice(0, 5);
  const secondRow = [...automations.slice(5)].reverse();

  // Dupliquer les éléments pour créer l'effet de boucle
  const rows = [
    [...firstRow, ...firstRow],
    [...secondRow, ...secondRow],
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
                  duration: 180,
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
                          <span className="text-[10px] text-[#7C3AED]">⏱️</span>
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
