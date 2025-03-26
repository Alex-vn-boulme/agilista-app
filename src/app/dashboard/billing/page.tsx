import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MoreVertical, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function BillingPage() {
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Facturation et Paiements</h1>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9]">
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un moyen de paiement
          </Button>
        </div>

        {/* Current Subscription */}
        <Card className="p-6 bg-[#F4F1FF] border-none">
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Abonnement actuel</h2>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Premium</h3>
                <p className="text-sm text-gray-600">
                  Prochain renouvellement le 15 avril 2025
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">49,99 €/mois</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="text-[#7C3AED] border-[#7C3AED] hover:bg-[#F4F1FF]"
            >
              Changer d'abonnement
            </Button>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Moyens de paiement</h2>
          <div className="space-y-3">
            {/* Visa Card */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">Visa se terminant par 4242</p>
                    <p className="text-sm text-gray-600">Expire le 03/2026</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium px-2 py-1 bg-emerald-100 text-emerald-700 rounded">
                    Principal
                  </span>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Mastercard */}
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">MC</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      Mastercard se terminant par 8888
                    </p>
                    <p className="text-sm text-gray-600">Expire le 12/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Payment History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium">Historique des paiements</h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                Filtrer
              </Button>
              <Button variant="outline" size="sm">
                Exporter
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            {/* Payment History Items */}
            {[
              { date: "15 mars 2025", amount: "49,99 €" },
              { date: "15 février 2025", amount: "49,99 €" },
              { date: "15 janvier 2025", amount: "49,99 €" },
            ].map((payment, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#F4F1FF] rounded flex items-center justify-center">
                      <span className="text-[#7C3AED] text-xs font-bold">
                        AP
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">Abonnement Premium</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{payment.amount}</span>
                    <Button variant="ghost" size="sm">
                      Télécharger
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
