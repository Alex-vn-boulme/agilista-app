import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, Clock, Euro, Search } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-[1200px] mx-auto space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Time Saved Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="p-2 bg-[#F4F1FF] rounded-lg">
                  <Clock className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Temps économisé</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">156</span>
                    <span className="text-sm text-gray-600">heures</span>
                  </div>
                  <p className="text-xs text-green-500">+12.5% ce mois</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cost Saved Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="p-2 bg-[#ECFDF3] rounded-lg">
                  <Euro className="w-5 h-5 text-[#039855]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Coûts économisés</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">4,680</span>
                    <span className="text-sm text-gray-600">€</span>
                  </div>
                  <p className="text-xs text-green-500">+8.2% ce mois</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active Automations Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="p-2 bg-[#EEF4FF] rounded-lg">
                  <Bot className="w-5 h-5 text-[#444CE7]" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Automatisations actives
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-semibold">12</span>
                    <span className="text-sm text-gray-600">workflows</span>
                  </div>
                  <p className="text-xs text-blue-600">3 en attente</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applications Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Applications et Intégrations Connectées
              </h2>
              <p className="text-sm text-gray-600">
                Optimisez votre flux de travail en connectant vos outils
                quotidiens
              </p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                className="pl-9 h-9 bg-white"
              />
            </div>
          </div>

          <Tabs defaultValue="tout-voir" className="w-full">
            <TabsList className="border-b h-auto p-0 bg-transparent">
              <TabsTrigger
                value="tout-voir"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Tout voir
              </TabsTrigger>
              <TabsTrigger
                value="outils-developpeur"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Outils développeur
              </TabsTrigger>
              <TabsTrigger
                value="communication"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Communication
              </TabsTrigger>
              <TabsTrigger
                value="productivite"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Productivité
              </TabsTrigger>
              <TabsTrigger
                value="contenu-fichiers"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Contenu & Fichiers
              </TabsTrigger>
              <TabsTrigger
                value="operations-it"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#7C3AED] data-[state=active]:bg-transparent px-4 pb-2"
              >
                Opérations IT
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Integration Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Figma Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/figma-icon.svg"
                    alt="Figma"
                    width={24}
                    height={24}
                  />
                  <span className="font-medium">Figma</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Intégrez les aperçus de fichiers dans vos projets
              </p>
              <Button
                variant="link"
                className="text-[#7C3AED] p-0 h-auto text-sm font-medium"
              >
                Voir l'intégration
              </Button>
            </div>

            {/* GitHub Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/github-icon.svg"
                    alt="GitHub"
                    width={24}
                    height={24}
                  />
                  <span className="font-medium">GitHub</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Liez les pull requests et automatisez les workflows
              </p>
              <Button
                variant="link"
                className="text-[#7C3AED] p-0 h-auto text-sm font-medium"
              >
                Voir l'intégration
              </Button>
            </div>

            {/* Google Calendar Card */}
            <div className="bg-white rounded-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/google-calendar-icon.svg"
                    alt="Google Calendar"
                    width={24}
                    height={24}
                  />
                  <span className="font-medium">Google Calendar</span>
                </div>
                <Switch />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Automatisez les réponses avec Google Calendar
              </p>
              <Button
                variant="link"
                className="text-[#7C3AED] p-0 h-auto text-sm font-medium"
              >
                Voir l'intégration
              </Button>
            </div>
          </div>
        </div>

        {/* New Automation Section */}
        <div className="bg-[#7C3AED] rounded-xl p-8 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h3 className="text-white text-xl font-semibold mb-2">
              Besoin d'une nouvelle automation ?
            </h3>
            <p className="text-white/90 mb-6">
              Décrivez votre besoin et notre équipe vous contactera rapidement
              avec une solution personnalisée.
            </p>
            <div className="flex gap-4">
              <Input
                placeholder="Décrivez votre besoin en quelques mots"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button className="bg-white text-[#7C3AED] hover:bg-white/90">
                Envoyer la demande
              </Button>
            </div>
          </div>
          <div className="absolute right-8 bottom-8 w-24 h-24 bg-[#8B4EEE] rounded-full flex items-center justify-center">
            <Bot className="w-12 h-12 text-white" />
          </div>
        </div>
      </div>
    </main>
  );
}
