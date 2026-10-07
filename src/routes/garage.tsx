import { createFileRoute } from "@tanstack/react-router";
import { Bluetooth, Unplug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FirmwareCard } from "@/components/firmware-card";
import { FIRMWARES, MODEL_LABEL } from "@/lib/axle/catalog";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/garage")({ component: GaragePage });

function GaragePage() {
  const lang = useAxle((s) => s.lang);
  const scooters = useAxle((s) => s.scooters);
  const activeId = useAxle((s) => s.activeId);
  const scan = useAxle((s) => s.scan);
  const developer = useAxle((s) => s.developer);
  const bleLog = useAxle((s) => s.bleLog);
  const startScan = useAxle((s) => s.startScan);
  const connectFound = useAxle((s) => s.connectFound);
  const disconnect = useAxle((s) => s.disconnect);
  const copy = t(lang);
  const active = scooters.find((s) => s.id === activeId && s.connected);

  return (
    <main className="space-y-12 pb-12">
      <div>
        <h1 className="font-display text-4xl tracking-tight">{copy.garage.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{copy.garage.lead}</p>
      </div>

      {active ? (
        <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">{MODEL_LABEL[active.model]}</p>
          <p className="font-display mt-2 text-2xl">{active.name}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2 text-sm">
            <div>
              <dt className="text-subtle">{copy.garage.serial}</dt>
              <dd className="mt-1 font-mono">{active.serial}</dd>
            </div>
            <div>
              <dt className="text-subtle">{copy.garage.controller}</dt>
              <dd className="mt-1 font-mono">{active.controller}</dd>
            </div>
            <div>
              <dt className="text-subtle">{copy.garage.battery}</dt>
              <dd className="mt-1">{active.battery}%</dd>
            </div>
            <div>
              <dt className="text-subtle">{copy.garage.rssi}</dt>
              <dd className="mt-1">{active.rssi} dBm</dd>
            </div>
            <div>
              <dt className="text-subtle">{copy.flash.version}</dt>
              <dd className="mt-1">{active.firmware}</dd>
            </div>
            <div>
              <dt className="text-subtle">{copy.garage.start}</dt>
              <dd className="mt-1">{active.startSpeed} km/h</dd>
            </div>
          </dl>
          <Button variant="raised" className="mt-6" onClick={disconnect}>
            <Unplug className="size-4" />
            {copy.garage.disconnect}
          </Button>
          {developer ? (
            <pre className="mt-6 overflow-x-auto rounded-[var(--radius-sm)] bg-bg p-4 font-mono text-xs text-muted">
              {bleLog.join("\n") || "—"}
            </pre>
          ) : null}
        </section>
      ) : (
        <section className="rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center">
          <Bluetooth className="mx-auto size-8 text-accent" />
          <h2 className="mt-4 text-xl">{copy.garage.empty}</h2>
          <p className="mt-2 text-sm text-muted">{copy.garage.emptyHint}</p>
          {scan === "idle" ? (
            <Button className="mt-6" onClick={startScan}>
              {copy.garage.connect}
            </Button>
          ) : null}
          {scan === "scanning" ? <p className="mt-6 text-sm text-accent">{copy.garage.scanning}</p> : null}
          {scan === "found" ? (
            <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
              <p className="text-xs uppercase tracking-[0.16em] text-subtle">{copy.garage.found}</p>
              {(["st5max", "st3"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  className="flex min-h-11 items-center justify-between rounded-[var(--radius-sm)] border border-line bg-raised px-4 text-sm hover:border-accent/40"
                  onClick={() => connectFound(m)}
                >
                  {MODEL_LABEL[m]}
                  <span className="text-subtle">BLE</span>
                </button>
              ))}
            </div>
          ) : null}
          {scan === "linking" ? <p className="mt-6 text-sm text-accent">{copy.garage.linking}</p> : null}
          <p className="mt-6 text-xs text-subtle">{copy.garage.demoHint}</p>
        </section>
      )}

      <section>
        <h2 className="font-display text-2xl tracking-tight">{copy.firmware.title}</h2>
        <p className="mt-2 text-sm text-muted">{copy.firmware.sub}</p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {FIRMWARES.map((fw) => (
            <FirmwareCard key={fw.slug} fw={fw} lang={lang} />
          ))}
        </div>
      </section>
    </main>
  );
}
