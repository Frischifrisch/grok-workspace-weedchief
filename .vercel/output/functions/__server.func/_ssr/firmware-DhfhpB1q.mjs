import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t } from "./router-T8NQQqNK.mjs";
import { t as FIRMWARES } from "./catalog-DdXED0tl.mjs";
import { t as FirmwareCard } from "./firmware-card-BknkIGQS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/firmware-DhfhpB1q.js
var import_jsx_runtime = require_jsx_runtime();
function FirmwarePage() {
	const lang = useAxle((s) => s.lang);
	const imported = useAxle((s) => s.imported);
	const importFile = useAxle((s) => s.importFile);
	const copy = t(lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "space-y-10 pb-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.22em] text-subtle",
					children: "CHIEF"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mt-2 text-4xl tracking-tight",
					children: copy.firmware.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: copy.firmware.sub
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-3",
				children: FIRMWARES.map((fw) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FirmwareCard, {
					fw,
					lang
				}, fw.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-[var(--radius-md)] border border-line bg-surface p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-medium",
						children: copy.firmware.import
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: copy.firmware.importHint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: ".bin,.hex",
						className: "mt-4 block w-full text-sm text-muted file:mr-3 file:h-11 file:rounded-[var(--radius-sm)] file:border-0 file:bg-raised file:px-4 file:text-fg",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) importFile(f.name, f.size);
						}
					}),
					imported.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted",
						children: imported.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							f.name,
							" · ",
							(f.size / 1024).toFixed(1),
							" KB"
						] }, f.name))
					}) : null
				]
			})
		]
	});
}
//#endregion
export { FirmwarePage as component };
