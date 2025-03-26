import { NextResponse } from "next/server";
import { createClient } from "../../../../../supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const type = requestUrl.searchParams.get("type");
  const redirect_to = requestUrl.searchParams.get("redirect_to");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // Si c'est une vérification d'email ou une récupération de mot de passe, rediriger vers une page de succès
  if (type === "recovery" || type === "signup") {
    return NextResponse.redirect(new URL("/email-verified", requestUrl.origin));
  }

  // URL to redirect to after sign in process completes
  const redirectTo = redirect_to || "/dashboard";
  return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
}
