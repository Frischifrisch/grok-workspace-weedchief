import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/datenschutz-BlIiK4oq.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const copy = t(useAxle((s) => s.lang));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "max-w-2xl space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.legal.privacyTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: copy.legal.p1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: copy.legal.p2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: copy.legal.p3
			})
		]
	});
}
//#endregion
export { Page as component };
