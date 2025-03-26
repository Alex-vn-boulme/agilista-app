import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import Navbar from "@/components/navbar";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface LoginProps {
  searchParams: Promise<Message>;
}

export default async function SignInPage({ searchParams }: LoginProps) {
  const message = await searchParams;

  if ("message" in message) {
    return (
      <div className="flex h-screen w-full flex-1 items-center justify-center p-4 sm:max-w-md">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8">
        <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-md">
          <form className="flex flex-col space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your Agilista account to manage your automations
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full h-11"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    className="text-xs text-primary font-medium hover:underline transition-all"
                    href="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="w-full h-11"
                />
              </div>
            </div>

            <SubmitButton
              className="w-full h-11 font-medium text-base"
              pendingText="Signing in..."
              formAction={signInAction}
            >
              Sign in
            </SubmitButton>

            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline transition-all"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <FormMessage message={message} />
          </form>
        </div>
      </div>
    </>
  );
}
