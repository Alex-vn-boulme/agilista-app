import { BotIcon, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F7FF] border-t border-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Produit</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-gray-600 hover:text-[#7C3AED]"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-600 hover:text-[#7C3AED]"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-[#7C3AED]"
                >
                  Tableau de bord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Entreprise</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Carrières
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Presse
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Communauté
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Statut
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Sécurité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-[#7C3AED]">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <div className="text-gray-600 mb-4 md:mb-0 flex items-center gap-2">
            <BotIcon className="h-5 w-5 text-[#7C3AED]" />© {currentYear}{" "}
            Agilista. Tous droits réservés.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#7C3AED]">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#7C3AED]">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-[#7C3AED]">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
