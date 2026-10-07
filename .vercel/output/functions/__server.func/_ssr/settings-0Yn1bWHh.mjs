import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t, r as Button } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-0Yn1bWHh.js
var import_jsx_runtime = require_jsx_runtime();
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
		const blob = new Blob([JSON.stringify({
			scooter,
			history,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "chief-diagnostics.json";
		a.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "max-w-xl space-y-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.settings.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm uppercase tracking-[0.18em] text-subtle",
					children: copy.settings.safety
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-medium",
					children: copy.settings.start
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: copy.settings.startHint
				}),
				scooter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm tabular-nums",
						children: [scooter.startSpeed, " km/h"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 5,
						max: 25,
						value: scooter.startSpeed,
						onChange: (e) => setStartSpeed(Number(e.target.value)),
						className: "mt-2 w-full accent-[var(--color-accent)]"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: copy.flash.needConnect
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm uppercase tracking-[0.18em] text-subtle",
					children: copy.settings.diag
				}),
				!scooter ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: copy.settings.diagOff
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "raised",
					disabled: !scooter,
					onClick: exportDiag,
					children: copy.settings.export
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex items-center justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: copy.settings.dev
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: copy.settings.devHint
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "switch",
					"aria-checked": developer,
					onClick: toggleDev,
					className: `relative h-7 w-12 rounded-full ${developer ? "bg-accent" : "bg-raised border border-line"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 size-6 rounded-full bg-fg transition-transform ${developer ? "translate-x-5" : "translate-x-0.5"}` })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.settings.about
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: copy.settings.aboutBody
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: session ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					copy.settings.signedIn,
					": ",
					session.email
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "raised",
				className: "mt-3",
				onClick: signOut,
				children: copy.settings.signOut
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "raised",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/login",
					children: copy.nav.signIn
				})
			}) })
		]
	});
}
//#endregion
export { SettingsPage as component };
