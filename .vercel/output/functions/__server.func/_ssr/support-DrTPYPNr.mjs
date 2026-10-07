import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/support-DrTPYPNr.js
var import_jsx_runtime = require_jsx_runtime();
function SupportPage() {
	const lang = useAxle((s) => s.lang);
	const copy = t(lang);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "max-w-2xl space-y-10 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.support.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: copy.support.lead
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.support.install
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: copy.support.installBody
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.support.compat
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: copy.support.compatBody
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.support.after
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-muted",
				children: copy.support.afterBody
			})] })
		]
	});
}
//#endregion
export { SupportPage as component };
