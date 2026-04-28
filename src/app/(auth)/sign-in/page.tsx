"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/ui/google-icon";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    setIsLoading(false);
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="auth-card">
      <div className="auth-header">
        <div className="auth-logo">✦</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account to continue</p>
      </div>

      <Button
        variant="outline"
        className="google-btn"
        onClick={handleGoogleSignIn}
        type="button"
      >
        <GoogleIcon />
        Continue with Google
      </Button>

      <div className="divider">
        <Separator />
        <span className="divider-text">or</span>
        <Separator />
      </div>

      <form onSubmit={handleEmailSignIn} className="auth-form">
        <div className="field-group">
          <Label htmlFor="email" className="field-label">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="field-input"
            required
          />
        </div>

        <div className="field-group">
          <div className="field-row">
            <Label htmlFor="password" className="field-label">Password</Label>
            <Link href="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field-input"
            required
          />
        </div>

        <Button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="auth-footer">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
}