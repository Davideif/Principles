"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GoogleIcon } from "@/components/ui/google-icon";
import { signIn } from "next-auth/react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialSignUp = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch("/api/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error(data.error);
      setIsLoading(false);
      return;
    } 
    ;
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
        <h1 className="auth-title">Create an account</h1>
        <p className="auth-subtitle">Get started — it&apos;s free</p>
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

      <form onSubmit={handleCredentialSignUp} className="auth-form">
        <div className="field-group">
          <Label htmlFor="name" className="field-label">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="field-input"
            required
          />
        </div>

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
          <Label htmlFor="password" className="field-label">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="field-input"
            minLength={8}
            required
          />
        </div>

        <Button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link href="/sign-in" className="auth-link">
          Sign in
        </Link>
      </p>

      <p className="auth-terms">
        By creating an account you agree to our{" "}
        <Link href="/terms" className="auth-link">Terms</Link>{" "}
        and{" "}
        <Link href="/privacy" className="auth-link">Privacy Policy</Link>.
      </p>
    </div>
  );
}