import { createFileRoute } from "@tanstack/react-router";
import { FirmwareCard } from "@/components/firmware-card";
import { FIRMWARES } from "@/lib/axle/catalog";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/firmware")({ component: FirmwarePage });

function FirmwarePage() {
  const lang = useAxle((s) => s.lang);
  const imported = useAxle((s) => s.imported);
  const importFile = useAxle((s) => s.importFile);
  const copy = t(lang);

  return (
    <main className="space-y-10 pb-10">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-subtle">CHIEF</p>
        <h1 className="font-display mt-2 text-4xl tracking-tight">{copy.firmware.title}</h1>
        <p className="mt-2 text-muted">{copy.firmware.sub}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {FIRMWARES.map((fw) => (
          <FirmwareCard key={fw.slug} fw={fw} lang={lang} />
        ))}
      </div>
      <section className="rounded-[var(--radius-md)] border border-line bg-surface p-6">
        <h2 className="font-medium">{copy.firmware.import}</h2>
        <p className="mt-2 text-sm text-muted">{copy.firmware.importHint}</p>
        <input
          type="file"
          accept=".bin,.hex"
          className="mt-4 block w-full text-sm text-muted file:mr-3 file:h-11 file:rounded-[var(--radius-sm)] file:border-0 file:bg-raised file:px-4 file:text-fg"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) importFile(f.name, f.size);
          }}
        />
        {imported.length ? (
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {imported.map((f) => (
              <li key={f.name}>
                {f.name} · {(f.size / 1024).toFixed(1)} KB
              </li>
            ))}
          </ul>
        ) : null}
      </section>
    </main>
  );
}
