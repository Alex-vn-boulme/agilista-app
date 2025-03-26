"use client";

import { cn } from "@/lib/utils";
import { Bot, Grid3X3, LogOut, Receipt, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../../supabase/actions/auth";

const routes = [
  {
    label: "Vue d'ensemble",
    icon: Grid3X3,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Facturation et Paiements",
    icon: Receipt,
    href: "/dashboard/billing",
    color: "text-violet-500",
  },
  {
    label: "Profil",
    icon: UserCircle,
    href: "/dashboard/profile",
    color: "text-pink-700",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Bot className="h-8 w-8 text-[#7C3AED]" />
          <h1 className="text-xl font-semibold ml-2">Agilista</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-[#7C3AED] hover:bg-[#F4F1FF] rounded-lg transition",
                pathname === route.href
                  ? "text-[#7C3AED] bg-[#F4F1FF]"
                  : "text-zinc-500"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <form action={signOut} className="px-3">
        <button
          type="submit"
          className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-red-600 hover:bg-red-100 rounded-lg transition text-zinc-500"
        >
          <div className="flex items-center flex-1">
            <LogOut className="h-5 w-5 mr-3 text-red-600" />
            Se déconnecter
          </div>
        </button>
      </form>
    </div>
  );
}
