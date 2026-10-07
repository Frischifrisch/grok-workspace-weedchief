import { createFileRoute, Link } from "@tanstack/react-router";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const lang = useAxle((s) => s.lang);
  const history = useAxle((s) => s.history);
  const copy = t(lang);

  return (
    <main className="pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.history.title}</h1>
      {history.length === 0 ? (
        <p className="mt-8 text-muted">{copy.history.empty}</p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {history.map((h) => (
            <li key={h.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div>
                <Link to="/flash/$slug" params={{ slug: h.slug }} className="font-medium hover:text-accent">
                  {h.title}
                </Link>
                <p className="mt-1 font-mono text-xs text-subtle">
                  {h.serial} · {h.checksum}
                </p>
              </div>
              <div className="text-right text-sm">
                <p className={h.result === "ok" ? "text-accent" : "text-danger"}>
                  {h.result === "ok" ? copy.history.ok : copy.history.fail}
                </p>
                <p className="text-xs text-subtle">{new Date(h.at).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
