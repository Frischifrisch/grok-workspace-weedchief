const screens = [
  { title: "Garage", lines: ["ST5 Max", "NV5M-7K2Q-8814", "87% · 0.0.0.9"] },
  { title: "Firmware", lines: ["Custom 50 km/h", "Test 30 km/h", "Factory Restore"] },
  { title: "History", lines: ["ST5 Custom · ok", "Test image · ok"] },
  { title: "Settings", lines: ["Start 22 km/h", "Developer off"] },
];

export function PhoneStrip() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {screens.map((s) => (
        <div
          key={s.title}
          className="w-[9.5rem] shrink-0 rounded-[1.4rem] border border-line bg-raised p-2"
        >
          <div className="rounded-[1.05rem] bg-bg px-3 pb-4 pt-5">
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-line" />
            <p className="text-[10px] uppercase tracking-[0.22em] text-accent">CHIEF</p>
            <p className="mt-2 text-sm font-medium">{s.title}</p>
            <ul className="mt-3 space-y-2">
              {s.lines.map((l) => (
                <li key={l} className="rounded-md bg-surface px-2 py-1.5 text-[10px] text-muted">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
