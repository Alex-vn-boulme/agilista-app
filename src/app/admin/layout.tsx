import { AdminSidebar } from "@/components/admin-sidebar";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Check if user is an admin
  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "platform_admin") {
    redirect("/");
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#FAFAFA]">
      <div className="w-full md:w-64 md:min-h-screen md:flex-shrink-0 border-r bg-white">
        <AdminSidebar />
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
