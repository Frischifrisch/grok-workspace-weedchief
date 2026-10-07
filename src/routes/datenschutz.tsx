import { createFileRoute } from "@tanstack/react-router";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/datenschutz")({ component: Page });

function Page() {
  const copy = t(useAxle((s) => s.lang));
  return (
    <main className="max-w-2xl space-y-6 pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.legal.privacyTitle}</h1>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.p1}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.p2}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.p3}</p>
    </main>
  );
}
