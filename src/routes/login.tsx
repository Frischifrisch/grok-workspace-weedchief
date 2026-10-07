import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const lang = useAxle((s) => s.lang);
  const signIn = useAxle((s) => s.signIn);
  const copy = t(lang);
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState<"in" | "up">("in");

  return (
    <main className="mx-auto max-w-md pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.login.title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted">{copy.login.lead}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{copy.login.note}</p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.includes("@")) return;
          signIn(email.trim());
          nav({ to: "/garage" });
        }}
      >
        <label className="block text-sm">
          {copy.login.email}
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 h-12 w-full rounded-[var(--radius-sm)] border border-line bg-raised px-4 outline-none focus:border-accent"
          />
        </label>
        <Button type="submit" className="w-full" size="lg">
          {mode === "in" ? copy.login.go : copy.login.register}
        </Button>
      </form>
      <button
        type="button"
        className="mt-4 text-sm text-accent"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
      >
        {mode === "in" ? copy.login.register : copy.login.go}
      </button>
      <p className="mt-8 text-center text-xs uppercase tracking-[0.18em] text-subtle">{copy.login.or}</p>
      <div className="mt-4 grid gap-3">
        <Button
          variant="raised"
          onClick={() => {
            signIn("google@chief.local");
            nav({ to: "/garage" });
          }}
        >
          {copy.login.google}
        </Button>
        <Button
          variant="raised"
          onClick={() => {
            signIn("x@chief.local");
            nav({ to: "/garage" });
          }}
        >
          {copy.login.x}
        </Button>
      </div>
      <p className="mt-6 text-xs text-subtle">{copy.login.guest}</p>
      <Link to="/" className="mt-6 inline-block text-sm text-accent">
        {copy.login.back}
      </Link>
    </main>
  );
}
