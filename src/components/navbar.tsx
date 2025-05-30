import { BotIcon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          prefetch
          className="text-xl font-bold flex items-center gap-2"
        >
          <BotIcon className="w-6 h-6 text-[#7C3AED]" />
          <span>Agilista</span>
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="https://cal.com/rebecca-pari/30min"
            className="px-3 py-2 text-sm font-medium text-white bg-[#7C3AED] rounded-md hover:bg-[#6D28D9] transition-colors whitespace-nowrap"
          >
            Audit gratuit
          </Link>
        </div>
      </div>
    </nav>
  );
}
