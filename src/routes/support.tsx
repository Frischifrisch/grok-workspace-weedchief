import { createFileRoute } from "@tanstack/react-router";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/support")({ component: SupportPage });

function SupportPage() {
  const lang = useAxle((s) => s.lang);
  const copy = t(lang);
  return (
    <main className="max-w-2xl space-y-10 pb-16">
      <div>
        <h1 className="font-display text-4xl tracking-tight">{copy.support.title}</h1>
        <p className="mt-3 text-muted">{copy.support.lead}</p>
      </div>
      <section>
        <h2 className="font-medium">{copy.support.install}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{copy.support.installBody}</p>
      </section>
      <section>
        <h2 className="font-medium">{copy.support.compat}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{copy.support.compatBody}</p>
      </section>
      <section>
        <h2 className="font-medium">{copy.support.after}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{copy.support.afterBody}</p>
      </section>
    </main>
  );
}
