"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthActionState } from "@/lib/actions/auth";
import { Logo } from "@/components/marketing/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialState: AuthActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Logo size="lg" />
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-surface p-8 shadow-card">
          <h1 className="text-center font-heading text-2xl font-semibold">
            Welcome back
          </h1>
          <p className="mt-2 text-center text-sm text-muted">
            Sign in to manage your booking pages
          </p>

          <form action={formAction} className="mt-8 space-y-4">
            {state.error && (
              <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
                {state.error}
              </p>
            )}

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                autoComplete="email"
                required
              />
              {state.fieldErrors?.email && (
                <p className="mt-1.5 text-xs text-danger">{state.fieldErrors.email[0]}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                required
              />
              {state.fieldErrors?.password && (
                <p className="mt-1.5 text-xs text-danger">{state.fieldErrors.password[0]}</p>
              )}
            </div>

            <Button className="w-full" type="submit" disabled={pending}>
              {pending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Start free
          </Link>
        </p>
      </div>
    </div>
  );
}
