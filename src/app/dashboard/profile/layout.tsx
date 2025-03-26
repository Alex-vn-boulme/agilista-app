import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user profile data
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return redirect("/sign-in");
  }

  // Make the profile available in page props using a hidden data attribute
  return <div data-profile={JSON.stringify(profile)}>{children}</div>;
}
