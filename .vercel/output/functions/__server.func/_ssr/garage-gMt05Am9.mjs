import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Bluetooth, n as Unplug } from "../_libs/lucide-react.mjs";
import { a as useAxle, o as t, r as Button } from "./router-T8NQQqNK.mjs";
import { n as MODEL_LABEL, t as FIRMWARES } from "./catalog-DdXED0tl.mjs";
import { t as FirmwareCard } from "./firmware-card-BknkIGQS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/garage-gMt05Am9.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "space-y-12 pb-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.garage.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-relaxed text-muted",
				children: copy.garage.lead
			})] }),
			active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-accent",
						children: MODEL_LABEL[active.model]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-2 text-2xl",
						children: active.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6 grid gap-4 sm:grid-cols-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.garage.serial
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-mono",
								children: active.serial
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.garage.controller
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1 font-mono",
								children: active.controller
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.garage.battery
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1",
								children: [active.battery, "%"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.garage.rssi
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1",
								children: [active.rssi, " dBm"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.flash.version
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "mt-1",
								children: active.firmware
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-subtle",
								children: copy.garage.start
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "mt-1",
								children: [active.startSpeed, " km/h"]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "raised",
						className: "mt-6",
						onClick: disconnect,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Unplug, { className: "size-4" }), copy.garage.disconnect]
					}),
					developer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "mt-6 overflow-x-auto rounded-[var(--radius-sm)] bg-bg p-4 font-mono text-xs text-muted",
						children: bleLog.join("\n") || "—"
					}) : null
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-lg)] border border-line bg-surface p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bluetooth, { className: "mx-auto size-8 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-xl",
						children: copy.garage.empty
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: copy.garage.emptyHint
					}),
					scan === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6",
						onClick: startScan,
						children: copy.garage.connect
					}) : null,
					scan === "scanning" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-accent",
						children: copy.garage.scanning
					}) : null,
					scan === "found" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto mt-6 grid max-w-md gap-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.16em] text-subtle",
							children: copy.garage.found
						}), ["st5max", "st3"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex min-h-11 items-center justify-between rounded-[var(--radius-sm)] border border-line bg-raised px-4 text-sm hover:border-accent/40",
							onClick: () => connectFound(m),
							children: [MODEL_LABEL[m], /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-subtle",
								children: "BLE"
							})]
						}, m))]
					}) : null,
					scan === "linking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-accent",
						children: copy.garage.linking
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs text-subtle",
						children: copy.garage.demoHint
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: copy.firmware.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: copy.firmware.sub
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
					children: FIRMWARES.map((fw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirmwareCard, {
						fw,
						lang
					}, fw.slug))
				})
			] })
		]
	});
}
//#endregion
export { GaragePage as component };
