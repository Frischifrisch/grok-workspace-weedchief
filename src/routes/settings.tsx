import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { t } from "@/lib/axle/i18n";
import { useAxle } from "@/lib/axle/store";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const lang = useAxle((s) => s.lang);
  const scooters = useAxle((s) => s.scooters);
  const activeId = useAxle((s) => s.activeId);
  const developer = useAxle((s) => s.developer);
  const session = useAxle((s) => s.session);
  const history = useAxle((s) => s.history);
  const setStartSpeed = useAxle((s) => s.setStartSpeed);
  const toggleDev = useAxle((s) => s.toggleDev);
  const signOut = useAxle((s) => s.signOut);
  const copy = t(lang);
  const scooter = scooters.find((s) => s.id === activeId && s.connected);

  function exportDiag() {
    const blob = new Blob(
      [
        JSON.stringify(
          { scooter, history, at: new Date().toISOString() },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "chief-diagnostics.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="max-w-xl space-y-10 pb-16">
      <h1 className="font-display text-4xl tracking-tight">{copy.settings.title}</h1>

      <section>
        <h2 className="text-sm uppercase tracking-[0.18em] text-subtle">{copy.settings.safety}</h2>
        <p className="mt-3 font-medium">{copy.settings.start}</p>
        <p className="mt-1 text-sm text-muted">{copy.settings.startHint}</p>
        {scooter ? (
          <label className="mt-4 block">
            <span className="text-sm tabular-nums">{scooter.startSpeed} km/h</span>
            <input
              type="range"
              min={5}
              max={25}
              value={scooter.startSpeed}
              onChange={(e) => setStartSpeed(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--color-accent)]"
            />
          </label>
        ) : (
          <p className="mt-3 text-sm text-muted">{copy.flash.needConnect}</p>
        )}
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-[0.18em] text-subtle">{copy.settings.diag}</h2>
        {!scooter ? <p className="mt-3 text-sm text-muted">{copy.settings.diagOff}</p> : null}
        <Button className="mt-4" variant="raised" disabled={!scooter} onClick={exportDiag}>
          {copy.settings.export}
        </Button>
      </section>

      <section className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium">{copy.settings.dev}</p>
          <p className="mt-1 text-sm text-muted">{copy.settings.devHint}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={developer}
          onClick={toggleDev}
          className={`relative h-7 w-12 rounded-full ${developer ? "bg-accent" : "bg-raised border border-line"}`}
        >
          <span
            className={`absolute top-0.5 size-6 rounded-full bg-fg transition-transform ${developer ? "translate-x-5" : "translate-x-0.5"}`}
          />
        </button>
      </section>

      <section>
        <h2 className="font-medium">{copy.settings.about}</h2>
        <p className="mt-2 text-sm text-muted">{copy.settings.aboutBody}</p>
      </section>

      <section>
        {session ? (
          <div>
            <p className="text-sm text-muted">
              {copy.settings.signedIn}: {session.email}
            </p>
            <Button variant="raised" className="mt-3" onClick={signOut}>
              {copy.settings.signOut}
            </Button>
          </div>
        ) : (
          <Button asChild variant="raised">
            <Link to="/login">{copy.nav.signIn}</Link>
          </Button>
        )}
      </section>
    </main>
  );
}
