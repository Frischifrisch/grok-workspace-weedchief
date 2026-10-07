import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { firmwareBySlug, MODEL_LABEL, PHOTO } from "@/lib/axle/catalog";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/flash/$slug")({ component: FlashPage });

const STEPS = ["fetching", "checking", "erasing", "writing", "verifying"] as const;

function nested(obj: unknown, path: string): string {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj) as string;
}

function FlashPage() {
  const { slug } = Route.useParams();
  const fw = firmwareBySlug(slug);
  const lang = useAxle((s) => s.lang);
  const scooters = useAxle((s) => s.scooters);
  const activeId = useAxle((s) => s.activeId);
  const recordFlash = useAxle((s) => s.recordFlash);
  const pushLog = useAxle((s) => s.pushLog);
  const copy = t(lang);
  const nav = useNavigate();
  const scooter = scooters.find((s) => s.id === activeId && s.connected);
  const [phase, setPhase] = useState<"idle" | "run" | "done" | "fail">("idle");
  const [step, setStep] = useState(0);
  const [err, setErr] = useState("");

  if (!fw) {
    return (
      <main className="py-16">
        <p className="text-muted">Unknown image.</p>
        <Link to="/firmware" className="mt-4 inline-block text-accent">
          {copy.nav.firmware}
        </Link>
      </main>
    );
  }

  const image = fw;
  const title = nested(copy, image.titleKey);
  const desc = nested(copy, image.descKey);

  function canInstall(): string | null {
    if (!scooter) return copy.flash.needConnect;
    if (scooter.model !== image.model) return copy.flash.mismatch;
    if (scooter.battery < 50) return copy.flash.batteryLow;
    return null;
  }

  function run() {
    const block = canInstall();
    if (block) {
      setErr(block);
      return;
    }
    setErr("");
    setPhase("run");
    setStep(0);
    let i = 0;
    const tick = () => {
      pushLog(`${STEPS[i]} ${image.checksum}`);
      if (i >= STEPS.length - 1) {
        recordFlash({
          at: Date.now(),
          slug: image.slug,
          title,
          serial: scooter!.serial,
          result: "ok",
          checksum: image.checksum,
        });
        setPhase("done");
        return;
      }
      i += 1;
      setStep(i);
      window.setTimeout(tick, 900);
    };
    window.setTimeout(tick, 700);
  }

  const blocked = canInstall();

  return (
    <main className="grid gap-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-accent">
          {image.kind === "dashboard" ? copy.label.dashboard : copy.label.controller}
        </p>
        <h1 className="font-display mt-3 text-4xl tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-subtle">
          {MODEL_LABEL[image.model]} · {nested(copy, image.familyKey)}
        </p>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">{desc}</p>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 text-sm">
          {image.speedValue ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{nested(copy, image.speedKey)}</dt>
              <dd className="mt-1 font-display text-2xl text-accent">{image.speedValue}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.flash.version}</dt>
            <dd className="mt-1 font-mono text-fg">{image.version}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.flash.family}</dt>
            <dd className="mt-1 font-mono text-fg">{image.controllerFamily}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.flash.sum}</dt>
            <dd className="mt-1 font-mono text-fg">{image.checksum}</dd>
          </div>
          {image.zeroStart !== undefined ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.flash.zs}</dt>
              <dd className="mt-1">{image.zeroStart ? copy.flash.on : copy.flash.off}</dd>
            </div>
          ) : null}
          {image.policeMode !== undefined ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.flash.pm}</dt>
              <dd className="mt-1">{image.policeMode ? copy.flash.on : copy.flash.off}</dd>
            </div>
          ) : null}
        </dl>

        {phase === "idle" || phase === "fail" ? (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={run}>
              {copy.flash.install}
              <ArrowRight className="cta-arrow size-4" />
            </Button>
            <Button asChild variant="raised" size="lg">
              <Link to="/garage">{copy.nav.garage}</Link>
            </Button>
          </div>
        ) : null}
        {err || (blocked && phase === "idle") ? (
          <p className="mt-4 text-sm text-danger">{err || blocked}</p>
        ) : null}

        {phase === "run" ? (
          <div className="mt-8 rounded-[var(--radius-md)] border border-line bg-surface p-5">
            <p className="text-sm text-muted">{copy.flash.keep}</p>
            <ol className="mt-4 space-y-3">
              {STEPS.map((id, i) => (
                <li key={id} className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      i < step ? "bg-accent" : i === step ? "bg-accent animate-pulse" : "bg-line",
                    )}
                  />
                  <span className={i <= step ? "text-fg" : "text-subtle"}>{copy.flash[id]}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {phase === "done" ? (
          <div className="mt-8 rounded-[var(--radius-md)] border border-accent/40 bg-surface p-5">
            <p className="font-medium text-accent">{copy.flash.done}</p>
            <p className="mt-2 text-sm text-muted">{copy.support.afterBody}</p>
            <Button className="mt-5" onClick={() => nav({ to: "/garage" })}>
              {copy.flash.close}
            </Button>
          </div>
        ) : null}
      </div>
      <div className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
        <img src={PHOTO[image.photo]} alt="" className="product-photo mx-auto max-h-72 w-auto object-contain" />
      </div>
    </main>
  );
}
