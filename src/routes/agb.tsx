import { createFileRoute } from "@tanstack/react-router";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/agb")({ component: Page });

function Page() {
  const copy = t(useAxle((s) => s.lang));
  return (
    <main className="max-w-2xl space-y-6 pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.legal.termsTitle}</h1>
      <p className="text-sm text-subtle">{copy.legal.termsEff}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.t1}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.t2}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.t3}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.t4}</p>
    </main>
  );
}
