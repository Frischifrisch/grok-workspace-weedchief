import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useAxle, o as t } from "./router-T8NQQqNK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/impressum-DM6X6_R1.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const copy = t(useAxle((s) => s.lang));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "max-w-2xl space-y-6 pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: copy.legal.imprint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-subtle",
				children: copy.legal.imprintEff
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: copy.legal.imprint1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.legal.service
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: copy.legal.brand
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: copy.legal.site
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-medium",
				children: copy.legal.content
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: copy.legal.contentBody
			})
		]
	});
}
//#endregion
export { Page as component };
