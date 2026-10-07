import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FlashRecord, Lang, Scooter, Session, Theme } from "./types";

type ScanState = "idle" | "scanning" | "found" | "linking";

type AxleState = {
  lang: Lang;
  theme: Theme;
  gated: boolean;
  session: Session | null;
  scooters: Scooter[];
  activeId: string | null;
  history: FlashRecord[];
  developer: boolean;
  imported: { name: string; size: number }[];
  scan: ScanState;
  bleLog: string[];
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  acceptGate: () => void;
  signIn: (email: string) => void;
  signOut: () => void;
  startScan: () => void;
  connectFound: (model: "st5max" | "st3") => void;
  disconnect: () => void;
  setStartSpeed: (n: number) => void;
  recordFlash: (rec: Omit<FlashRecord, "id">) => void;
  toggleDev: () => void;
  importFile: (name: string, size: number) => void;
  pushLog: (line: string) => void;
};

const CANDIDATES: Record<"st5max" | "st3", Omit<Scooter, "id" | "connected">> = {
  st5max: {
    name: "NAVEE ST5 Max",
    model: "st5max",
    serial: "NV5M-7K2Q-8814",
    controller: "0.0.0.9 / 7801",
    firmware: "0.0.0.9",
    battery: 87,
    rssi: -52,
    startSpeed: 22,
  },
  st3: {
    name: "NAVEE ST3",
    model: "st3",
    serial: "NV3S-4P18-2209",
    controller: "0.0.1.1 / 3701",
    firmware: "0.0.1.1",
    battery: 64,
    rssi: -61,
    startSpeed: 20,
  },
};

export const useAxle = create<AxleState>()(
  persist(
    (set) => ({
      lang: "en",
      theme: "dark",
      gated: true,
      session: null,
      scooters: [],
      activeId: null,
      history: [],
      developer: false,
      imported: [],
      scan: "idle",
      bleLog: [],
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      acceptGate: () => set({ gated: false }),
      signIn: (email) => set({ session: { email, at: Date.now() } }),
      signOut: () => set({ session: null }),
      startScan: () => {
        set({ scan: "scanning" });
        window.setTimeout(() => set({ scan: "found" }), 1100);
      },
      connectFound: (model) => {
        set({ scan: "linking" });
        window.setTimeout(() => {
          const base = CANDIDATES[model];
          const scooter: Scooter = {
            ...base,
            id: `${model}-${Date.now()}`,
            connected: true,
          };
          set((s) => ({
            scooters: [...s.scooters.map((x) => ({ ...x, connected: false })), scooter],
            activeId: scooter.id,
            scan: "idle",
            bleLog: [
              `ATT connect ${scooter.serial}`,
              `GAP ${scooter.name} RSSI ${scooter.rssi}`,
              `Read ctrl ${scooter.controller}`,
            ],
          }));
        }, 700);
      },
      disconnect: () =>
        set((s) => ({
          scooters: s.scooters.map((x) => ({ ...x, connected: false })),
          activeId: null,
          scan: "idle",
        })),
      setStartSpeed: (n) =>
        set((s) => ({
          scooters: s.scooters.map((x) =>
            x.id === s.activeId ? { ...x, startSpeed: n } : x,
          ),
        })),
      recordFlash: (rec) =>
        set((s) => ({
          history: [{ ...rec, id: `fl-${rec.at}` }, ...s.history].slice(0, 40),
          scooters: s.scooters.map((x) =>
            x.serial === rec.serial && rec.result === "ok"
              ? { ...x, firmware: rec.title }
              : x,
          ),
        })),
      toggleDev: () => set((s) => ({ developer: !s.developer })),
      importFile: (name, size) =>
        set((s) => ({ imported: [{ name, size }, ...s.imported].slice(0, 8) })),
      pushLog: (line) => set((s) => ({ bleLog: [line, ...s.bleLog].slice(0, 24) })),
    }),
    {
      name: "axle-v2",
      skipHydration: true,
      partialize: (s) => ({
        lang: s.lang,
        theme: s.theme,
        gated: s.gated,
        session: s.session,
        scooters: s.scooters.map((x) => ({ ...x, connected: false })),
        activeId: null,
        history: s.history,
        developer: s.developer,
        imported: s.imported,
      }),
    },
  ),
);

export function activeScooter() {
  const s = useAxle.getState();
  return s.scooters.find((x) => x.id === s.activeId && x.connected) ?? null;
}
