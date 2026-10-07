import { createFileRoute } from "@tanstack/react-router";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/impressum")({ component: Page });

function Page() {
  const copy = t(useAxle((s) => s.lang));
  return (
    <main className="max-w-2xl space-y-6 pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.legal.imprint}</h1>
      <p className="text-sm text-subtle">{copy.legal.imprintEff}</p>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.imprint1}</p>
      <h2 className="font-medium">{copy.legal.service}</h2>
      <p className="text-sm text-muted">{copy.legal.brand}</p>
      <p className="text-sm text-muted">{copy.legal.site}</p>
      <h2 className="font-medium">{copy.legal.content}</h2>
      <p className="text-sm leading-relaxed text-muted">{copy.legal.contentBody}</p>
    </main>
  );
}
