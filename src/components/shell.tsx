import { Link, useRouterState } from "@tanstack/react-router";
import { Globe, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";
import type { Lang } from "@/lib/axle/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LANGS: Lang[] = ["en", "de", "ru"];

export function applyChrome(theme: "dark" | "light", lang: Lang, gated: boolean) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
  root.lang = lang;
  if (gated) root.setAttribute("data-gate", "1");
  else root.removeAttribute("data-gate");
}

export function Shell({ children }: { children: ReactNode }) {
  const lang = useAxle((s) => s.lang);
  const theme = useAxle((s) => s.theme);
  const gated = useAxle((s) => s.gated);
  const setLang = useAxle((s) => s.setLang);
  const setTheme = useAxle((s) => s.setTheme);
  const copy = t(lang);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    void useAxle.persist.rehydrate();
  }, []);

  useEffect(() => {
    applyChrome(theme, lang, gated);
  }, [theme, lang, gated]);

  const nav = [
    { to: "/", label: copy.nav.home },
    { to: "/firmware", label: copy.nav.firmware },
    { to: "/", label: copy.nav.how, hash: "how" },
    { to: "/support", label: copy.nav.support },
    { to: "/garage", label: copy.nav.garage },
  ] as const;

  return (
    <div className="ambient flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-50 border-b border-line bg-bg">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
          <Link to="/" className="font-display shrink-0 text-lg tracking-[0.18em]">
            CHIEF
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={"hash" in item ? item.hash : undefined}
                className={cn(
                  "transition-colors hover:text-fg",
                  path === item.to && !("hash" in item) ? "text-accent" : "text-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex">
              <LangSwitch lang={lang} setLang={setLang} />
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-raised"
              aria-label={theme === "dark" ? "Light theme" : "Dark theme"}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-raised md:hidden"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-60 bg-bg/95 px-4 pt-6 md:hidden">
          <div className="flex items-center justify-between">
            <span className="tracking-[0.18em]">CHIEF</span>
            <button type="button" className="size-11" onClick={() => setOpen(false)} aria-label="Close">
              <X className="size-5" />
            </button>
          </div>
          <div className="mt-8 flex flex-col gap-2 text-lg">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={"hash" in item ? item.hash : undefined}
                className="h-12 text-fg"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/history" className="h-12 text-muted" onClick={() => setOpen(false)}>
              {copy.nav.history}
            </Link>
            <Link to="/settings" className="h-12 text-muted" onClick={() => setOpen(false)}>
              {copy.nav.settings}
            </Link>
            <Link to="/login" className="h-12 text-muted" onClick={() => setOpen(false)}>
              {copy.nav.signIn}
            </Link>
          </div>
          <div className="mt-6">
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
        </div>
      ) : null}

      <div className="mx-auto w-full flex-1 max-w-6xl px-4 pt-6 pb-16">{children}</div>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="tracking-[0.18em]">CHIEF</p>
            <p className="mt-2 text-sm text-muted">{copy.tag}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted">
            <Link to="/firmware" className="hover:text-fg">
              {copy.nav.firmware}
            </Link>
            <Link to="/support" className="hover:text-fg">
              {copy.nav.support}
            </Link>
            <Link to="/garage" className="hover:text-fg">
              {copy.nav.garage}
            </Link>
            <Link to="/impressum" className="hover:text-fg">
              {copy.nav.legal}
            </Link>
            <Link to="/agb" className="hover:text-fg">
              {copy.nav.terms}
            </Link>
            <Link to="/datenschutz" className="hover:text-fg">
              {copy.nav.privacy}
            </Link>
            <Link to="/history" className="hover:text-fg">
              {copy.nav.history}
            </Link>
            <Link to="/settings" className="hover:text-fg">
              {copy.nav.settings}
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 pb-8 text-xs text-subtle">
          <span>{copy.gate.badge}</span>
          <LangSwitch lang={lang} setLang={setLang} />
        </div>
      </footer>

      {gated ? <Gate /> : null}
    </div>
  );
}

function LangSwitch({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center gap-1 text-xs text-muted" aria-label="Language">
      <Globe className="size-3.5 shrink-0 text-subtle" aria-hidden />
      {LANGS.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 ? <span className="text-subtle/70">|</span> : null}
          <button
            type="button"
            className={cn("h-11 min-w-11 px-1.5", lang === l ? "text-accent" : "hover:text-fg")}
            onClick={() => setLang(l)}
          >
            {l.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

function Gate() {
  const lang = useAxle((s) => s.lang);
  const accept = useAxle((s) => s.acceptGate);
  const copy = t(lang);
  const [ok, setOk] = useState(false);
  const [sec, setSec] = useState(3);

  useEffect(() => {
    if (!ok) return;
    if (sec <= 0) return;
    const id = window.setTimeout(() => setSec((n) => n - 1), 1000);
    return () => window.clearTimeout(id);
  }, [ok, sec]);

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center bg-bg/80 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-[var(--radius-lg)] border border-line bg-surface p-6 shadow-[var(--shadow-card)] sm:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-accent">{copy.gate.badge}</p>
        <h2 className="font-display mt-3 text-2xl tracking-tight">{copy.gate.title}</h2>
        <p className="mt-2 text-sm text-muted">{copy.gate.read}</p>
        <p className="mt-4 text-sm leading-relaxed text-fg">{copy.gate.p1}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          <strong className="font-medium text-fg">{copy.gate.p2a}</strong> {copy.gate.p2b}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {copy.gate.p3a} <strong className="font-medium text-fg">{copy.gate.p3b}</strong>
        </p>
        <label className="mt-6 flex min-h-11 cursor-pointer items-start gap-3 text-sm">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-[var(--color-accent)]"
            checked={ok}
            onChange={(e) => {
              setOk(e.target.checked);
              setSec(3);
            }}
          />
          <span>{copy.gate.check}</span>
        </label>
        <Button className="mt-5 w-full" size="lg" disabled={!ok || sec > 0} onClick={accept}>
          {copy.gate.continue}
          {ok && sec > 0 ? ` ${sec}s` : null}
        </Button>
      </div>
    </div>
  );
}
