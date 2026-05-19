"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/ui/google-icon";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    setIsLoading(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl">

      {/* Header */}
      <div className="text-center mb-7">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xl mb-5">
          ✦
        </div>
        <h1 className="font-serif text-3xl font-normal text-foreground tracking-tight mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground font-sans font-light">
          Sign in to your account to continue
        </p>
      </div>

      {/* Google */}
      <Button
        variant="outline"
        className="w-full border-border text-muted-foreground hover:text-foreground hover:border-primary/30 bg-transparent font-sans"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <Separator className="flex-1 bg-border" />
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-sans">
          or
        </span>
        <Separator className="flex-1 bg-border" />
      </div>

      {/* Form */}
      <form onSubmit={handleEmailSignIn} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="text-sm text-muted-foreground font-sans">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-sm text-muted-foreground font-sans">
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs text-primary/80 hover:text-primary transition-colors font-sans"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-muted/40 border-border text-foreground placeholder:text-muted-foreground font-sans focus-visible:ring-primary"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full mt-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold font-sans rounded-full"
        >
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-muted-foreground font-sans">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:text-primary/80 font-medium transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}