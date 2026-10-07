import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MODEL_LABEL, PHOTO } from "@/lib/axle/catalog";
import { t } from "@/lib/axle/i18n";
import type { Firmware } from "@/lib/axle/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function nested(obj: unknown, path: string): string {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key];
    return undefined;
  }, obj) as string;
}

export function FirmwareCard({
  fw,
  lang,
  featured,
}: {
  fw: Firmware;
  lang: "en" | "de" | "ru";
  featured?: boolean;
}) {
  const copy = t(lang);
  const title = nested(copy, fw.titleKey);
  const desc = nested(copy, fw.descKey);
  const family = nested(copy, fw.familyKey);
  const speedLabel = nested(copy, fw.speedKey);
  const kind = fw.kind === "dashboard" ? copy.label.dashboard : copy.label.controller;

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 card-lift">
      <div className="mb-5 flex h-40 items-end justify-center sm:h-48">
        <img
          src={PHOTO[fw.photo]}
          alt={MODEL_LABEL[fw.model]}
          className="product-photo max-h-full w-auto object-contain"
        />
      </div>
      <p className="text-xs uppercase tracking-[0.18em] text-accent">{kind}</p>
      <p className="mt-1 text-xs text-subtle">
        {MODEL_LABEL[fw.model]} · {family}
      </p>
      <p className="font-display mt-3 text-2xl tracking-tight">{title}</p>
      {fw.speedValue ? (
        <p className="mt-3 text-sm">
          {fw.speedKey === "label.maxSpeed" ? (
            <>
              <span className="text-xs uppercase tracking-[0.16em] text-subtle">{speedLabel}</span>
              <span className="font-display ml-2 text-xl text-accent">{fw.speedValue}</span>
            </>
          ) : (
            <span className="text-muted">
              {speedLabel} {fw.speedValue}
            </span>
          )}
        </p>
      ) : null}
      {fw.badges.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {fw.badges.map((b) => {
            const label = nested(copy, b);
            const hot = b === "badge.testing";
            return (
              <span
                key={b}
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  hot ? "border-accent/40 text-accent" : "border-line text-muted",
                )}
              >
                {label}
              </span>
            );
          })}
        </div>
      ) : null}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
      <Button
        asChild
        variant={featured || fw.accentCta ? "accent" : "raised"}
        className="mt-6 w-full"
      >
        <Link to="/flash/$slug" params={{ slug: fw.slug }}>
          {copy.flash.details}
          <ArrowRight className="cta-arrow size-4" />
        </Link>
      </Button>
    </div>
  );
}
